const mongoose = require('mongoose');

/**
 * Represents a request Schema.
 * @constructor
 */
const requestSchema = mongoose.Schema({
    requestTime: { type: Date },
    location: {
        coordinates: [Number],
        address: { type: String }
    },
    civilianId: { type: String },
    copId: { type: String },
    status: { type: String }
});

/**
 * Represents a Request.
 * @constructor
 */
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;