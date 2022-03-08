const router = require('express').Router();
const db = require('../config/connection.js');
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
// require('../passport-config')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
    

// Homepage
router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

// Authentication

const users = []

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/my_library',
  failureRedirect: '/login',
  failureFlash: true
}))

router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const sql = 'INSERT INTO users (username, email, password) VALUES (?)'
    const values = [ req.body.name, req.body.email, hashedPassword ]
    db.query(sql, [values], (err, data) => {
      if (err) throw (err);
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})


// My Library
router.get('/my_library', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('my_library');
});

// Added Books
router.get('/AddedBook', async (req, res) => {
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM AddedBook`

  db.query(sqlString, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', {books:data}); // render page
  });
});

// Already Read Books
router.get('/AlreadyRead', async (req, res) => {
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM AlreadyRead`

  db.query(sqlString, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', {books:data}); // render page
  });
});

// Currently Reading Books
router.get('/CurrentlyReading', async (req, res) => {
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM CurrentlyReading`

  db.query(sqlString, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', {books:data}); // render page
  });
});

// Want to Read Books
router.get('/WantToRead', async (req, res) => {
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM WantToRead`

  db.query(sqlString, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', { books: data }); // render page
  });
});

// Drag to Already Read
router.post('/AlreadyReadDragged', async (req, res) => {
  const coverURL = req.body.coverURL;
  const title = req.body.title;
  const author = req.body.author;
  const numPages = req.body.numPages;
  const origin = req.body.origin;
  const destination = req.body.destination;

  const sqlString1 = `
    DELETE FROM ${origin}
    WHERE (coverURL = "${coverURL}" AND ID <> 0);
    INSERT INTO ${destination} (coverURL, title, author, numPages)
    VALUES ("${coverURL}", "${title}", "${author}", "${numPages}");`

  const sqlString2 = `
    SELECT coverURL, title, author, numPages
    FROM ${origin};`
console.log(sqlString1)
console.log(sqlString2)
  db.query(sqlString1, (err, data) => {
    if (err) throw err; // error handling

  });

  db.query(sqlString2, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', { books: data }); // refresh page
  });
});

module.exports = router;