const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const tagChartManager = require("../libs/tagChartManager");

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
        let content = tagChartManager(hits);
        content.section = 'PvE';

        res.render('layout', content);
    });
});

module.exports = router;