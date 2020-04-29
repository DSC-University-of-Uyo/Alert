const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

/**
 * Represents a request Schema.
 * @constructor
 */
const scamSchema = mongoose.Schema({
    story: { type: String, required: true, trim: true },
    first_contact: { type: String, required: true },
    scam_type: { type: String, required: true },
    scammer_name: { type: String, required: true },
    scammer_phone: { type: String, required: false },
    scammer_email: { type: String, required: false },
    scammer_extra: { type: String, required: false },
    lost_money: { type: Boolean, required: true },
    amount_lost: { type: Number, required: false },
    data_lost: { type: String, required: false },

});

scamSchema.plugin(mongoose_fuzzy_searching, { fields: ['story', 'scam_type', 'scammer_name'] });

/**
 * Represents a Request.
 * @constructor
 */
const Scam = mongoose.model('Scam', scamSchema);

module.exports = Scam;