let express = require('express');
let router = express.Router();

router.use('/', require('./home'));
router.use('/polls', require('./polls'));

module.exports = router;