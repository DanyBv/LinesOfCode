$(":button").each(function (i) { $(this).attr('tabindex','-1'); });

function stopRKey(evt) { 
  var evt = (evt) ? evt : ((event) ? event : null); 
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null); 
  if ((evt.keyCode == 13) && (node.type=="button"))  {return false;} 
} 

document.onkeypress = stopRKey;

var app = angular.module("LinesOfCodeApp", []);
angular.module('LinesOfCodeApp', []).service('sharedProperties', function () {
        var LoC = 0;
        var money=0;

        return {
            getMoney: function () {
                return money;
            },
            setMoney: function(value) {
                money = value;
            },
            getLoc: function () {
                return Loc;
            },
            setLoc: function(value) {
                LoC = value;
            }
        };
    });

app.controller("LinesOfCodeCtrl", function($scope) {
    $scope.addLoC = function() {
        var loc = sharedProperties.getLoc();
        sharedProperties.setLoc(loc+1);
    };
    
    $scope.sellAll = function() {
        var loc = sharedProperties.getLoc();
        var money = sharedProperties.getMoney();
        sharedProperties.setMoney(money+0.5*loc);
        sharedProperties.setLoc(0);
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
       createCookie("loc", sharedProperties.getLoc(), Infinity);
       createCookie("money", sharedProperties.getMoney(), Infinity);
    };
    
    $scope.resetAll = function() {   
        eraseCookie("loc");
        eraseCookie("money");
        location.reload();
    };
    
    $scope.saveTimer = setInterval($scope.saveAll, 60000);
});