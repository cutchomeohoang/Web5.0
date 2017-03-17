var User = require('./user.model.js');
module.exports = {
    getUser: function (req, res) {
        User.find(function (err, data) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.json(data);
            }
        })
    },
    addUser: function (req, res) {
        var temp = new User(req.body);
        temp.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send('OK');
            }
        })
    },
    editUser: function (req, res) {
        User.findByIdAndUpdate(req.param('ID'), req.body, function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send('OK');
            }
        })
    },
    deleteUser: function (req, res) {
        User.findByIdAndRemove(req.param('ID'), function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send('OK');
            }
        })
    }
}