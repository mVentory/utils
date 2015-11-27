function showCharts() {
	sheetrock({
		url: "https://docs.google.com/spreadsheets/d/1PdirS7R4hea3G-A86c91xl-9yeLpTQm-7NFSluc7ulM#gid=0", // Public Google Spreadsheet Url
		query: "select D, A, B, C", //column D = Updated On, column A = Active Members, column B = Active Listings, column C = Members Online
		callback: function (error, options, response) {
			if (!response) return;

			var activeListingsTable = new google.visualization.DataTable();
			activeListingsTable.addColumn('datetime', 'DateTime');
			activeListingsTable.addColumn('number', 'Active Listings');
			
			var membersOnlineTable = new google.visualization.DataTable();
			membersOnlineTable.addColumn('datetime', 'DateTime');
			membersOnlineTable.addColumn('number', 'Members Online');
			
			var result = response.raw.table;
			for (var i = 0; i < result.rows.length; i++) {
				var row = result.rows[i];
				
				var datetime = new Date(row.c[0].f);
				var activeListings = row.c[2].v;
				var membersOnline = row.c[3].v;
				
				activeListingsTable.addRow([datetime, activeListings]);
				membersOnlineTable.addRow([datetime, membersOnline]);
			}

			var options = {
				hAxis: {
					title: 'Date'
				},
				vAxis: {
					title: 'Count'
				},
				series: {
					1: { curveType: 'function' }
				}
			};

			options.title = "Active Listings";
			chart = new google.visualization.LineChart(document.getElementById('active_listings_chart'));
			chart.draw(activeListingsTable, options);
			
			options.title = "Members Online";			
			chart = new google.visualization.LineChart(document.getElementById('members_online_chart'));
			chart.draw(membersOnlineTable, options);
		}
	});
}