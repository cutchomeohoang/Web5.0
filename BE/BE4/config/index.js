var express = require('express');
var bodyParser = require('body-parser');
module.exports = {
    port: 6969,
    settingExpress: function (app) {
        app.use(bodyParser.json());
    },
    mongoUri: 'mongodb://localhost/be4'
}