angular.module('radioApp')
	.controller('IndexCtrl', ['$scope', '$window', '$log', 'spotifyHelper',
		function($scope, $window, $log, spotifyHelper){
			$scope.year = $window.birthYear;
			var promise = spotifyHelper.getSpotifyInfo($scope.year);
			promise.then(function(response) {
				$scope.json = response.data;
			});
		}]);