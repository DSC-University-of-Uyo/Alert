const mongoose = require('mongoose');

/**
 * Represents a Cop's Schema.
 * @constructor
 */
const copSchema = mongoose.Schema({
    userId: { type: String, unique: true, required: true, trim: true },
    displayName: { type: String, trim: true },
    phone: { type: String },
    email: { type: String, unique: true },
    earnedRatings: { type: Number },
    totalRatings: { type: Number },
    approved: { type: Boolean },
    location: {
        type: {
            type: String,
            required: true,
            default: "Point"
        },
        address: { type: String },
        coordinates: [Number],
    }
});

copSchema.index({ "location": "2dsphere", userId: 1 });

/**
 * Represents a Cop.
 * @constructor
 */
const Cop = mongoose.model('Cop', copSchema);
module.exports = Cop;