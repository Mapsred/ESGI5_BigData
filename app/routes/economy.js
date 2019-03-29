const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const tagChartManager = require("../libs/tagChartManager");

router.get('/economy', (req, res) => {

    const query = {
        "query": {
            "multi_match": {
                "query": "transmog gold vendor",
                "fuzziness": "AUTO",
                "fields": ["text", "text.stemmed"]
            }
        }
    };

    search(query).then(function(result){
        const hits = result.hits.hits;
        let content = tagChartManager(hits);
        content.section = 'Economy';

        res.render('layout', content);
    });
});

module.exports = router;