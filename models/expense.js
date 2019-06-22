const mongoose = require('mongoose');
const config = require('../config/database');

// Expense Schema
const ExpenseSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
});
const Expense = module.exports = mongoose.model('Expense', ExpenseSchema);

module.exports.getExpeneseByName = function(expense, callback) {
    Expense.find({'name': expense.name, 'category': expense.category}, callback);
};

module.exports.addExpense = function (newExpense, callback) {
    newExpense.save(callback);
};
