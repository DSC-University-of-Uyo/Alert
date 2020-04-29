const express = require('express');
const router = express.Router();

const home = require('../controllers/home')

router.get('/contact.html', home.contact);

router.get('/about.html', home.about);

router.get('/not-approved.html', home.not_approved);

router.get('/privacy.html', home.privacy);

router.get('/report-scam.html', home.report_scam);

router.post('/report-scam.html', home.save_report);

router.get('/scam.html', home.scam);

module.exports = router;