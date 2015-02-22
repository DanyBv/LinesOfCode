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

    $scope.addLoC = function() {
        $scope.LoC++;
    };
    
    $scope.saveAll = function() {   
       createCookie("loc", $scope.LoC, Infinity);
    };
    
    $scope.resetAll = function() {   
        eraseCookie("loc");
        location.reload();
    };
    
    $scope.init = function() {
        var loc=parseInt(readCookie("loc"));
        if(loc)
            $scope.LoC=loc;
    };
});