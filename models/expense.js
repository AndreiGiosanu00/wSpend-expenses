const mongoose = require('mongoose');
const config = require('../config/database');

// Expense Schema
const ExpenseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: String,
    }
});

const Expense = module.exports = mongoose.model('Expense', ExpenseSchema);

module.exports.getExpenses = function({}, callback) {
    Expense.find({}, callback);
};

module.exports.getExpenseById = function(id, callback) {
    Expense.findOne({'_id': id}, callback);
};

module.exports.addExpense = function (newExpense, callback) {
    newExpense.save(callback);
};

module.exports.getExpensesByMonth = function(month, callback) {
    Expense.aggregate([
        { $project: { month: {$month: '$date'}, name: '$name', category: '$category', price: '$price'}},
        { $match: { month: month}}
    ], callback);
};

module.exports.getExpensesByYear = function(year, callback) {
    Expense.aggregate([
        { $project: { year: {$year: '$date'}, name: '$name', category: '$category', price: '$price'}},
        { $match: { year: year}}
    ], callback);
};
