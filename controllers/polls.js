let express = require('express');
let router = express.Router();
let pollModel = require('../models/polls');

router.route('/')
    .get(function (req, res) {
        // Code to fetch the polls.
        let pollObject = new pollModel();
        //Calling our model function.
        pollObject.getAllPolls(function (err, pollResponse) {
            if(err){
                return res.json({"responseCode": 1, "responseDesc": pollResponse});
            }
            res.json({"responseCode": 0, "responseDesc": "Success", "data": pollResponse});
        });
    })
    .post(function (req, res) {
        //Code to add new polls
        let pollObject = new pollModel();
        //calling our model function
        //we need to validate our payload here
        pollObject.addNewPolls(req.body, function (err, pollResponse) {
            if(err){
                return res.json({"responseCode": 1, "responseDesc": pollResponse});
            }
            res.json({"responseCode": 0, "responseDesc": "Success", "data": pollResponse});
        });
    })
    .put(function (req, res) {
        //code to update votes of poll
        let pollObject = new pollModel();
        //calling our model function
        // we need to validate our payload here
        pollObject.votePollOption(req.body, function (err, pollResponse) {
            if (err){
                return res.json({"responseCode": 1, "responseDesc": pollResponse});
            }
            res.json({"responseCode": 0, "responseDesc": "Success", "data": pollResponse});
        });
    });

module.exports = router;
