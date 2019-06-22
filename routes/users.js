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
                       email: user.email
                   }
               });
           } else {
               return res.json({success: false, msg: 'Wrong password'});
           }
        });
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
