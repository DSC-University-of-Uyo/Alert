const express = require('express');
const router = express.Router();

const home = require('../controllers/home')

router.get('/contact.html', home.contact);

router.get('/about.html', home.about);

router.get('/not-approved.html', home.not_approved);


module.exports = router;