const express = require("express");
const app = express();
const port = 8000;

// use express router
app.use('/', require('./routes')); 

//set up a view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port, function(err){
     if (err){
        console.log(`Error in running the server: ${err}`);
     }
     console.log(`server in running the port: ${port}`);
});