const express = require('express');
const router = express.Router();

router.get('/cop.html', (req, res) => {
    res.render('cop.nj', {
        userId: req.query.userId
    });
});



module.exports = router;