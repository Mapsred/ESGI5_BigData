const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");

router.get('/patch', (req, res) => {

    const query = {
        "query": {
            "match": {
                "text": "economy"
            }
        }
    };
    search(query).then(function(result){


    });
    res.render('layout', { section: 'Patch'});
});

module.exports = router;