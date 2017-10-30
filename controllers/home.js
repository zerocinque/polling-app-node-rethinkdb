let express = require('express');
let router = express.Router();

router.get('/', function (req, res) {
    res.send('<h2>Home.js</h2>');
});

module.exports = router;