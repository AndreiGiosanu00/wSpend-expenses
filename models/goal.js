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
    },
    status: {
        type: String,
        default: 'Inactive'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    expiresAt: {
        type: String,
    },
    userId : {
        type: String,
    },
    moneyInvested: {
        type: Number,
        default: 0
    }
});
const Goal = module.exports = mongoose.model('Goal', GoalSchema);

module.exports.getGoals = function({}, callback) {
    Goal.find({}, callback);
};

module.exports.getGoadById = function(id, callback) {
    Goal.findOne({'_id': id}, callback);
};

module.exports.addGoal = function (newGoal, callback) {
    newGoal.save(callback);
};
