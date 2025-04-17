const express = require("express")
const router = express.Router()
const bookUrl = "/books"
const BookService = require("../services/BookService")

router.get(bookUrl, async (req, res) => {
    try{
        await BookService.getAllBooks();
        res.status(200).send("Get Books!!")
    }catch(er){
        console.error(er)
    }
});

router.post(bookUrl, async (req, res) => {
    try{
        await BookService.addBook();
        res.status(201).send("Add Book!!")
    }catch(er){
        console.error(er)
    }
});

router.patch(bookUrl, async (req, res) => {
    try{
        await BookService.updateBook();
        res.status(204).send("Update Book!!")
    }catch(er){
        console.error(er)
    }
});

router.delete(bookUrl, async (req, res) => {
    try{
        await BookService.deleteBook();
        res.status(204).send("Delete Book!!")
    }catch(er){
        console.error(er)
    }
});

module.exports = router;