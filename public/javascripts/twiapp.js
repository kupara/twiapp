var twiapp = angular.module('twiApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_twip = '';
	
	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.current_twip = '';
	};
});

twiapp.config(function($routeProvider){
	$routeProvider
		//the timeline display
		.when('/', {
			templateUrl: 'main.html',
			controller: 'mainController'
		})
		//the login display
		.when('/login', {
			templateUrl: 'login.html',
			controller: 'authController'
		})
		//the signup display
		.when('/register', {
			templateUrl: 'register.html',
			controller: 'authController'
		});
});

twiapp.factory('postService', function($resource){
	return $resource('/api/twits/:id');
});

twiapp.controller('mainController', function(postService, $scope, $rootScope){
	$scope.twits = postService.query();
	$scope.newTwit = {created_by: '', t_text: '', created_at: ''};
	
	$scope.post = function() {
	  $scope.newTwit.created_by = $rootScope.current_twip;
	  $scope.newTwit.created_at = Date.now();
	  postService.save($scope.newTwit, function(){
	    $scope.twits = postService.query();
	    $scope.newTwit = {created_by: '', t_text: '', created_at: ''};
	  });
	};
});

twiapp.controller('authController', function($scope, $http, $rootScope, $location){
  $scope.twip = {username: '', password: ''};
  $scope.error_message = '';

  $scope.login = function(){
    $http.post('/auth/login', $scope.twip).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_twip = data.twip.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_twip = data.twip.username;
        $location.path('/');
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
}); 