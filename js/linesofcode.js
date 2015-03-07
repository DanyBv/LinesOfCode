$(":button").each(function (i) { $(this).attr('tabindex','-1'); });
$('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
});

function hidethem()
{
    $("#buyloc").hide();
    $("#buypg").hide();
    $("#buyent").hide();
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
    $scope.loc=0;
    $scope.locp=10;
    $scope.locpm=1.01;
    $scope.pg=0;
    $scope.pgp=25;
    $scope.pgpm=1.01;
    $scope.ent=0;
    $scope.entp=200;
    $scope.entpm=1.01;
    $scope.locshown=false;
    $scope.pgshown=false;
    $scope.entshown=false;
    
    $scope.click = function() {
        $scope.chr+=$scope.chrpc;
    };
    
    $scope.buyUnit = function($id) {
        if($id==1)//Line of code
        {
            if($scope.chr>=$scope.locp)
            {
                $scope.loc++;
                $scope.chr-=$scope.locp;
                $scope.locp*=$scope.locpm;
                $scope.locpm*=1.01;
            }
        }
        else if($id==2)//Programmer
        {
            if($scope.loc>=$scope.pgp)
            {
                $scope.pg++;
                $scope.loc-=$scope.pgp;
                $scope.pgp*=$scope.pgpm;
                $scope.pgpm*=1.01;
            }
        }
        else if($id==3)//Enterprise
        {
            if($scope.pg>=$scope.entp)
            {
                $scope.ent++;
                $scope.pg-=$scope.entp;
                $scope.entp*=$scope.entpm;
                $scope.entpm*=1.01;
            }
        }
    };
    
    $scope.floorAll = function() {
        $scope.chr=parseFloat($scope.chr.toFixed(2));
        $scope.chrpc=parseFloat($scope.chrpc.toFixed(2));
        $scope.loc=parseFloat($scope.loc.toFixed(2));
        $scope.locp=parseFloat($scope.locp.toFixed(2));
        $scope.pg=parseFloat($scope.pg.toFixed(2));
        $scope.pgp=parseFloat($scope.pgp.toFixed(2));
        $scope.ent=parseFloat($scope.ent.toFixed(2));
        $scope.entp=parseFloat($scope.entp.toFixed(2));
    }
    
    $scope.saveAll = function() {   
       createCookie("chr", $scope.chr, 365);
       createCookie("chrpc", $scope.chrpc, 365);
       createCookie("loc", $scope.loc, 365);
       createCookie("locp", $scope.locp, 365);
       createCookie("locpm", $scope.locpm, 365);
       createCookie("locshown", $scope.locshown, 365);
       createCookie("pg", $scope.pg, 365);
       createCookie("pgp", $scope.pgp, 365);
       createCookie("pgpm", $scope.pgpm, 365);
       createCookie("pgshown", $scope.pgshown, 365);
       createCookie("ent", $scope.ent, 365);
       createCookie("entp", $scope.entp, 365);
       createCookie("entpm", $scope.entpm, 365);
       createCookie("entshown", $scope.entshown, 365);
       statusAlert("alert-success","The game was saved successfull .")
    };
    
    $scope.resetAll = function() {   
        eraseCookie("chr");
        eraseCookie("chrpc");
        eraseCookie("loc");
        eraseCookie("locp");
        eraseCookie("locpm");
        eraseCookie("locshown");
        eraseCookie("pg");
        eraseCookie("pgp");
        eraseCookie("pgpm");
        eraseCookie("ent");
        eraseCookie("entp");
        eraseCookie("entpm");
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
        var x=parseFloat(readCookie("loc"));
        if(!isNaN(x))
            $scope.loc=x;
        var x=parseFloat(readCookie("locp"));
        if(!isNaN(x))
            $scope.locp=x;
        var x=parseFloat(readCookie("locpm"));
        if(!isNaN(x))
            $scope.locpm=x;
        var x=parseFloat(readCookie("pg"));
        if(!isNaN(x))
            $scope.pg=x;
        var x=parseFloat(readCookie("pgp"));
        if(!isNaN(x))
            $scope.pgp=x;
        var x=parseFloat(readCookie("pgpm"));
        if(!isNaN(x))
            $scope.pgpm=x;
        var x=parseFloat(readCookie("ent"));
        if(!isNaN(x))
            $scope.ent=x;
        var x=parseFloat(readCookie("entp"));
        if(!isNaN(x))
            $scope.entp=x;
        var x=parseFloat(readCookie("entpm"));
        if(!isNaN(x))
            $scope.entpm=x;
        if(readCookie("locshown")=="true")
            $scope.locshown=true;
        if(readCookie("pgshown")=="true")
            $scope.pgshown=true;
        if(readCookie("entshown")=="true")
            $scope.entshown=true;
    };
    
    $scope.doThings = function() {
      $scope.chr += $scope.loc;
      $scope.loc += $scope.pg;
      $scope.pg  += $scope.ent;
      if($scope.chr>=$scope.locp && $scope.locshown == false)
        {
            statusAlert("alert-success","Now you have enough characters to create a line of code :D .");
            $("#buyloc").show();
            $scope.locshown = true;
        }
      if($scope.loc>=$scope.pgp && $scope.pgshown == false)
      {
            statusAlert("alert-success","Now you have enough lines of code to attract some programmers :D .");
            $("#buypg").show();
            $scope.pgshown = true;
      }
      if($scope.pg>=$scope.entp && $scope.entshown == false)
      {
            statusAlert("alert-success","Wow! You have now so many programmers, that they can form an enterprise !.");
            $("#buyent").show();
            $scope.entshown = true;
      }
      if($scope.locshown == true && $("#buyloc").is(":hidden"))
          $("#buyloc").show();
      if($scope.pgshown == true && $("#buypg").is(":hidden"))
          $("#buypg").show();
      if($scope.entshown == true && $("#buyent").is(":hidden"))
          $("#buyent").show();
    }
    
    $interval( function(){ $scope.saveAll(); }, 60000);
    $interval( function(){ $scope.doThings(); }, 1000);
    $interval( function(){ $scope.floorAll(); }, 50);
});