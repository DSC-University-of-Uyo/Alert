var scam = require('../services/scam');

exports.index = function(req, res) {
    scam.allReports().then(c => {
        res.render('index.nj', { scams: c });
    })
}

exports.offline = function(req, res) {
    res.render('offline.nj');
}