const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");

router.get('/pvp', (req, res) => {
    const query = {
        "query": {
            "multi_match": {
                "query": "player arena battleground pvp",
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

const dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
};

module.exports = router;