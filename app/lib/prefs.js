'use strict'

const lmFiles = require('./files.js')
const isDev = require('electron-is-dev')

var prefPath = "./";
var prefFilename = "prefs.json";

var setFilePath = function(fp) {
    prefPath = fp
}

var loadPrefs = function() {
    var filepath = prefPath + "/" + prefFilename;
    console.log("loading prefs file from: " + filepath);
    lmFiles.readFile(filepath, processPrefs);
}

var processPrefs = function(prefJson) {
    console.log(prefJson);
}

module.exports = {
    setFilePath: setFilePath,
    loadPrefs: loadPrefs
}
