const express = require('express');
const router = express.Router();

const civilian = require('../controllers/civilian')

router.get('/', civilian.index);

router.get('/', civilian.offline);

// request to /civilian.html?userId=ashwin will render our civilian.html page
router.get('/civilian.html', (req, res) => {
    res.render('civilian.nj', {
        userId: req.query.userId
    });
});


module.exports = router;