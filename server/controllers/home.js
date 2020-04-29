const scam = require('../services/scam');
const ScamModel = require('../models/scam');

exports.contact = function(req, res) {
    res.render('contact.nj');
}


exports.about = function(req, res) {
    res.render('about.nj');
}


exports.not_approved = function(req, res) {
    res.render('not-approved.nj');
}


exports.privacy = function(req, res) {
    res.render('privacy.nj');
}


exports.report_scam = function(req, res) {
    res.render('report-scam.nj')
}

exports.save_report = function(req, res) {
    scam.addReport(req.body);
    res.json({})
}


exports.scam = function(req, res) {


    if (req.method == 'POST') {
        ScamModel.fuzzySearch(req.body.search).then(c => {
            res.render('scam.nj', { scams: c });
        }).catch(e => {
            scam.allReports().then(c => {
                res.render('scam.nj', { scams: c });
            })
        });
    } else {
        scam.allReports().then(c => {
            res.render('scam.nj', { scams: c });
        })
    }

}