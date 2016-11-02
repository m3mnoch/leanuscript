// imports
import jetpack from 'fs-jetpack'; // module loaded from npm

// main export var
var themes = {}

// setups
var myApp;
var userDataPath;
var config;

var forceNewConfig = true;


themes.init = function(x) {
    myApp = x;
    userDataPath =  myApp.getPath('userData');

    config = jetpack.read(userDataPath + "/config.json", "json")
    if (typeof config === 'undefined' || forceNewConfig) {
        // there's not a config since this is the first start.
        console.log("config file doesn't exist.")
        themes.initUserData();
    }
}

themes.initUserData = function() {
    config = {};
    config.currentTheme = "default";
    jetpack.write(userDataPath + "/config.json", config);

    var src = jetpack.cwd(myApp.getAppPath());
    var dest = jetpack.cwd(userDataPath);
    src.copy('themes', dest.path('themes'));
}


themes.debug = function() {
    console.log('userData path: ' + userDataPath)
}

themes.loadCurrent = function() {
    var data = jetpack.read('file.txt');
    console.log(data);
}

export {themes};
