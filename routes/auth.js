var express = require('express');

var router = express.Router();

router.get('/', (request, response) => {
    response.end('inside auth');
})

router.post('/signup', (request, response) => {
    console.log(request);
})

module.exports = router;