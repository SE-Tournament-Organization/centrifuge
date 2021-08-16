// The best way to keep things organised is to make it modular.

// Run the bot
const bot = require("./bot/botmain.js");
bot.run("se!");

// Sheets API stuff, here for testing.
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

let data = [];
let user = "TotallyToasted";

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './googleapis/token.json';

// Load client secrets from a local file.
fs.readFile('./googleapis/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  console.log("Now calling the Google Sheets API");
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1yE73Wqw59SIylmiyFA1l2LmHxcTptnFVbNCL84991ww',
    range: 'db!A2:A',
  }, (err, res) => {
    console.log("Received Sheets API first response")
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      rows.map((row) => {
        data.push(row[0]);
    });
    thirdStage(auth);
    } else {
      console.log('No data found.');
    }
  });
}

function thirdStage(auth) {
    let row = data.findIndex((element) => element == user);
    if (row == -1) return console.log("Couldn't find that user");
    row = row + 2;

    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
    spreadsheetId: '1yE73Wqw59SIylmiyFA1l2LmHxcTptnFVbNCL84991ww',
    range: 'db!A' + row + ':G' + row,
        }, (err, res) => {
    console.log("Received Sheets API Second response")
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      rows.map((row) => {
        console.log(row[0] + " " + row[1] + " " + row[2] + " " + row[3] + " " + row[4] + " " + row[5] + " " + row[6])
          });
    } else {
      console.log('No data found.');
    }
  });
}