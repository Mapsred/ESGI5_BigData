const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");

router.get('/pvp', (req, res) => {

    const query = {
        "query": {
            "match": {
                "text": "economy"
            }
        }
    };
    search(query).then(function(result){


    });
    res.render('layout', { section: 'PvP'});
});

module.exports = router;