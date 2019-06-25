const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const express = require('express');
const router = express.Router();


const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "2552624b4c7d96",
        pass: "ba9a49df2153f7"
    }
});

const mailOptions = {
    from: 'support@wspend.com',
    to: 'admin@wspend.com',
    subject: 'Nodemailer test',
    text: 'Something went wrong'
};

router.post('/problem', (req, res, next) => {
    mailOptions.text = req.body.content;
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.json({success: false, msg: error});
        } else {
            res.json({success: true, msg: info.response});
        }
    });
});

module.exports = router;




