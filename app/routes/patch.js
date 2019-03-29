const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const tagChartManager = require("../libs/tagChartManager");

router.get('/patch', (req, res) => {

    const query = {
        "query": {
            "multi_match": {
                "query": "8.2 changes coming",
                "fuzziness": "AUTO",
                "fields": ["text", "text.stemmed"]
            }
        }
    };

    search(query).then(function(result){
        const hits = result.hits.hits;
        let content = tagChartManager(hits);
        content.section = 'Patch';
        content.optionTitle = 'Patch Repartition';

        res.render('layout', content);
    });
});

module.exports = router;