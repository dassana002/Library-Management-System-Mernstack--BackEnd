const LendingModel = require('../models/LendingModel');
const BookModel = require('../models/BookModel');
const MemberModel = require('../models/MemberModel');

// Per day fine amount (configurable via environment variable or hardcoded)
const PER_DAY_FINE = process.env.PER_DAY_FINE || 5.00;

// Add a new lending
const createLending = async (lendingData) => {
    try {
        // Validate book
        const book = await BookModel.findById(lendingData.book);
        if (!book) {
            throw new Error('Book not found');
        }

        // Validate member
        const member = await MemberModel.findById(lendingData.member);
        if (!member) {
            throw new Error('Member not found');
        }

        // Check book availability
        if (book.availableQty <= 0) {
            throw new Error('Not enough books to proceed');
        }

        // Set default values
        lendingData.lendingDate = new Date();
        lendingData.returnDate = new Date(new Date().setDate(new Date().getDate() + 14)); // 14 days from now
        lendingData.isActive = true;
        lendingData.overDue = 0;
        lendingData.fineAmount = 0.0;

        // Create lending record
        const newLending = await LendingModel.create(lendingData);

        // Deduct book quantity
        book.availableQty -= 1;
        await book.save();

        return newLending;
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Lending with this lendingId already exists');
        }
        throw new Error('Error creating lending: ' + error.message);
    }
};

// Hand over a lending (return book)
const handOverLending = async (lendingId) => {
    try {
        // Find lending record
        const lending = await LendingModel.findById(lendingId);
        if (!lending) {
            throw new Error('Lending record not found');
        }

        // Check if lending is already returned
        if (!lending.isActive) {
            throw new Error('This book is already returned!');
        }

        // Calculate overdue days and fine
        const overdue = calcOverdue(lending.returnDate);
        const fineAmount = calcFineAmount(overdue);

        // Update lending record
        lending.isActive = false;
        lending.overDue = overdue;
        lending.fineAmount = fineAmount;
        await lending.save();

        // Increment book quantity
        const book = await BookModel.findById(lending.book);
        if (book) {
            book.availableQty += 1;
            await book.save();
        }

        return lending;
    } catch (error) {
        throw new Error('Error handing over lending: ' + error.message);
    }
};

// Delete a lending
const deleteLending = async (lendingId) => {
    try {
        const lending = await LendingModel.findById(lendingId);
        if (!lending) {
            throw new Error('Lending record not found');
        }
        await LendingModel.deleteOne({ _id: lendingId });
        return { message: 'Lending deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting lending: ' + error.message);
    }
};

// Get all lendings
const getAllLendings = async () => {
    try {
        const lendings = await LendingModel.find()
            .populate('book')
            .populate('member');
        return lendings;
    } catch (error) {
        throw new Error('Error fetching lendings: ' + error.message);
    }
};

// Calculate overdue days
const calcOverdue = (returnDate) => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    if (today > returnDateObj) {
        const overdueDays = Math.floor((today - returnDateObj) / (1000 * 60 * 60 * 24));
        return overdueDays;
    }
    return 0;
};

// Calculate fine amount
const calcFineAmount = (overdue) => {
    return overdue * PER_DAY_FINE;
};

module.exports = {createLending, handOverLending, deleteLending ,getAllLendings};