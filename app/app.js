(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var os = require('os');
var electron = require('electron');
var jetpack = _interopDefault(require('fs-jetpack'));

// imports
// module loaded from npm

// main export var
var themes = {}

// setups
var myApp;
var userDataPath;
var config;
themes.init = function(x) {
    myApp = x;
    userDataPath =  myApp.getPath('userData');

    config = jetpack.read(userDataPath + "/config.json", "json")
    if (typeof config === 'undefined') {
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

// Simple wrapper exposing environment variables to rest of the code.

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
// native node.js module
// native electron module
// module loaded from npm
//import { greet } from './hello_world/hello_world'; // code authored by you in this project
console.log('Loaded environment variables:', env);

var app = electron.remote.app;
var appDir = jetpack.cwd(app.getAppPath());
themes.init(app);

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    //document.getElementById('greet').innerHTML = greet();
    //document.getElementById('platform-info').innerHTML = os.platform();
    //document.getElementById('env-name').innerHTML = env.name;
    themes.debug();
});
}());
//# sourceMappingURL=app.js.map