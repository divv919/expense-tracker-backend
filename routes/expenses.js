const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Create a new expense
router.post('/', expenseController.createExpense);

// Get all expenses
router.get('/user/:userId', expenseController.getExpensesByUserId);

// Get an expense by ID
router.get('/:id', expenseController.getExpenseById);

// Update an expense
router.put('/:id', expenseController.updateExpense);

// Delete an expense
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
