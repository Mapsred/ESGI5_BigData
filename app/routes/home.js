const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('layout', { section: 'Home'});
});

module.exports = router;