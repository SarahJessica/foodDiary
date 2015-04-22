'use strict';

angular.module('food-diary', ['firebase'])
.run(['$rootScope', '$window', function($rootScope, $window){
  $rootScope.fbRoot = new $window.Firebase('https://food-diary-sjl.firebaseio.com/');

  // var ref = new Firebase(URL)
  //
}])

.controller('master', ['$scope', '$firebaseObject', '$firebaseArray', function($scope, $firebaseObject, $firebaseArray){
  console.info('master has started');

  var fbUser = $scope.fbRoot.child('user');
  var afUser = $firebaseObject(fbUser);

  var fbFoods = $scope.fbRoot.child('foods');
  var afFoods = $firebaseArray(fbFoods);

  console.log(afUser);

  $scope.user = afUser;
  $scope.foods = afFoods;

  $scope.setUser = function(){
    console.info('setUser was clicked');
    $scope.user.$save();
    $scope.isUserFormShown = false;
  };

  $scope.calculateBMI = function(){
    console.info('you are in the function');

    if ($scope.user.prefUnits === 'imperial'){
      $scope.user.BMI = ($scope.user.weight*703) / ($scope.user.height*$scope.user.height);
    } else{
      $scope.user.BMI = ($scope.user.weight) / ((($scope.user.height)/100)*(($scope.user.height)/100));
    }
    return $scope.user.BMI;
  };

  $scope.showUserForm = function(){
    $scope.isUserFormShown = true;
  };

  //$scope.food =

  $scope.addFood = function(){
  //  debugger;
    $scope.foods.$add($scope.food);
  };

}]);
