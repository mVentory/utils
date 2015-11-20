var sheetApi = require("./sheetApi");
var siteApi = require("./siteApi");

var config = {
	spreadsheetId: "1PvLp6O5NLeXZW00l79PXL0Zqcy3ysAocmBmX7tKTPPU",
	credentialPath: "./creds.json"
};

exports.handler = function (event, context) {

	console.log("Retrieving site stats...")
	siteApi.getSiteStats(function (err, data) {
		if (err) context.fail(err);

		var siteStats = data;

		console.log("Authenticating...");
		sheetApi.authenticate(require(config.credentialPath), function (err) {
			if (err) context.fail(err);

			console.log("Retrieving worksheets from spreadsheet #" + config.spreadsheetId);
			sheetApi.getWorksheets(config.spreadsheetId, function (err, data) {
				if (err) context.fail(err);

				var worksheet;
				if (data.entry.constructor === Array) {
					worksheet = data.entry[0];
				} else {
					worksheet = data.entry;
				}

				var worksheetId = worksheet.id.substring(worksheet.id.lastIndexOf("/") + 1);

				var dt = new Date();
				var updatedOn = dt.getUTCFullYear() + "-" + (dt.getUTCMonth() + 1) + "-" + dt.getUTCDate() + " " + dt.getUTCHours() + ":" + dt.getUTCMinutes() + ":" + dt.getUTCSeconds();

				var rowData = [siteStats.ActiveMembers, siteStats.ActiveListings, siteStats.MembersOnline, updatedOn];

				console.log("Add rows to spreadsheet #" + config.spreadsheetId + " worksheet #" + worksheetId + ": " + JSON.stringify(rowData));
				sheetApi.addRows(config.spreadsheetId, worksheetId, rowData, function (err, data) {
					if (err) context.fail(err);
					context.succeed();
				});
			});
		});
	});

}