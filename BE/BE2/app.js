var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
app.use(router);
router.use(bodyParser.text());
router.get("/getUser", function (req, res) {
    fs.readFile("./user.json", function (err, data) {
        if (err) {
            res.end(err);
        } else {
            res.end(data);
        }
    })
})
router.post("/addUser", function (req, res) {
    fs.readFile("./user.json", function (err, data) {
        if (err) {
            res.end(err);
        } else {
            var test = JSON.parse(data);
            test.push(JSON.parse(req.body));
            fs.writeFile("./user.json", JSON.stringify(test, null, 4), function (err) {
                if (err) {
                    res.end(err);
                } else {
                    res.end("OK");
                }
            })
        }
    })
})
router.put("/editUser", function (req, res) {
    fs.readFile("./user.json", function (err, data) {
        if (err) {
            res.end(err);
        } else {
            var test = JSON.parse(data);
            console.log("id: " + req.param("ID"));
            for (var i = 0; i < test.length; i++) {
                if (test[i].id == req.param("ID")) {
                    test[i] = JSON.parse(req.body);
                }
            }
            fs.writeFile("./user.json", JSON.stringify(test, null, 4), function (err) {
                if (err) {
                    res.end(err);
                } else {
                    res.end("OK");
                }
            })
        }
    })
})
app.listen(6969, function () {
    console.log("Đang chạy server ở localhost:6969")
})