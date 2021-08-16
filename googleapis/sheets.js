// Constants / Vars Setup
const fs = require('fs');
const { google } = require('googleapis');
let connected = false;
let auth;

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = './googleapis/token.json';

function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return console.log("Couldn't read API token");
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}


getUserData = function (username) {
    return new Promise((resolve, reject) => {
        console.log("Getting player data for " + username);

        let data = [];
        const sheets = google.sheets({ version: 'v4', auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: '1yE73Wqw59SIylmiyFA1l2LmHxcTptnFVbNCL84991ww',
            range: 'db!A2:A',
        }, (err, res) => {
            // console.log("Received Sheets API first response");
            if (err) { reject('The API returned an error: ' + err); return; };
            const rows = res.data.values;
            if (rows.length) {
                rows.map((row) => {
                    data.push(row[0]);
                });
                let row = data.findIndex((element) => element == username);
                if (row == -1) { reject("Couldn't find that user"); return; }
                row = row + 2;

                const sheets = google.sheets({ version: 'v4', auth });
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1yE73Wqw59SIylmiyFA1l2LmHxcTptnFVbNCL84991ww',
                    range: 'db!A' + row + ':G' + row,
                }, (err, res) => {
                    // console.log("Received Sheets API Second response")
                    if (err) { reject('The API returned an error: ' + err); return; }
                    const rows = res.data.values;
                    if (rows.length) {
                        rows.map((row) => {
                            resolve(row);
                        });
                    } else {
                        reject('No data found.');
                    }
                });
            } else {
                reject('No data found.');
            }
        });
    })
}

module.exports.getUserData = getUserData;
module.exports.authenticate = function () {
    // Load client secrets from a local file.
    fs.readFile('./googleapis/credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials
        authorize(JSON.parse(content), function (oAuth2Client) {
            console.log("Now connected to the Google Sheets API");
            connected = true;
            auth = oAuth2Client;
        });
    });
}