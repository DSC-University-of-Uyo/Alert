(function() {
    var mongoose = require('mongoose');
    var Scam = mongoose.model('Scam');

    exports.searchReport = function(query) {
        return Scam.find({
                location: ""
            })
            .exec()
            .catch(error => {
                console.log(error);
            });
    }

    exports.addReport = function(data) {
        Scam.create(data).then((response) => {
            console.log(response)
            return response;
        }, (error) => {
            console.log(error);
            return error;
        });
    };

    exports.fetchReportDetails = function(id) {
        return Scam.findOne({
                _id: id
            })
            .exec()
            .catch(error => {
                console.log(error);
            });
    }


    exports.allReports = function() {
        return Scam.find({

            })
            .exec()
            .catch(error => {
                console.log(error);
            });
    }

    exports.search = function(query) {

    }

})()