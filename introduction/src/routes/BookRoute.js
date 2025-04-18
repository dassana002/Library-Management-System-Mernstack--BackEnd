const express = require("express")
const router = express.Router()
const bookUrl = "/books"
const bookService = require("../services/BookService")


router.get(bookUrl, async (req, res) => {
  // controll a get request
  try {
    const allBooks = await bookService.getAllBooks();
    const filteredBooks = allBooks.map(book => ({
      bookId: book.bookId,
      title: book.title,
      isbn: book.title,
      author: book.author,
      edition: book.edition,
      price: book.price,
      totalQty: book.totalQty,
      avilableQty: book.avilableQty,
      lastUpdatedDate: book.lastUpdatedDate,
      lastUpdatedTime: book.lastUpdatedTime
    }));
    console.log("Filterd book", filteredBooks)
    res.json(filteredBooks)
  } catch (er) {
    console.error(er)
  }
});

router.post(bookUrl, async (req, res) => {
  try {
    console.log("Incoming Book Data...", req.body)
    await bookService.addBook(req.body);
    res.status(201).send("Saved Successfully")
  } catch (er) {
    console.error(er)
  }
});

router.patch(bookUrl, async (req, res) => {
  try {
    await BookService.updateBook();
    res.status(204).send("Update Book!!")
  } catch (er) {
    console.error(er)
  }
});

router.delete(bookUrl, async (req, res) => {
  try {
    await BookService.deleteBook();
    res.status(204).send("Delete Book!!")
  } catch (er) {
    console.error(er)
  }
});

module.exports = router;