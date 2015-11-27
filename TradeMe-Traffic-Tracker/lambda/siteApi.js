var https = require("https");

function SiteApi() {
	this.getSiteStats = function (callback) {
		https.get('https://api.trademe.co.nz/v1/SiteStats.json', function (res) {
			if (res.statusCode !== 200) {
				callback(new Error(res.statusCode + ": " + res.statusMessage), null);
				return;
			}

			var data = '';
			res.on('data', function (chunk) {
				data += chunk;
			});

			res.on('end', function (err) {
				if (err) {
					callback(err, null);
					return;
				}

				callback(null, JSON.parse(data));
			});
		});
	}
}

var api = new SiteApi();
module.exports = api;