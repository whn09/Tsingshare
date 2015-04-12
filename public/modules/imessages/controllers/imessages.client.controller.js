'use strict';

angular.module('imessages').controller('IMessagesController', ['$scope', '$http', '$stateParams', '$location', 'Socket', 'Authentication', 'IMessages',
	function($scope, $http, $stateParams, $location, Socket, Authentication, IMessages) {
		$scope.authentication = Authentication;
		//console.log($scope.authentication);

		$scope.currentPage = 1;
		$scope.totalPage = 1;
		$scope.pageSize = 10;
		$scope.pages = [];
		$scope.endPage = 1;

		$scope.init = function() {
			$http.get('/imessages/count').success(function(response) {
				$scope.totalCount = response;
				$scope.totalPage = Math.ceil($scope.totalCount / $scope.pageSize);
				$scope.currentPage = $scope.totalPage;
				$scope.endPage = $scope.totalPage;
				$scope.find();
			});
		};

		$scope.create = function() {
			var imessage = new IMessages({
				title: this.title,
				content: this.content
			});
            imessage.$save(function(response) {
				//$location.path('imessages/' + response._id);
                //$scope.imessages.push(response); // change to Socket.on
				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		/*$scope.enter = function(ev) {
			//console.log(ev.keyCode);
			if (ev.keyCode === 13) {
				$scope.create();
			}
		};*/

		Socket.on('imessage.created', function(imessage) {
			$scope.imessages.push(imessage);
			//alert(imessage);
		});

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
			$scope.imessages = IMessages.query({page: $scope.currentPage, pagesize:$scope.pageSize});
			//console.log($scope.imessages);
			//生成数字链接
			if ($scope.currentPage > 1 && $scope.currentPage < $scope.totalPage) {
				$scope.pages = [
					$scope.currentPage - 1,
					$scope.currentPage,
					$scope.currentPage + 1
				];
			} else if ($scope.currentPage === 1 && $scope.totalPage > 1) {
				$scope.pages = [
					$scope.currentPage,
					$scope.currentPage + 1
				];
			} else if ($scope.currentPage === $scope.totalPage && $scope.totalPage > 1) {
				$scope.pages = [
					$scope.currentPage - 1,
					$scope.currentPage
				];
			}
		};

		$scope.findOne = function() {
			$scope.imessage = IMessages.get({
                imessageId: $stateParams.imessageId
			});
		};

		$scope.next = function () {
			if ($scope.currentPage < $scope.totalPage) {
				$scope.currentPage++;
				$scope.find();
			}
		};

		$scope.prev = function () {
			if ($scope.currentPage > 1) {
				$scope.currentPage--;
				$scope.find();
			}
		};

		$scope.loadPage = function (page) {
			$scope.currentPage = page;
			$scope.find();
		};
	}
]);
