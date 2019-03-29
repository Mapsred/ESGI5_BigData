const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const dynamicColors = require("../libs/colorLib");
const truncate = require("../libs/truncate");

router.get('/pve', (req, res) => {

    const query = {
        "query": {
            "multi_match": {
                "query": "content raid raiding dungeon mythic",
                "fuzziness": "AUTO",
                "fields": ["text", "text.stemmed"]
            }
        }
    };

    search(query).then(function (result) {
        const hits = result.hits.hits;
        const hit = hits[0];
        let topTweet = {};
        if (typeof hit !== 'undefined') {
            topTweet.user = hit['_source']['user']['name'];
            topTweet.text = hit['_source']['text'];
            topTweet.link = "https://twitter.com/i/web/status/" + hit['_id'];
        }

        let area = {
            areas: [],
            repartitions: [],
            backgroundColors: []
        };

        for (let i in hits) {
            if (hits.hasOwnProperty(i)) {
                let hit = hits[i];
                area.areas.push(truncate(hit['_source']['text'], 50));
                area.repartitions.push(hit['_score']);
                area.backgroundColors.push(dynamicColors());

            }
        }

        res.render('layout', {
            section: 'PvE',
            topTweet: topTweet,
            areas: JSON.stringify(area.areas),
            repartitions: JSON.stringify(area.repartitions),
            backgroundColors: JSON.stringify(area.backgroundColors),
        });
    });
});

module.exports = router;