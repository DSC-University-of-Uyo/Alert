const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

router.get('/', api.findNearestCops);


router.get('/info', api.fetchCopDetails);


// fetch all requests
router.get('/requests/info', api.fetchRequestInfo);

router.post('/update', api.updateCopLocation);

router.post('/update/address', api.updateCopAddress);

router.post('/create', api.createCop)

module.exports = router;