angular.module('radioApp')
	.factory('responseHelper', 
		function() {
			// old uri: 
			var SPOTIFY_API_BASE = "https://embed.spotify.com/?uri=spotify:trackset:PREFEREDTITLE:";
			// num must be less than 20
			var _getTracks = function(num, jsonResp) {
				console.log(jsonResp);
				var items = jsonResp.tracks.items;
				console.log(items);
				var songIds = [];
				for (i = 0; i < num; i++) {
					songIds.push(items[i].id);
				}
				var retStr = SPOTIFY_API_BASE;
				for (i = 0; i < num - 1; i++) {
					retStr += songIds[i] + ",";
				}
				retStr += songIds[num - 1];
				return retStr;
			};

			return {
				getTracks: _getTracks
			};
		});