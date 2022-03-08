const express = require('express');
const session = require('express-session');
const exphbs =  require('express-handlebars');
const routes = require('./controllers');
// const authRouter = require('./controllers/auth');
const dotenv = require('dotenv')
const flash = require('connect-flash')
const passport = require('passport')
// const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

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
