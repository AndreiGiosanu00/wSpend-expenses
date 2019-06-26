const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connection to database
mongoose.connect(config.database, { useNewUrlParser: true });


// Connection has been done
mongoose.connection.on('connected', () => {
    console.log('Connected to wSpend database ' + config.database);
});

// Connection error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});


const app = express();

const users = require('./routes/users');
const expenses = require('./routes/expenses');
const goals = require('./routes/goals');
const report = require('./routes/report-by-email');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder

app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/expenses', expenses);
app.use('/goals', goals);
app.use('/report', report);

// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('wSpend - Server started on port ' + port);
});
