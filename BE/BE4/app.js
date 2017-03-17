var express = require('express');
var app = express();
var config = require('./config/index.js');
var mongoose = require('mongoose');
config.settingExpress(app);
var routes = require('./routes.js')(app);
mongoose.connect(config.mongoUri);
var db = mongoose.connection;
app.listen(config.port, function () {
    console.log('App is running at:' + ' localhost:' + config.port);
})
