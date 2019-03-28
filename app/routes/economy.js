const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");

router.get('/economy', (req, res) => {

    const query = {
        "query": {
            "match": {
                "text": "economy"
            }
        }
    };
    search(query).then(function(result){


    });
    res.render('layout', { section: 'Economy'});
});

module.exports = router;