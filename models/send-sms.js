const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '684c0fbf',
    apiSecret: 'o8CSevHLjtdseE6W'
});

module.exports.sendSms = function (number) {
    const from = 'wSpend';
    const to = '4' + number;
    const code = Math.floor(Math.random()*90000) + 10000;
    const text = 'Your code for login is ' + code;

    nexmo.message.sendSms(from, to, text);

    return code;
};
