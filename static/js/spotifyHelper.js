angular.module('radioApp')
	.factory('spotifyHelper', ['$http', 
		function($http) {
			var _getSpotifyInfo = function(birthYear) {
				// var decade = birthYear - (birthYear % 10);
				// var other = decade + 10;
				var startYear = birthYear;
				var endYear = birthYear;
				var URI = "https://api.spotify.com/v1/search?q=year:" + startYear + "-" + endYear + "&type=track&limit=20";
				var promise = $http.get(URI);
				return promise;
			};
			return {
				getSpotifyInfo: _getSpotifyInfo
			};
		}]);