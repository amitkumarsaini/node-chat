var MessageModal = require('./messageModal');

exports.getMessage = function (req, res) {
    MessageModal.aggregate(
        [
            {
                "$match": {
                    "reciver": req.user.username
                }
            },
            {
                "$sort": {
                    "createdAt": -1
                }
            },
            {
                "$group": {
                    "_id": "$from",
                    "message": {
                        "$first": "$message"
                    },
                    "createdAt": {
                        "$first": "$createdAt"
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "from": "$_id",
                    "message": 1,
                    "createdAt": 1
                }
            }
        ],
        function (err, messages) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(messages)
            }
        }
    );
};

exports.addMessage = function (req, res) {
    var myData = new MessageModal(req.body);
    myData.save()
        .then(item => {
            res.send("msg saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
};