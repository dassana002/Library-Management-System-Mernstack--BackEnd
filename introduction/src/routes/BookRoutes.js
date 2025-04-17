const express = require("express");
const router = express.Router();
const bookUrl = "/books";
const bookService = require("../services/BookService");

router.get(bookUrl, async (req, res) => {
  try {
    const allBooks = await bookService.getAllBooks(); // Fetch books from service
    const filteredBooks = allBooks.map((book) => ({
      bookId: book.bookId,
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      edition: book.edition,
      price: book.price,
      totalQty: book.totalQty,
      availableQty: book.availableQty,
      lastUpdatedDate: book.lastUpdatedDate,
      lastUpdatedTime: book.lastUpdatedTime,
    }));
    console.log("Filtered books:", filteredBooks);
    res.json(filteredBooks);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

router.post(bookUrl, async (req, res) => {
  try {
    console.log("Incoming Book Data:", req.body);
    await bookService.addBook(req.body);
    res.status(201).send("Saved Successfully");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Failed to add book" });
  }
});

router.patch(`${bookUrl}/:bookId`, async (req, res) => {
  try {
    await bookService.updateBook(req.params.bookId, req.body);
    res.status(200).send("Book Updated Successfully");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book" });
  }
});

router.delete(`${bookUrl}/:bookId`, async (req, res) => {
  try {
    await bookService.deleteBook(req.params.bookId);
    res.status(200).send("Book Deleted Successfully");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Failed to delete book" });
  }
});

module.exports = router;

// const express = require("express")
// const router = express.Router()
// const bookUrl = "/books"
// const bookService = require('../services/BookService');

// router.get(bookUrl, async (req, res) => {
//     try {
//         const filteredBooks = allBooks.map(book => ({
//             bookId: book.bookId,
//             title: book.title,
//             isbn: book.title,
//             author: book.author,
//             edition: book.edition,
//             price: book.price,
//             totalQty: book.totalQty,
//             avilableQty: book.avilableQty,
//             lastUpdatedDate: book.lastUpdatedDate,
//             lastUpdatedTime: book.lastUpdatedTime
//         }));
//         console.log("Filterd book", filteredBooks)
//         res.json(filteredBooks) // return kranwa books json objects widiyata
//     } catch (er) {
//         console.error(er)
//     }
// });

// router.post(bookUrl, async (req, res) => {
//     try {
//         // request eke body eeke data gannwa
//         console.log("Incoming Book Data...", req.body)
//         await bookService.addBook(req.body);
//         res.status(201).send("Saved Successfully")
//     } catch (er) {
//         console.error(er)
//     }
// });

// router.patch(bookUrl, async (req, res) => {
//     try {
//         await BookService.updateBook(req.params, req.body);
//         res.status(204).send("Update Book!!")
//     } catch (er) {
//         console.error(er)
//     }
// });

// router.delete(bookUrl, async (req, res) => {
//     try {
//         await BookService.deleteBook();
//         res.status(204).send("Delete Book!!")
//     } catch (er) {
//         console.error(er)
//     }
// });

// module.exports = router;