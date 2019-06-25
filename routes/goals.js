const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Goal = require('../models/goal');
const Expense = require('../models/expense');
const User = require('../models/user');

// Add a goal
router.post('/add_goal', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    User.getUserByUsername(req.body.username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found!'});
        }

        let newGoal = new Goal({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            expiresAt: req.body.expiresAt,
            userId: user._id
        });

        Goal.addGoal(newGoal, (err, msg) => {
            if (err) {
                res.json({success: false, msg: 'Failed to add goal!'});
            } else {
                res.json({success: true, msg: 'Goal successfully added!'});
            }
        });
    });
});

// Get all goals for wishlist
router.get('/:username', (req, res, next) => {
    User.getUserByUsername(req.params.username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found!'});
        }
        Goal.getGoals({}, (err, result) => {
            if (err) {
                res.json({success: false, msg: 'Failed to get data!'});
            } else {
                let resultReturned = [];
                result.forEach((goal) => {
                    if (goal.userId == user._id) {
                        resultReturned.push(goal);
                    }
                });
                res.json({success: false, goals: resultReturned});
            }
        });
    });
});

// Update a goal
router.put('/update_goal/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Goal.findOneAndUpdate(req.params.id, {name: req.body.name, price: req.body.price, category: req.body.category, expiresAt: req.body.expiresAt}).then((result) => {
        if (result) {
            res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been updated.'});
        } else {
            res.json({success: false, msg: 'Error when trying to update entry!'})
        }
    });
});

// Delete a goal from wishlist
router.delete('/delete_goal/:id', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Goal.findByIdAndDelete(req.params.id).then((result) => {
        if (result) {
            res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been deleted.'});
        } else {
            res.json({success: false, msg: 'Error when trying to delete entry!'})
        }
    });
});

module.exports = router;
