'use strict'

const os = require('os')
const fs = require('fs')
const path = require('path')
const isDev = require('electron-is-dev')

var readFile = function(filepath, cb) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
          if(err){
              console.log("An error ocurred reading the file :" + err.message);
              return;
          }
          // Change how to handle the file content
          console.log("The file content is : " + data);

          cb(data);
    });
}

module.exports = {
  readFile: readFile
}
