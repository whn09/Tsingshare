'use strict';

angular.module('imessages').controller('IMessagesController', ['$scope', '$stateParams', '$location', 'Authentication', 'IMessages',
	function($scope, $stateParams, $location, Authentication, IMessages) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var imessage = new IMessages({
				title: this.title,
				content: this.content
			});
            imessage.$save(function(response) {
				//$location.path('imessages/' + response._id);
                $scope.imessages.push(response);
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(imessage) {
			if (imessage) {
                imessage.$remove();

				for (var i in $scope.imessages) {
					if ($scope.imessages[i] === imessage) {
						$scope.imessages.splice(i, 1);
					}
				}
			} else {
				$scope.imessage.$remove(function() {
					$location.path('imessages');
				});
			}
		};

		$scope.update = function() {
			var imessage = $scope.imessage;

            imessage.$update(function() {
				$location.path('imessages/' + imessage._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.imessages = IMessages.query();
		};

		$scope.findOne = function() {
			$scope.imessage = IMessages.get({
                imessageId: $stateParams.imessageId
			});
		};
	}
]);
