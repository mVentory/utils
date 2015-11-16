var https = require("https");
var GoogleSpreadsheet = require("google-spreadsheet");

var config = {
	credentialPath: "./creds.json",
	siteUrl: "https://api.trademe.co.nz/v1/SiteStats.json",
	sheetId: "1RMcibAPjuPim7N_MUFdVeYqiN_ngroNrQzsHy6VDwB4",
	sheetTitle: "Main"
};

exports.handler = function (event, context) {
	var req = https.get(config.siteUrl, function (res) {
		if (res.statusCode == 200) {
			var body = '';
			res.on('data', function (chunk) {
				body += chunk;
			});
			res.on('end', function () {
				console.log("Site Stats: " + body);
				var stats = JSON.parse(body);

				console.log("Connecting to Spreadsheet ID: " + config.sheetId);
				var spreadsheet = new GoogleSpreadsheet(config.sheetId);

				var creds = require(config.credentialPath);
				spreadsheet.useServiceAccountAuth(creds, function (error) {
					if (error) context.fail(error);
					spreadsheet.getInfo(function (error, sheetInfo) {
						if (error) context.fail(error);

						//Use the worksheet with the same title as config.sheetTitle, when no match is found use the first worksheet
						var worksheetIndex = 0;
						sheetInfo.worksheets.some(function (value, index) {
							if (value.title == config.sheetTitle) {
								worksheetIndex = index;
								return true;
							}
						});						
						var worksheet = sheetInfo.worksheets[worksheetIndex];

						//Format updatedOn datetime
						var dt = new Date();
						var updatedOn = dt.getUTCFullYear() + "-" + (dt.getUTCMonth() + 1) + "-" + dt.getUTCDate() + " " + dt.getUTCHours() + ":" + dt.getUTCMinutes() + ":" + dt.getUTCSeconds();

						worksheet.addRow({
							"Active Members": stats.ActiveMembers,
							"Active Listings": stats.ActiveListings,
							"Members Online": stats.MembersOnline,
							"Updated On": updatedOn
						}, function (error) {
							if (error) context.fail(error);
							context.succeed();
						});
					});
				});
			});
		}
		else context.fail(config.siteUrl + " - " + res.statusCode);
	});
	req.on("error", context.fail);
	req.end();
}