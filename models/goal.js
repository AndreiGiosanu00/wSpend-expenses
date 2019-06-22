const mongoose = require('mongoose');
const config = require('../config/database');

// Goal Schema
const GoalSchema = mongoose.Schema({
    name: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const Goal = module.exports = mongoose.model('Goal', GoalSchema);

/*module.exports.getExpeneseByName = function(expense, callback) {
    Expense.find({'name': expense.name, 'category': expense.category}, callback);
};

module.exports.addExpense = function (newExpense, callback) {
    newExpense.save(callback);
};*/
