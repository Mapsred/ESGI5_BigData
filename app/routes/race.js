const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const tagChartManager = require("../libs/tagChartManager");

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
        const hits = result.hits.hits;
        let content = tagChartManager(hits);
        content.section = 'Race';

        res.render('layout', content);
    });
});

module.exports = router;