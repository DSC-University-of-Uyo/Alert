var cop = require('../services/cop');
var request = require('../services/request');


exports.findNearestCops = async(req, res) => {
    /*
        extract the latitude and longitude info from the request query params.
        Then, fetch the nearest cops using MongoDB's geospatial queries and return it back to the client.
    */
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);
    const nearestCops = await cop.fetchNearestCops([longitude, latitude], 2000);

    res.json({
        cops: nearestCops
    });
}


exports.fetchCopDetails = async(req, res) => {

    const userId = req.query.userId // xtract userId from query params
    const copDetails = await cop.fetchCopDetails(userId);

    res.json({
        copDetails: copDetails
    });
}

exports.updateCopLocation = async(req, res) => {

    const userId = req.query.userId // xtract userId from query params
    const coords = [Number(req.body.lat), Number(req.body.lng)]; // lat, lng
    const copDetails = await cop.updateCopLocation(userId, coords);

    res.json({
        copDetails: copDetails
    });
}


exports.createCop = async(req, res) => {

    // const userId = req.query.userId // xtract userId from query params
    // const coords = [Number(req.body.lat), Number(req.body.lng)]; // lat, lng
    console.log('---------------');
    const copDetails = await cop.createCop(req.body);
    console.log('++++++++++++', copDetails)

    res.json({
        copDetails: copDetails
    });
}


exports.fetchRequestInfo = async(req, res) => {
    const results = await request.fetchRequests();
    const features = [];

    for (let i = 0; i < results.length; i++) {
        features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: results[i].location.coordinates
            },
            properties: {
                status: results[i].status,
                requestTime: results[i].requestTime,
                address: results[i].location.address
            }
        });
    }

    const geoJsonData = {
        type: 'FeatureCollection',
        features: features
    }

    res.json(geoJsonData);
}