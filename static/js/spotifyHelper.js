angular.module('radioApp')
	.factory('spotifyHelper', ['$http', 
		function($http) {
			var _getSpotifyInfo = function(birthYear) {
				var decade = birthYear - (birthYear % 10);
				var other = decade + 10;
				var URI = "https://api.spotify.com/v1/search?q=year:" + decade + "-" + other + "&type=track&limit=20";
				console.log(URI);
				var promise = $http.get(URI);
				return promise;
			};
			return {
				getSpotifyInfo: _getSpotifyInfo
			};
		}]);