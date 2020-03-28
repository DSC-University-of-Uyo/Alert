var mongoose = require('mongoose');

// We need to define the URL
var URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/uberForX';

mongoose.set('useCreateIndex', true);

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

//Connection establishment
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});
//Models
// require('../model/user');
var db = mongoose.connection;

//We enabled the Listener
db.on('error', () => {
    console.error('Error occurred in db connection');
});

db.on('open', () => {
    console.log('DB Connection established successfully');
});
