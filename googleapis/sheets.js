// Constants / Vars Setup
const fs = require('fs');
const { google } = require('googleapis');

// spaghetti code to get user data
getUserData = function (username) {
    return new Promise((resolve, reject) => {
        console.log("Getting player data for " + username);

        let data = [];
        const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLEAUTH });
        sheets.spreadsheets.values.get({
            spreadsheetId: '1yE73Wqw59SIylmiyFA1l2LmHxcTptnFVbNCL84991ww',
            range: 'players!A2:A',
        }, (err, res) => {
            // console.log("Received Sheets API first response");
            if (err) { reject('The Google Sheets API returned an error: ' + err); console.log("Sheets API error: " + err); return; };
            const rows = res.data.values;
            if (rows.length) {
                rows.map((row) => {
                    data.push(row[0]);
                });
                let row = data.findIndex((element) => element.toLowerCase() == username.toLowerCase());
                if (row == -1) { reject("Couldn't find that user."); return; }
                playerRank = row + 1;
                row = row + 2;
                const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLEAUTH });
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1yE73Wqw59SIylmiyFA1l2LmHxcTptnFVbNCL84991ww',
                    range: 'players!A' + row + ':G' + row,
                }, (err, res) => {
                    // console.log("Received Sheets API Second response")
                    if (err) { reject('The API returned an error: ' + err); return; }
                    const rows = res.data.values;
                    if (rows.length) {
                        rows.map((row) => {
                            row.push(playerRank);
                            resolve(row);
                        });
                    } else {
                        reject('Lost the player row while getting the data. This should never happen!');
                    }
                });
            } else {
                reject('The database is empty or misconfigured.');
            }
        });
    })
}

getTeamData = function (teamname) {
    return new Promise((resolve, reject) => {
        console.log("Getting player data for " + teamname);

        let data = [];
        const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLEAUTH });
        sheets.spreadsheets.values.get({
            spreadsheetId: '1yE73Wqw59SIylmiyFA1l2LmHxcTptnFVbNCL84991ww',
            range: 'teams!A2:A',
        }, (err, res) => {
            // console.log("Received Sheets API first response");
            if (err) { reject('The Google Sheets API returned an error: ' + err); console.log("Sheets API error: " + err); return; };
            const rows = res.data.values;
            if (rows.length) {
                rows.map((row) => {
                    data.push(row[0]);
                });
                let row = data.findIndex((element) => element.toLowerCase() == teamname.toLowerCase());
                if (row == -1) { reject("Couldn't find that team."); return; }
                playerRank = row + 1;
                row = row + 2;
                const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLEAUTH });
                sheets.spreadsheets.values.get({
                    spreadsheetId: '1yE73Wqw59SIylmiyFA1l2LmHxcTptnFVbNCL84991ww',
                    range: 'teams!A' + row + ':G' + row,
                }, (err, res) => {
                    // console.log("Received Sheets API Second response")
                    if (err) { reject('The API returned an error: ' + err); return; }
                    const rows = res.data.values;
                    if (rows.length) {
                        rows.map((row) => {
                            row.push(playerRank);
                            resolve(row);
                        });
                    } else {
                        reject('Lost the team row while getting the data. This should never happen!');
                    }
                });
            } else {
                reject('The database is empty or misconfigured.');
            }
        });
    })
}

module.exports.getUserData = getUserData;
module.exports.getTeamData = getTeamData;