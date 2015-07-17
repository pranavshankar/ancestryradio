angular.module('radioApp')
	.controller('IndexCtrl', ['$scope', '$window', '$log', 'spotifyHelper', 'responseHelper', '$sce',
		function($scope, $window, $log, spotifyHelper, responseHelper, $sce){

			var DEFAULT_AGE = 20;
			var birthYear = $window.birthYear;

			$scope.age = DEFAULT_AGE;
			$scope.year = $window.birthYear + $scope.age;
			$scope.person = $window.name;
			$scope.lastName = $window.last;
			$scope.imgUrl = $window.imgUrl;

			$scope.picStyle = {'background-image': 'url(' + $scope.imgUrl + ')'};

			$scope.changeYear = function(age) {
				$scope.year = $window.birthYear + parseInt($scope.age);
				setTracks();
			};

			$scope.trustSrc = function(src) {
				return $sce.trustAsResourceUrl(src);
			};

			$scope.maxLength = function() {
				var year = 2015 - birthYear;
				if (year > 100) {
					return 100;
				}
				return year;
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


	