const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const systeminformation = require('systeminformation');

const User = require('../models/user');
const sms = require('../models/send-sms');

let smsCode;

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone
    });

    if (smsCode + '' === req.body.code + '') {
        User.addUser(newUser, (err, user) => {
            if (err) {
                res.json({success: false, msg: 'Failed to register user!'});
            } else {
                res.json({success: true, msg: 'User registered!'});
            }
        });
    } else {
        res.json({success: false, msg: 'Invalid code!'});
    }

});

router.post('/sms', (req, res, next) => {
    smsCode  = sms.sendSms(req.body.phone);
    res.json({success: true, msg: 'Code successfully sent'});
});

// Autentificarea
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found!'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
           if (err) throw  err;
           if (isMatch) {
               if (user.status == 'Active') {
                   const token = jwt.sign(user.toJSON(), config.secret, {
                       expiresIn: 604800 // 1 week
                   });

                   res.json({
                       success: true,
                       token: 'Bearer ' + token,
                       user: {
                           id: user._id,
                           name: user.name,
                           username: user.username,
                           email: user.email,
                           phone: user.phone,
                           role: user.role,
                           firstLogin: user.firstLogin,
                           foodTarget: user.foodTarget,
                           utilitiesTarget: user.utilitiesTarget,
                           shoppingTarget: user.shoppingTarget,
                           entertainmentTarget: user.entertainmentTarget
                       }
                   });
               } else {
                   return res.json({success: false, msg: 'Cannot authenticate. User is suspended.'});
               }
           } else {
               return res.json({success: false, msg: 'Wrong password'});
           }
        });
    });
});

router.put('/update_user/:id', (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.id}, {name: req.body.name, username: req.body.username, email: req.body.email, phone: req.body.phone}).then((result) => {
        if (result) {
            res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been updated.'});
        } else {
            res.json({success: false, msg: 'Error when trying to update entry!'})
        }
    });
});

router.delete('/delete_user/:id', (req, res, next) => {
    User.findByIdAndDelete(req.params.id).then((result) => {
        if (result) {
            res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been deleted.'});
        } else {
            res.json({success: false, msg: 'Error when trying to delete entry!'})
        }
    });
});

router.put('/change_role/:id', (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.id}, {role: req.body.role}).then((result) => {
        if (result) {
            res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been updated.'});
        } else {
            res.json({success: false, msg: 'Error when trying to update entry!'})
        }
    });
});

router.put('/change_status/:id', (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.id}, {status: req.body.status}).then((result) => {
        if (result) {
            res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been updated.'});
        } else {
            res.json({success: false, msg: 'Error when trying to update entry!'})
        }
    });
});

router.put('/change_targets/:id', (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.id}, {foodTarget: req.body.foodTarget, utilitesTarget: req.body.utilitiesTarget, shoppingTarget: req.body.shoppingTarget, entertainmentTarget: req.body.entertainmentTarget}).then((result) => {
        if (result) {
            res.json({success: true, msg: 'Entry with id: ' + result._id + ' has been updated.'});
        } else {
            res.json({success: false, msg: 'Error when trying to update entry!'})
        }
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});


// System info
router.get('/system_info', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    let cpuTemperatureMain, cpuUsageMain, ramUsageMain, ramUsageMax;

    async function getData() {
        await systeminformation.cpuTemperature()
            .then((data) => {
                cpuTemperatureMain = data.main;
            })
            .catch(error => console.error(error));

        await systeminformation.currentLoad()
            .then((data) => {
                cpuUsageMain = data.currentload;
            })
            .catch(error => console.error(error));

        await systeminformation.mem()
            .then((data) => {
                ramUsageMain = data.used;
                ramUsageMax = data.total;
            })
            .catch(error => console.error(error));

        res.json({cpu_temperature: cpuTemperatureMain, cpu_usage: cpuUsageMain, ram_usage: ramUsageMain, ram_max: ramUsageMax});
    }

    getData();

});

module.exports = router;
