const express = require('express');
const router = express.Router();

const civilian = require('../controllers/civilian')

router.get('/', civilian.index);

// request to /civilian.html?userId=ashwin will render our civilian.html page
router.get('/civilian.html', (req, res) => {
    res.render('civilian.html', {
        userId: req.query.userId
    });
});


module.exports = router;