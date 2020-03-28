const express = require('express');
const router = express.Router();

router.get('/cop.html', (req, res) => {
    res.render('cop.html', {
        userId: req.query.userId
    });
});



module.exports = router;