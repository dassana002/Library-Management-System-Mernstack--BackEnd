const Book = require("../Model/BookModel")
const { v4: uuid4 } = require("uuid");

const getAllBooks = async () => {
  try {
    return await Book.find();
  } catch (error) {
    throw new Error(`Failed to fetch books: ${error.message}`);
  }
};

const addBook = async (bookData) => {
  try {
    const newBook = new Book({
      ...bookData,
      bookId: uuid4(),
      availableQty: bookData.availableQty || bookData.totalQty,
    });
    return await newBook.save();
  } catch (error) {
    throw new Error(`Failed to create book: ${error.message}`);
  }
};

const updateBook = async (bookId, bookData) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { bookId },
      { $set: bookData },
      { new: true }
    );
    if (!updatedBook) throw new Error("Book not found");
    return updatedBook;
  } catch (error) {
    throw new Error(`Failed to update book: ${error.message}`);
  }
};

const deleteBook = async (bookId) => {
  try {
    const deletedBook = await Book.findOneAndDelete({ bookId });
    if (!deletedBook) throw new Error("Book not found");
    return deletedBook;
  } catch (error) {
    throw new Error(`Failed to delete book: ${error.message}`);
  }
};

module.exports = { getAllBooks, addBook, updateBook, deleteBook };


// const Book = require("../Model/BookModel")

// async function getAllBooks() {
//     return Book.find()
// }

// async function addBook(book) {
//     const saveBook = new Book(book)
//     return saveBook.save()
// }

// async function updateBook(bookId, book) {
//     return Book.findOneAndUpdate({ bookId: bookId }, book, { new: true })
// }

// async function deleteBook(bookId) {
//     return Book.findOneAndDelete(bookId)
// }

// module.exports = { getAllBooks, addBook, updateBook, deleteBook }