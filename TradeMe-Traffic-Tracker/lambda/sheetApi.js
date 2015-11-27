var google = require('googleapis');
var https = require('https');
var xml2js = require('xml2js')

function SheetApi() {

	var GOOGLE_AUTH_SCOPE = ["https://spreadsheets.google.com/feeds"];

	var self = this;
	this.tokens = 0;
	this.parser = new xml2js.Parser({ explicitArray: false, explicitRoot: false });

	this.authenticate = function (creds, callback) {
		var client = new google.auth.JWT(creds.client_email, null, creds.private_key, GOOGLE_AUTH_SCOPE, creds.client_email);
		client.authorize(function (err, tokens) {
			self.tokens = tokens;
			callback(err);
		});
	}

	this.getSpreadsheets = function (callback) {
		this.getResults('/feeds/spreadsheets/private/full', 'GET', null, callback);
	}

	this.getWorksheets = function (spreadsheet_id, callback) {
		this.getResults('/feeds/worksheets/' + spreadsheet_id + '/private/full', 'GET', null, callback);
	}

	this.addRows = function (spreadsheet_id, worksheet_id, data, callback) {
		var body = '<entry xmlns="http://www.w3.org/2005/Atom" xmlns:gsx="http://schemas.google.com/spreadsheets/2006/extended">';
		body += '<gsx:activemembers>' + data[0] + '</gsx:activemembers>';
		body += '<gsx:activelistings>' + data[1] + '</gsx:activelistings>';
		body += '<gsx:membersonline>' + data[2] + '</gsx:membersonline>';
		body += '<gsx:updatedon>' + data[3] + '</gsx:updatedon>';
		body += '</entry>';

		this.getResults('/feeds/list/' + spreadsheet_id + '/' + worksheet_id + '/private/full', 'POST', body, callback);
	}

	this.getResults = function (path, method, body, callback) {
		var options = {
			method: method,
			path: path,
			hostname: 'spreadsheets.google.com',
			headers: {
				"GData-version": "3.0",
				"Authorization": "Bearer " + self.tokens.access_token
			}
		};

		if (body) {
			options.headers["Content-Type"] = "application/atom+xml";
		}

		var req = https.request(options, function (res) {
			if (res.statusCode !== 200 && res.statusCode !== 201) {
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

				self.parser.parseString(data, function (err, result) {
					callback(err, result);
				});
			});
		});

		if (body) req.write(body);
		req.end();

		req.on('error', function (err) {
			callback(err, null);
		});
	}
}

var api = new SheetApi();
module.exports = api;