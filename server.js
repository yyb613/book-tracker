if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const session = require('express-session');
const exphbs =  require('express-handlebars');
const routes = require('./controllers');
const dotenv = require('dotenv')

const db = require('./config/connection.js');
const flash = require('express-flash')
const passport = require('passport')

const initializePassport = require('./passport-config');
const res = require('express/lib/response');
initializePassport(
    passport,
    // email => users.find(user => user.email === email)
    email => res.body.email,
)

    

// const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(__dirname + '/public'));
// Setup routes to the Server
// Look at /controllers folder
app.use('/', routes);
// app.use('/', authRouter);

// Lets me add images
app.use(express.static('/public/assets')); 

// sequelize.sync({force:true}).then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`)
    });
// });
