const  mongoose = require('mongoose');
//Set up default mongoose connection

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');
 //Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


db.once('open',function(){
    console.log('Sucessfully conected to database');
});

module.exports=db;