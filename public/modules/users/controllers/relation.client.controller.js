'use strict';

angular.module('users').controller('RelationController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;
        $scope.lover = user.lover;
        //$scope.lover = {'_id': 1, 'displayName': 'aaa'}; // fake data
        // TODO
        $scope.requesters = user.requesters;
        //$scope.requesters = [{'_id': 1, 'displayName': 'aaa'}, {'_id': 2, 'displayName': 'bbb'}]; // fake data
        // TODO
        $scope.myrequest = user.myrequest;
        //$scope.myrequest = {'_id': 1, 'displayName': 'aaa'};

        // If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

        /**
         * search user using userid
         */
        $scope.searchuser = function() {
            $http.get('/users/search/?userid='+$scope.userid).success(function(response) {
                $scope.result = response;

            }).error(function(response) {
                console.log(response);
                $scope.error = response.message;
            });
        };

        /**
         * user send request to lover
         */
        $scope.requestuser = function() {
            $http.post('/relation/request', {"userid":$scope.userid}).success(function(response) {
                $scope.success = true;
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        /**
         * TODO
         * relate user to lover
         */
        $scope.acceptuser = function() {
            $http.post('/relation/accept', {"userid":$scope.userid,"status":"accepted"}).success(function(response) {
                $scope.authentication.user = response;

                // And redirect to the index page
                $location.path('/');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

        /**
         * TODO
         * don't relate user to lover
         */
        $scope.rejectuser = function() {
            $http.post('/relation/reject', {"userid":$scope.userid,"status":"rejected"}).success(function(response) {
                $scope.success = true;
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

	}
]);
