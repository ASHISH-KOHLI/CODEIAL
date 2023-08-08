const express = require('express');
const cookieParser =require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const passportJWT= require('./config/passport-jwt-strategy')
const MongoStore = require('connect-mongo')( session);
const flash = require('connect-flash');
const customMware= require('./config/middleware')

app.use(express.urlencoded());

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('./assets'));
// makes the upload path availabe to the browser
app.use('/uploads',express.static(__dirname + '/uploads') );
app.use(expressLayouts);


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// set up view engine
app.set('view engine','ejs')
app.set('views','./views');


// mongo store is used to store the session cookiee  in the Db
app.use(session({
    name:'codeial',
    //Todo change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie : {
        maxAge:(1000 * 60* 100)
    },
store: new MongoStore(
    {
        
        mongooseConnection: db,
        autoRemove:'disabled'
    },
   function(err){
    console.log(err|| 'connect-mmongodb setup')
   }
)
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash)
// user express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
