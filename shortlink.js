const mongoose = require('mongoose');

const shortlinkSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: String,
    url: String
});

module.exports = mongoose.model('Shortlink', shortlinkSchema);