(function () {
    var mongoose = require('mongoose');
    var Request = mongoose.model('Request');


    exports.saveRequest = function (requestId, requestTime, location, civilianId, status) {
        const request = new Request({
            "_id": requestId,
            requestTime: requestTime,
            location: location,
            civilianId: civilianId,
            status: status
        });

        return request.save()
            .catch(error => {
                console.log(error)
            });
    }

    exports.updateRequest = function (issueId, copId, status) {
        return Request.findOneAndUpdate({
            "_id": issueId
        }, {
            status: status,
            copId: copId
        }).catch(error => {
            console.log(error);
        });
    }

    exports.fetchRequests = function () {
        return new Promise((resolve, reject) => {
            try {
                const requestsData = [];

                const stream = Request.find({}, {
                    requestTime: 1,
                    status: 1,
                    location: 1,
                    _id: 0
                }).stream();

                stream.on("data", function (request) {
                    requestsData.push(request);
                });

                stream.on("end", function () {
                    resolve(requestsData);
                });

            } catch (err) {
                console.log(err);
                reject(err);
            }
        });
    }


})()