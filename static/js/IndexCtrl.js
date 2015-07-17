angular.module('radioApp')
	.controller('IndexCtrl', ['$scope', '$window', '$log', 'spotifyHelper', 'responseHelper', '$sce',
		function($scope, $window, $log, spotifyHelper, responseHelper, $sce){

			var DEFAULT_AGE = 20;
			var birthYear = $window.birthYear;

			$scope.age = DEFAULT_AGE;
			$scope.year = $window.birthYear + $scope.age;
			$scope.person = $window.name;

			$scope.changeYear = function(age) {
				$scope.year = $window.birthYear + parseInt($scope.age);
				setTracks();
			};

			$scope.trustSrc = function(src) {
				return $sce.trustAsResourceUrl(src);
			};

			var setTracks = function() {
 				var promise = spotifyHelper.getSpotifyInfo($scope.year);
				promise.then(function(response) {
					var jsonResp = response.data;
					$scope.tracks = responseHelper.getTracks(10, jsonResp);
				});
			};

			setTracks();

		}]);


	