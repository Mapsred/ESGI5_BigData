const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const dynamicColors = require("../libs/colorLib");

router.get('/words', (req, res) => {
    let topWordQuery = {
        "size": 0,
        "aggregations": {
            "my_agg": {
                "terms": {
                    "field": "text",
                    "size": 50,
                    "exclude": ["the", "to", "a", "and", "for", "you", "in", "of", "is", "be", "are", "we", "any", "it", "will", "with", "on", "have", "there", "can", "that", "or", "more", "like", "when", "get", "plans", "this", "what", "i", "as", "some", "so", "not", "do", "why", "from", "https", "t.co", "would", "at", "game", "new", "but", "make", "was", "an", "they", "see", "back", "if", "them", "about", "all", "going", "how", "just", "could", "been", "other", "has", "one", "no", "also", "ever", "my", "please", "their", "us", "up", "feel", "now", "add", "than", "being", "many", "watcherdev", "every", "amp", "it's", "use", "after", "again", "current", "having", "want", "give", "much", "even", "people"]
                }
            }
        }
    };

    search(topWordQuery).then(function (wordResult) {
        const wordsRepartition = wordResult['aggregations']['my_agg']['buckets'];

        let datasets = [];
        for (let i in wordsRepartition) {
            datasets.push({
                label: wordsRepartition[i]['key'],
                backgroundColor: dynamicColors(),
                data: [
                    wordsRepartition[i]['doc_count']
                ]
            });
        }
        let wordsRepartitionChart = {};
        wordsRepartitionChart.datasets = JSON.stringify(datasets);

        res.render('words', {
            'charts': [wordsRepartitionChart]
        });
    });
});

module.exports = router;