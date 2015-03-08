$(":button").each(function (i) { $(this).attr('tabindex','-1'); });
$('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
});

window.setTimeout(function() {
  $(".alert").fadeTo(500, 0).slideUp(500, function(){
    $(this).remove(); 
  });
}, 3000);

function hidethem()
{
    $("#buyloc").hide();
    $("#buypg").hide();
    $("#buyent").hide();
}

function float2int (value) {
    return value | 0;
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
    window.setTimeout(function() { $("#statusbar").children().last().alert('close') },  10000);
}

$(document).ready(hidethem);
document.onkeypress = stopRKey;

var app = angular.module("LinesOfCodeApp", []);
app.controller("LinesOfCodeCtrl", function($scope, $interval) {
    $scope.chr=0;
    $scope.chrpc=1;
    $scope.chrps=1;
    $scope.loc=0;
    $scope.locp=10;
    $scope.locpm=1.01;
    $scope.pg=0;
    $scope.pgp=25;
    $scope.pgpm=1.01;
    $scope.ent=0;
    $scope.entp=200;
    $scope.entpm=1.01;
    $scope.mf=false;
    $scope.locshown=false;
    $scope.pgshown=false;
    $scope.entshown=false;
    
    $scope.click = function() {
        $scope.chr+=$scope.chrpc;
    };
    $scope.buyUpgrade = function($id){
        $scope.floorAll();
        if($id==1 && $scope.mf==false)//Triple characters (per click)
            if($scope.chr>=100)
            {
                $scope.chrpc*=3;
                $scope.chr-=100;
                $scope.mf=true;
            }
        $scope.floorAll();
    };
    $scope.buyUnit = function($id) {
        $scope.floorAll();
        if($id==1)//Line of code
        {
            if($scope.chr>=$scope.locp)
            {
                $scope.loc++;
                $scope.chr-=$scope.locp;
                $scope.locp*=$scope.locpm;
                $scope.locpm*=1.01;
                if($scope.locpm>=2)
                    $scope.locpm=1.2;
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
                if($scope.pgpm>=2)
                    $scope.pgpm=1.2;
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
                if($scope.entpm>=2)
                    $scope.entpm=1.2;
            }
        }
        $scope.floorAll();
    };
    
    $scope.floorAll = function() {
        $scope.chr=float2int($scope.chr);
        $scope.chrpc=float2int($scope.chrpc);
        $scope.loc=float2int($scope.loc);
        $scope.locp=float2int($scope.locp);
        $scope.pg=float2int($scope.pg);
        $scope.pgp=float2int($scope.pgp);
        $scope.ent=float2int($scope.ent);
        $scope.entp=float2int($scope.entp);
    }
    
    $scope.saveAll = function() {   
       createCookie("chr", $scope.chr, 365);
       createCookie("chrpc", $scope.chrpc, 365);
       createCookie("chrps", $scope.chrps, 365);
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
       createCookie("mf", $scope.mf, 365);
       statusAlert("alert-success","The game was saved successfull .")
    };
    
    $scope.resetAll = function() {   
        eraseCookie("chr");
        eraseCookie("chrpc");
        eraseCookie("chrps");
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
        eraseCookie("mf");
        location.reload();
    };
    
    $scope.init = function() {
        var x=parseFloat(readCookie("chr"));
        if(!isNaN(x))
            $scope.chr=x;
        var x=parseFloat(readCookie("chrpc"));
        if(!isNaN(x))
            $scope.chrpc=x;
        var x=parseFloat(readCookie("chrps"));
        if(!isNaN(x))
            $scope.chrps=x;
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
        if(readCookie("mf")=="true")
            $scope.entshown=true;
    };
    
    $scope.doThings = function() {
      $scope.chr += $scope.loc*$scope.chrps;
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
      if($scope.mf==false)
      {
        if($scope.chr<100)
        {
            $("#multiplefingers").attr("aria-valuenow",$scope.chr);
            $("#multiplefingers").css("width",$scope.chr+"%");
            $("#multiplefingers").children().first().html($scope.chr+"%");
        }
        else
        {
            $("#multiplefingers").attr("aria-valuenow",100);
            $("#multiplefingers").css("width","100%");
            $("#multiplefingers").children().first().html("100%");
        }
      }
    }
    
    $interval( function(){ $scope.saveAll(); }, 60000);
    $interval( function(){ $scope.doThings(); }, 1000);
});