const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const tagChartManager = require("../libs/tagChartManager");

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

    search(query).then(function (result) {
        const hits = result.hits.hits;
        let content = tagChartManager(hits);
        content.section = 'PvP';

        res.render('layout', content);
    });

});

module.exports = router;