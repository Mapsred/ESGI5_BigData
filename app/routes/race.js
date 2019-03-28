const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");

router.get('/race', (req, res) => {

    const query = {
        "query": {
            "multi_match": {
                "query": "time allied level up",
                "fuzziness": "AUTO",
                "fields": ["text", "text.stemmed"]
            }
        }
    };

    search(query).then(function(result){
        const hit = result.hits.hits[0];
        let topTweet = {};
        if(typeof hit !== 'undefined') {
            topTweet.user = hit['_source']['user']['name'];
            topTweet.text = hit['_source']['text'];
        }

        res.render('layout', { section: 'PvP', topTweet: topTweet });
    });
});

module.exports = router;