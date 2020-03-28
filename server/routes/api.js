const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

router.get('/', api.findNearestCops);


router.get('info', api.fetchCopDetails);


// fetch all requests
router.get('requests/info', api.fetchRequestInfo);

module.exports = router;