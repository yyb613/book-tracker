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
  failureRedirect: '/loginn',
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


// Add a Book
router.post('/addbook', async (req, res) => {
  console.log(req.body)
  const sqlString = `
  INSERT INTO addedbook (coverURL, title, author, numPages)
  VALUES(?, ?, ?, ?);`

  db.query(sqlString, [req.body.coverURL, req.body.title, req.body.author, req.body.numPages],(err, data) => {
    if (err) throw err; // error handling

    const sqlStringTwo = `
    SELECT coverURL, title, author, numPages
    FROM addedbook`

    db.query(sqlStringTwo, (err, data) => {
      if (err) throw err; // error handling
      res.render('my_library', { books: data }); // render page
    })
  });
});

// Added Books
router.get('/addedbook', async (req, res) => {
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM AddedBook`

    db.query(sqlString, (err, data) => {
      if (err) throw err; // error handling
      res.render('my_library', { books: data }); // render page
    })
  });

// Already Read Books
router.get('/alreadyread', async (req, res) => {
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM AlreadyRead`

  db.query(sqlString, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', { books:data }); // render page
  });
});

// Currently Reading Books
router.get('/currentlyreading', async (req, res) => {
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM CurrentlyReading`

  db.query(sqlString, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', { books:data }); // render page
  });
});

// Want to Read Books
router.get('/wanttoread', async (req, res) => {
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM WantToRead`

  db.query(sqlString, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', { books: data }); // render page
  });
});

// Drag to Already Read
router.post('/alreadyreadDragged', async (req, res) => {
  const coverURL = req.body.coverURL;
  const title = req.body.title;
  const author = req.body.author;
  const numPages = req.body.numPages;
  const origin = req.body.origin;
  const destination = req.body.destination;

  const sqlString1 = `
    DELETE FROM ${origin}
    WHERE (title = "${title}");`

  const sqlString2 = `
    INSERT INTO ${destination} (coverURL, title, author, numPages)
    VALUES ("${coverURL}", "${title}", "${author}", "${numPages}");`

  const sqlString3 = `
    SELECT coverURL, title, author, numPages
    FROM ${origin};`

  db.query(sqlString1, (err, data) => { // delete from category
    if (err) throw err; // error handling
  });

  db.query(sqlString2, (err, data) => { // add to category
    if (err) throw err; // error handling
  });

  db.query(sqlString3, (err, data) => { // refresh page
    if (err) throw err; // error handling
    res.render('my_library', { books: data });
  });
});

// Drag to Currently Reading
router.post('/currentlyDragged', async (req, res) => {
  const coverURL = req.body.coverURL;
  const title = req.body.title;
  const author = req.body.author;
  const numPages = req.body.numPages;
  const origin = req.body.origin;
  const destination = req.body.destination;

  const sqlString1 = `
    DELETE FROM ${origin}
    WHERE (title = "${title}");`

  const sqlString2 = `
    INSERT INTO ${destination} (coverURL, title, author, numPages)
    VALUES ("${coverURL}", "${title}", "${author}", "${numPages}");`

  const sqlString3 = `
    SELECT coverURL, title, author, numPages
    FROM ${origin};`

  db.query(sqlString1, (err, data) => { // delete from category
    if (err) throw err; // error handling
  });

  db.query(sqlString2, (err, data) => { // add to category
    if (err) throw err; // error handling
  });

  db.query(sqlString3, (err, data) => { // refresh page
    if (err) throw err; // error handling
    res.render('my_library', { books: data });
  });
});

// Drag to Want to Read
router.post('/wantDragged', async (req, res) => {
  const coverURL = req.body.coverURL;
  const title = req.body.title;
  const author = req.body.author;
  const numPages = req.body.numPages;
  const origin = req.body.origin;
  const destination = req.body.destination;

  const sqlString1 = `
    DELETE FROM ${origin}
    WHERE (title = "${title}");`

  const sqlString2 = `
    INSERT INTO ${destination} (coverURL, title, author, numPages)
    VALUES ("${coverURL}", "${title}", "${author}", "${numPages}");`

  const sqlString3 = `
    SELECT coverURL, title, author, numPages
    FROM ${origin};`

  db.query(sqlString1, (err, data) => { // delete from category
    if (err) throw err; // error handling
  });

  db.query(sqlString2, (err, data) => { // add to category
    if (err) throw err; // error handling
  });

  db.query(sqlString3, (err, data) => { // refresh page
    if (err) throw err; // error handling
    res.render('my_library', { books: data });
  });
});

module.exports = router;