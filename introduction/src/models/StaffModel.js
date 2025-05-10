const mongoose = require('mongoose');
const { v4: uuid4 } = require('uuid');

const staffSchema = new mongoose.Schema({
    staffId: { type: String, required: true, default: uuid4, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    joinDate: { type: Date, required: true, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'LIBRARIAN', 'STAFF']
    },
});

module.exports = mongoose.model('Staff', staffSchema);