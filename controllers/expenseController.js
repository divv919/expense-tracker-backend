// controllers/expenseController.js
const Expense = require('../models/Expense');

// Create a new expense
exports.createExpense = async (req, res) => {
    try {
        const { userId, description, amount, category, date } = req.body;

        // Check if category is valid
        const validCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category!' });
        }

        const newExpense = new Expense({ userId, description, amount, category, date });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(400).json({ message: 'Error creating expense', error });
    }
};

// Get expenses by userId
exports.getExpensesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const expenses = await Expense.find({ userId }).populate('userId', 'name email');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching expenses', error });
    }
};

// Get an expense by Expense ID
exports.getExpenseById = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id).populate('userId', 'name email');
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching expense', error });
    }
};

// Update an expense
exports.updateExpense = async (req, res) => {
    try {
        const { userId, description, amount, category , date} = req.body;

        // Check if category is valid
        const validCategories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];
        if (category && !validCategories.includes(category)) {
            return res.status(400).json({ message: 'Invalid category' });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { userId, description, amount, category, date },
            { new: true, runValidators: true }
        ).populate('userId', 'username email');

        if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: 'Error updating expense', error });
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
        if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting expense', error });
    }
};
