const mongoose = require('mongoose');
const { v4: uuid4 } = require('uuid');

const lendingSchema = new mongoose.Schema({
  lendingId: { type: String, required: true, default: uuid4, unique: true },
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book', 
    required: true 
  },
  member: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Member', 
    required: true 
  },
  lendingDate: { type: Date, required: true, default: Date.now },
  returnDate: { type: Date, required: true },
  isActive: { type: Boolean, required: true, default: true },
  overDue: { type: Number, required: true, default: 0 }, 
  fineAmount: { type: Number, required: true, default: 0.0 }, 
}, {
  timestamps: true 
});

module.exports = mongoose.model('Lending', lendingSchema);