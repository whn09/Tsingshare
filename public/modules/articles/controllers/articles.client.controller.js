'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$http', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $http, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};

        // fake data
        /*$scope.users = [
            {name: 'Moroni', age: 50},
            {name: 'Tiancum', age: 43},
            {name: 'Jacob', age: 27},
            {name: 'Nephi', age: 29},
            {name: 'Enos', age: 34}
        ];*/
        $scope.wx_stats = '';
        console.log('/wx_stats?articleid='+$stateParams.articleId);
        $http.get('/wx_stats?articleid='+$stateParams.articleId).success(function(response) {
            //console.log(response);
            $scope.wx_stats = response;
        }).error(function(response) {
            //console.log(response);
            $scope.error = response.message;
        });
	}
]);
