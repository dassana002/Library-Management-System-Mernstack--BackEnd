const express = require("express")
const router = express.Router()
const bookUrl = "/books"
const bookService = require('../services/BookService'); 

router.get(bookUrl, async (req, res) => {
    try {
        const allBooks = await bookService.getAllBooks();
        res.json(allBooks) // return kranwa books json objects widiyata
    } catch (er) {
        console.error(er)
    }
});

router.post(bookUrl, async (req, res) => {
    try {
        // request eke body eeke data gannwa
        console.log("Incoming Book Data...", req.body)
        await bookService.addBook(req.body);
        res.status(201).send("Saved Successfully")
    } catch (er) {
        console.error(er)
    }
});

router.patch(bookUrl, async (req, res) => {
    try {
        await BookService.updateBook(req.params,req.body);
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