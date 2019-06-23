const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Expense = require('../models/expense');
const User = require('../models/user');

// Add an expense
router.post('/add_expense', (req, res, next) => {

    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found!'});
        }

        let newExpense = new Expense({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            date: req.body.date,
            userId: user._id

        });

        Expense.addExpense(newExpense, (err, expense) => {
            if (err) {
                res.json({success: false, msg: 'Failed to add expense!'});
            } else {
                res.json({success: true, msg: 'Expense successfully added!'});
            }
        });
    });
});

// Get all expenses
router.get('/', (req, res, next) => {
    Expense.getExpenses({}, (err, result) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get data!'});
        } else {
            res.json({success: true, expenses: result});
        }
    });
});

// Get expenses by month
router.get('/expenses_month', (req, res, next) => {
    let date = new Date();
    Expense.getExpensesByMonth(date.getMonth() + 1, (err, result) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get data!'});
        } else {
            res.json({success: true, expenses: result});
        }
    });
});

// Get expenses by year
router.get('/expenses_year', (req, res, next) => {
    let date = new Date();
    Expense.getExpensesByYear(date.getFullYear(), (err, result) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get data!'});
        } else {
            res.json({success: true, expenses: result});
        }
    });
});


module.exports = router;
