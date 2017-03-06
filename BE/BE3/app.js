var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var router = express.Router();
mongoose.connect("mongodb://localhost/be3");
app.use(router);
router.use(bodyParser.json());
var User = mongoose.model("User", {
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
})
router.get("/getUser", function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.end(err);
        } else {
            res.send(users);
        }
    })
})
router.post("/addUser", function (req, res) {
    var test = new User(req.body);
    test.save().then(function (doc) {
        res.end("OK");
    }, function (err) {
        res.end(err);
    })
})
router.put("/editUser", function (req, res) {
    User.findById(req.param("ID"), function (err, user) {
        if (err) {
            res.end(err);
        } else {
            user.id = req.body.id;
            user.name = req.body.name;
            user.save().then(function (doc) {
                res.end("OK");
            }, function (err) {
                res.end(err);
            })
        }
    })
})

app.listen(6969, function () {
    console.log("Đang chạy server ở localhost:6969")
})