var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res) => {
  console.log('req.body', req.body);
  // res.render('POST request to homepage');'
  res.send('post')
})

module.exports = router;
