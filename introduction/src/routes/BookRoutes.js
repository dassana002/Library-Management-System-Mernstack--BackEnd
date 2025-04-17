const express = require("express")
const router = express.Router()
const bookUrl = "/books"
const BookService = require("../services/BookService")


router.get(bookUrl, async (req, res) => {
    // controll a get request
    await BookService.getAllBooks();
});

router.post(bookUrl, async (req, res) => {
    await BookService.addBook();
});

router.patch(bookUrl, async (req, res) => {
    await BookService.updateBook();
});

router.delete(bookUrl, async (req, res) => {
    await BookService.deleteBook();
});

module.exports = router;