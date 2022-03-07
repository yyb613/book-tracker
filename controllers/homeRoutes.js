const router = require('express').Router();
const db = require('../config/connection.js');

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/my_library', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('my_library');
});

router.get('/getBooks', async (req, res) => {
  // Display added books
  const sqlString = `
    SELECT coverURL, title, author, numPages
    FROM AddedBook`

  db.query(sqlString, (err, data) => {
    if (err) throw err; // error handling
    res.render('my_library', {books:data});
    console.log(data);
  });
});

module.exports = router;
