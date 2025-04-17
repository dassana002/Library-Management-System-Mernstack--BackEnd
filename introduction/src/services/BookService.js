const Book = require("../Model/BookModel")

async function getAllBooks() {
    return Book.find()
}

async function addBook(book) {
    const saveBook = new Book(book)
    return saveBook.save()
}

async function updateBook(bookId, book) {
    return Book.findOneAndUpdate({ bookId: bookId }, book, { new: true })
}

async function deleteBook(bookId) {
    return Book.findOneAndDelete(bookId)
}

module.exports = { getAllBooks, addBook, updateBook, deleteBook }