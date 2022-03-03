const router = require('express').Router();

router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('homepage');
});

router.get('/my_library', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('my_library');
});

module.exports = router;
