const express = require('express');
const router = express.Router();
const lendingUrl = '/lendings';
const lendingService = require('../services/LendingService');

// Add a new lending
router.post(lendingUrl, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'Request body is empty' });
    }
    const lending = await lendingService.createLending(req.body);
    return res.status(201).json(lending);
  } catch (error) {
    if (error.message.includes('Book not found') || error.message.includes('Member not found')) {
      return res.status(400).json({ message: error.message });
    }
    if (error.message.includes('Not enough books')) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error: ' + error.message });
  }
});

// Hand over (return) a lending
router.put(`${lendingUrl}/:lendingId`, async (req, res) => {
  try {
    if (!req.params.lendingId) {
      return res.status(400).json({ message: 'Lending ID is required' });
    }
    const lending = await lendingService.handOverLending(req.params.lendingId);
    return res.status(200).json(lending); // Changed to 200 OK to match update operation
  } catch (error) {
    if (error.message.includes('Lending record not found') || error.message.includes('already returned')) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error: ' + error.message });
  }
});

// Delete a lending
router.delete(`${lendingUrl}/:lendingId`, async (req, res) => {
  try {
    if (!req.params.lendingId) {
      return res.status(400).json({ message: 'Lending ID is required' });
    }
    const result = await lendingService.deleteLending(req.params.lendingId);
    return res.status(204).json(result); // 204 No Content
  } catch (error) {
    if (error.message.includes('Lending record not found')) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error: ' + error.message });
  }
});

// Get all lendings
router.get(`${lendingUrl}/getAll`, async (req, res) => {
  try {
    const lendings = await lendingService.getAllLendings();
    return res.status(200).json(lendings);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error: ' + error.message });
  }
});

module.exports = router;