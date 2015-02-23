$(":button").each(function (i) { $(this).attr('tabindex','-1'); });

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="button"))  {return false;} 
} 

document.onkeypress = stopRKey;

var app = angular.module("LinesOfCodeApp", []);
app.controller("LinesOfCodeCtrl", function($scope) {
    $scope.LoC=0;
    $scope.money=0.0;
    
    $scope.addLoC = function() {
        $scope.LoC++;
    };
    
    $scope.sellAll = function() {
        $scope.money+=0.5*$scope.LoC;
        $scope.LoC=0;
    }
    
    $scope.init = function() {
        var loc=parseInt(readCookie("loc"));
        if(!isNaN(loc))
            $scope.LoC=loc;
        var money=parseDouble(readCookie("money"));
        if(!isNaN(money))
            $scope.money=money;
    };
});
app.controller("MenuCtrl", function($scope) {
    $scope.saveAll = function() {   
       createCookie("loc", $scope.LoC, Infinity);
       createCookie("money", $scope.money, Infinity);
    };
    
    $scope.resetAll = function() {   
        eraseCookie("loc");
        eraseCookie("money");
        location.reload();
    };
    
    $scope.saveTimer = setInterval($scope.saveAll, 60000);
});