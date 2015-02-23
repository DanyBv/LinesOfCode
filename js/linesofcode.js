$(":button").each(function (i) { $(this).attr('tabindex','-1'); });
$('[data-toggle="tooltip"]').tooltip({
    'placement': 'top'
});

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="button"))  {return false;} 
} 

document.onkeypress = stopRKey;

var app = angular.module("LinesOfCodeApp", []);
app.controller("LinesOfCodeCtrl", function($scope, $timeout) {
    $scope.LoC=0;
    $scope.money=0.0;
    $scope.sk=0;
    $scope.skps=0;
    $scope.skp=5;
    
    $scope.addLoC = function() {
        $scope.LoC++;
    };
    
    $scope.saveAll = function() {   
       createCookie("loc", $scope.LoC, Infinity);
       createCookie("money", $scope.money, Infinity);
    };
    
    $scope.buyUnit = function($id) {
        if($id==1)//Skilled kid
        {
            if($scope.money>=$scope.skp)
            {
                $scope.sk++;
                $scope.skps+=0.25;
                $scope.money-=$scope.skp;
                $scope.skp*=1.01;
            }
        }
    };
    
    $scope.sellAll = function() {
        $scope.money+=0.05*$scope.LoC;
        $scope.LoC=0;
    }
    
    $scope.resetAll = function() {   
        eraseCookie("loc");
        eraseCookie("money");
        eraseCookie("sk");
        eraseCookie("skp");
        eraseCookie("sks");
        location.reload();
    };
    
    $scope.init = function() {
        var loc=parseFloat(readCookie("loc"));
        if(!isNaN(loc))
            $scope.LoC=loc;
        var money=parseFloat(readCookie("money"));
        if(!isNaN(money))
            $scope.money=money;
    };
    
    $scope.doThings = function() {
      
      $scope.LoC += $scope.skps;
      $scope.LoC = Math.round($scope.LoC * 100) / 100;
      
    }
    
    $timeout( function(){ $scope.saveAll(); }, 60000);
    $timeout( function(){ $scope.doThings(); }, 1000);
});