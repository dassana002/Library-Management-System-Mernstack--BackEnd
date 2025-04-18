const mongoose = require("mongoose")
const { v4: uuid4 } = require("uuid")

const bookSchema = new mongoose.Schema({
  bookId: { type: String, required: true, default: uuid4, unique: true },
  title: { type: String, required: true },
  publisher: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  edition: { type: String, required: true },
  price: { type: Number, required: true },
  totalQty: { type: Number, required: true },
  avilableQty: { type: Number, required: true },
  lastUpdatedDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
  lastUpdatedTime: { type: String, default: () => new Date().toTimeString().split(" ")[0] }
});

module.exports = mongoose.model("Book", bookSchema);