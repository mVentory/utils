# TradeMe Traffic Tracker

This Node.js app logs TradeMe traffic from https://api.trademe.co.nz/v1/SiteStats.xml into a Google Docs spreadsheet. The data then can be presented in a diagram for visualisation.

Raw data spreadsheet: https://docs.google.com/spreadsheets/d/1PdirS7R4hea3G-A86c91xl-9yeLpTQm-7NFSluc7ulM

Diagrams: http://mventory.com/articles/trademe-traffic-traker/

## Setup AWS Lambda Code

1) Restore Node.JS packages used in the app (google-spreadsheet).
	- Install Node.JS from https://nodejs.org
	- Run npm install inside lambda folder

2) Archive app.js, creds.json and node_modules folder in a .zip file.

3) Create a new AWS Lambda function.
	- Skip Step 1 (Select blueprint)
	- Enter Function name
	- Select "Node.js" as "Runtime"
	- Select "Upload a .zip file" as the code entry type
	- Upload the .zip from Step 2
	- Enter "app.handler" as the "Handler"
	- Select "basic execution role" as the "Role"
	- Enter "128" as "Memory (MB)"
	- Enter "30 seconds" as "Timeout" (Function currently generally runs under 10 seconds)
	- Finish wizard
	
4) Add Event Source to run AWS Lambda function every 15 minutes.
	- Click Event sources tab from the function details page
	- Click Add event sources link
	- Select "Scheduled Event" as the "Event Source type"
	- Enter Schedule name
	- Select "rate(15 minutes)" as the "Schedule expression"
	- Enable event source
	- Finish wizard


## Generating Google credentials

1) Go to the Google Developers Console (https://console.developers.google.com/project)
2) Select your project or create a new one (and then select it)
3) Enable the Drive API for your project
	- In the sidebar on the left, expand APIs & auth > APIs
	- Search for "drive"
	- Click on "Drive API"
	- Click the blue "Enable API" button
4) Create a service account for your project
	- In the sidebar on the left, expand APIs & auth > Credentials
	- Click "Create new Client ID" button
	- Select the "Service account" option
	- Click "Create Client ID" button to continue
	- When the dialog appears click "Okay, got it"
	- Your JSON key file is generated and downloaded to your machine
5) Use the the generated JSON key file
	- Place the file inside the lambda folder
	- Rename it to creds.json or any filename as long as it matches config.credentialsPath in lambda/app.js

## Google Spreadsheet Credentials

1) Create a new spreadsheet document:
    - the name of the sheet is unimportant
    - rename the first sheet from `Sheet1` to `Main`
    - use the following columns `Active Members`,`Active Listings`,`Members Online`,`Updated On`
    - set default sharing to `Anyone with the link can view` for the chart script to access it
    - share the document with the service account email with `Can edit` permissions

## Charts example

1) Copy the HTML from _sample/index.html_ into your web page
2) Replace the URL in _sample/trademe-tracker-chart.js_ (including gid parameter) to point your spreadsheet with the TM data.
3) Remove comments, white space and line breaks in the script embeded into the HTML page if pasting into WordPress to avoid <p> tas inserted by the HTML editor and breaking your script.


## _Notes_

- The Lamda Function uses google-spreadsheet module, details on how to generate the JSON key file can be found there (https://www.npmjs.com/package/google-spreadsheet)

## Credits

- big thanks to Carl (@cubski) for making this tracker possible and putting an extra effort with the access control and Google API.
