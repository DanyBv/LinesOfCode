$(":button").each(function (i) { $(this).attr('tabindex','-1'); });
$('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
});

function hidethem()
{
    $("#buyloc").hide();
    $("#buypg").hide();
}

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="button"))  {return false;} 
} 

function statusAlert(atype, atext)
{
    if($("#statusbar").children().length>=5)
        $("#statusbar").children().slice(4,$("#statusbar").children().length).remove();
    $("#statusbar").prepend('<div class="alert '+atype+' alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+atext+'</div>');
}

$(document).ready(hidethem);
document.onkeypress = stopRKey;

var app = angular.module("LinesOfCodeApp", []);
app.controller("LinesOfCodeCtrl", function($scope, $interval) {
    $scope.chr=0;
    $scope.chrpc=1;
    $scope.chrt=0;
    $scope.loc=0;
    $scope.locp=10;
    $scope.pg=0;
    $scope.pgp=25;
    $scope.locshown=false;
    $scope.pgshown=false;
    
    $scope.click = function() {
        $scope.chr+=$scope.chrpc;
        $scope.chrt+=$scope.chrpc;
    };
    
    $scope.buyUnit = function($id) {
        if($id==1)//Line of code
        {
            if($scope.chr>=$scope.locp)
            {
                $scope.loc++;
                $scope.chr-=$scope.locp;
            }
        }
        if($id==2)//Programmer
        {
            if($scope.loc>=$scope.pgp)
            {
                $scope.pg++;
                $scope.loc-=$scope.pgp;
            }
        }
    };
    
    $scope.saveAll = function() {   
       createCookie("chr", $scope.chr, 90);
       createCookie("chrpc", $scope.chrpc, 90);
       createCookie("chrt", $scope.chrt, 90);
       createCookie("loc", $scope.loc, 90);
       createCookie("locp", $scope.locp, 90);
       createCookie("locshown", $scope.pgshown, 90);
       createCookie("pg", $scope.pg, 90);
       createCookie("pgp", $scope.pgp, 90);
       createCookie("pgshown", $scope.pgshown, 90);
       statusAlert("alert-success","The game was saved successfull .")
    };
    
    $scope.resetAll = function() {   
        eraseCookie("chr");
        eraseCookie("chrpc");
        eraseCookie("chrt");
        eraseCookie("loc");
        eraseCookie("locp");
        eraseCookie("locshown");
        eraseCookie("pg");
        eraseCookie("pgp");
        eraseCookie("pgshown");
        location.reload();
    };
    
    $scope.init = function() {
        var x=parseFloat(readCookie("chr"));
        if(!isNaN(x))
            $scope.chr=x;
        var x=parseFloat(readCookie("chrpc"));
        if(!isNaN(x))
            $scope.chrpc=x;
        var x=parseFloat(readCookie("chrt"));
        if(!isNaN(x))
            $scope.chrt=x;
        var x=parseFloat(readCookie("loc"));
        if(!isNaN(x))
            $scope.loc=x;
        var x=parseFloat(readCookie("locp"));
        if(!isNaN(x))
            $scope.locp=x;
        var x=parseFloat(readCookie("pg"));
        if(!isNaN(x))
            $scope.pg=x;
        var x=parseFloat(readCookie("pgp"));
        if(!isNaN(x))
            $scope.pgp=x;
        if(readCookie("locshown")=="true")
            $scope.locshown=true;
        if(readCookie("pgshown")=="true")
            $scope.pgshown=true;
    };
    
    $scope.doThings = function() {
      
      $scope.chr += $scope.loc;
      $scope.chrt+=$scope.loc;
      $scope.loc+=$scope.pg;
      $scope.loct+=$scope.pg;
      if($scope.chr>=$scope.locp && $scope.locshown == false)
        {
            statusAlert("alert-success","Now you have enough characters to create a line of code :D .")
            $("#buyloc").show();
            $scope.locshown = true;
        }
      if($scope.loc>=$scope.pgp && $scope.pgshown == false)
      {
            statusAlert("alert-success","Now you have enough lines of code to attract some programmers :D .")
            $("#buypg").show();
            $scope.pgshown = true;
      }
      if($scope.locshown == true && $("#buyloc").is(":hidden"))
          $("buyloc").show();
      if($scope.pgshown == true && $("#buypg").is(":hidden"))
          $("buypg").show();
    }
    
    $interval( function(){ $scope.saveAll(); }, 60000);
    $interval( function(){ $scope.doThings(); }, 1000);
});