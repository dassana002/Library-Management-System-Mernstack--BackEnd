const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const memberSchema = new mongoose.Schema({
  memberId: { type: String, required: true, default: uuidv4, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Email validation
  memberShipDate: { type: Date, required: true, default: Date.now },
});

module.exports = mongoose.model('Member', memberSchema);