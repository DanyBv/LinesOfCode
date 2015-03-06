$(":button").each(function (i) { $(this).attr('tabindex','-1'); });
$('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
});

function hidethem()
{
    $("#buyloc").hide();
    $("#buypg").hide();
    $("#statusbar").hide();
}

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="button"))  {return false;} 
} 

function statusAlert(atype, atext)
{
    $("#statusbar").addClass(atype);
    $("#statusbar").html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+atext);
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
       createCookie("chr", $scope.chr, Infinity);
       createCookie("chrpc", $scope.chrpc, Infinity);
       createCookie("chrt", $scope.chrt, Infinity);
       createCookie("loc", $scope.loc, Infinity);
       createCookie("locp", $scope.locp, Infinity);
       createCookie("pg", $scope.pg, Infinity);
       createCookie("pgp", $scope.pgp, Infinity);
    };
    
    $scope.resetAll = function() {   
        eraseCookie("chr");
        eraseCookie("chrpc");
        eraseCookie("chrt");
        eraseCookie("loc");
        eraseCookie("locp");
        eraseCookie("pg");
        eraseCookie("pgp");
        location.reload();
    };
    
    $scope.init = function() {
        var x=parseFloat(readCookie("chr"));
        if(!isNaN(chr))
            $scope.chr=x;
        var x=parseFloat(readCookie("chrpc"));
        if(!isNaN(chrpc))
            $scope.chrpc=x;
        var x=parseFloat(readCookie("chrt"));
        if(!isNaN(chrt))
            $scope.chr=x;
        var x=parseFloat(readCookie("loc"));
        if(!isNaN(loc))
            $scope.loc=x;
        var x=parseFloat(readCookie("locp"));
        if(!isNaN(locp))
            $scope.locp=x;
        var x=parseFloat(readCookie("pg"));
        if(!isNaN(pg))
            $scope.pg=x;
        var x=parseFloat(readCookie("pgp"));
        if(!isNaN(pgp))
            $scope.pgp=x;
    };
    
    $scope.doThings = function() {
      
      //$scope.LoC += $scope.pg*$scope.pgps;
      //$scope.LoC.toFixed(2);
      $scope.chr += $scope.loc;
      $scope.chrt+=$scope.loc;
      $scope.loc+=$scope.pg;
      $scope.loct+=$scope.pg;
      if($scope.chr>=$scope.locp)
        {
            statusAlert("alert-success","Now you have enough characters to create a line of code :D .")
            $("#buyloc").show();
            $("#statusbar").show();
        }
      if($scope.loc>=$scope.pgp)
      {
            statusAlert("alert-success","Now you have enough lines of code to attract some programmers :D .")
            $("#buypg").show();
            $("#statusbar").show();
      }
      if($scope.loc)
          $("buyloc").show();
      if($scope.pg)
          $("buypg").show();
    }
    
    //$interval( function(){ $scope.saveAll(); }, 60000);
    $interval( function(){ $scope.doThings(); }, 1000);
});