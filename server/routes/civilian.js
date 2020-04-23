const express = require('express');
const router = express.Router();

const civilian = require('../controllers/civilian')

router.get('/', civilian.index);

router.get('/offline.html', civilian.offline);

router.get('/civilian.html', (req, res) => {
    res.render('civilian.nj', {
        userId: req.query.userId
    });
});


module.exports = router;