// Sheets API > Browser Quickstart
// https://developers.google.com/sheets/api/quickstart/js?hl=ja

const GAPI_CLIENT_ID = '356201932169-7e7t9h59p5deb831clavmnt4h7ourtk8.apps.googleusercontent.com'
const GAPI_API_KEY = 'AIzaSyAb51FbpjiDB6ciHnA7OObQYYA8wD731Y8'
const GAPI_DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
const GAPI_SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly"
let dict = []

gapi.load('client:auth2', () => {
    initClient()
})

function initClient () {
    gapi.client.init({
        apiKey: GAPI_API_KEY,
        clientId: GAPI_CLIENT_ID,
        discoveryDocs: GAPI_DISCOVERY_DOCS,
        scope: GAPI_SCOPES
    })
    // This function does not resolve. 🤔
    // Watch gapi.client.sheets become available.

    const timerId = setInterval(() => {
        if (gapi.client.sheets) {
            clearInterval(timerId)
            getSheetValues()
        }
    }, 100)
}

function getSheetValues() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1QmVtnEulWmrv9ZjV584bpTP4Jkj5gazG_qKdQspYOD8',
        range: 'dict!A:B'
    }).then(resp => {
        dict = resp.result.values
    })
}

function translate(html, dict) {
    return dict.reduce((tmpHtml, dictElem) => {
        return tmpHtml.replace(new RegExp(dictElem[0], 'g'), dictElem[1])
    }, html)
}

chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg.translate) {
        sendResponse(translate(msg.translate, dict))
    }
})
