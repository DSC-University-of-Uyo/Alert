(function () {
    var mongoose = require('mongoose');
    var Cop = mongoose.model('Cop');

    exports.fetchNearestCops = function (coordinates, maxDistance) {
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

    exports.fetchCopDetails = function (userId) {
        return Cop.findOne({
            userId: userId
        }, {
            copId: 1,
            displayName: 1,
            phone: 1,
            location: 1
        })
            .exec()
            .catch(error => {
                console.log(error);
            });
    }

})()