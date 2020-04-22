(function() {
    var mongoose = require('mongoose');
    var Cop = mongoose.model('Cop');

    exports.fetchNearestCops = function(coordinates, maxDistance) {
        console.log(coordinates, maxDistance)
        return Cop.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: coordinates
                        },
                        $maxDistance: maxDistance
                    }
                }
            })
            .exec()
            .catch(error => {
                console.log(error);
            });
    }

    exports.createCop = function(data) {
        Cop.create(data).then((response) => {
            console.log(response)
            return response;
        }, (error) => {
            console.log(error);
            return error;
        });
    };

    exports.fetchCopDetails = function(userId) {
        return Cop.findOne({
                userId: userId
            }, {
                copId: 1,
                displayName: 1,
                phone: 1,
                location: 1,
                approved: 1
            })
            .exec()
            .catch(error => {
                console.log(error);
            });
    }

    exports.updateCopLocation = function(userId, coords) {
        return Cop.findOneAndUpdate({
                userId: userId
            }, {
                '$set': { 'location.coordinates': coords } // lat, lng
            })
            .exec()
            .catch(error => {
                console.log(error)
            })
    }

})()