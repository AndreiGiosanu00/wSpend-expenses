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
                res.json({success: false, msg: 'Failed to add expense!' + err});
            } else {
                res.json({success: true, msg: 'Expense successfully added!'});
            }
        });
    });
});

// Get all expenses
router.get('/:username', (req, res, next) => {
    User.getUserByUsername(req.params.username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found!'});
        }
        Expense.getExpenses({}, (err, result) => {
            if (err) {
                res.json({success: false, msg: 'Failed to get data!'});
            } else {
                let resultReturned = [];
                result.forEach((expense) => {
                    if (expense.userId == user._id) {
                        resultReturned.push(expense);
                    }
                });
                res.json({success: false, expenses: resultReturned});
            }
        });
    });
});

// Get expenses by month
router.get('/expenses_month', passport.authenticate('jwt', {session: false}), (req, res, next) => {
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
router.get('/expenses_year',passport.authenticate('jwt', {session: false}), (req, res, next) => {
    let date = new Date();
    Expense.getExpensesByYear(date.getFullYear(), (err, result) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get data!'});
        } else {
            res.json({success: true, expenses: result});
        }
    });
});

// Update an expense
router.put('/update_expense/:id', (req, res, next) => {
    Expense.findOneAndUpdate({_id: req.params.id}, {name: req.body.name, price: req.body.price, category: req.body.category, date: req.body.date}).then((result) => {
        if (result) {
            res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been updated.'});
        } else {
            res.json({success: false, msg: 'Error when trying to update entry!'})
        }
    });
});

// Delete an expense
router.delete('/delete_expense/:id', (req, res, next) => {
   Expense.findByIdAndDelete(req.params.id).then((result) => {
       if (result) {
           res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been deleted.'});
       } else {
           res.json({success: false, msg: 'Error when trying to delete entry!'})
       }
   });
});

module.exports = router;
