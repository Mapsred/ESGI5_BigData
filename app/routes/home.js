const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const dynamicColors = require("../libs/colorLib");

router.get('/', (req, res) => {
    const query = {
        "size": 0,
        "aggregations": {
            "tagcloud": {
                "terms": {
                    "field": "user.location.keyword",
                    "size": 50,
                    "min_doc_count": 5
                }
            }
        }
    };

    search(query).then(function (result) {
        const areaRepartition = result.aggregations.tagcloud.buckets;

        const areas = extractColumn(areaRepartition, 'key'),
            repartitions = extractColumn(areaRepartition, 'doc_count');

        let backgroundColors = [];
        for (let i in areaRepartition) {
            backgroundColors.push(dynamicColors())
        }

        const areaChart = {
            section: 'Home',
            areas: JSON.stringify(areas),
            repartitions: JSON.stringify(repartitions),
            backgroundColors: JSON.stringify(backgroundColors)
        };

    const tags = {
        'PVE': 'content raid raiding dungeon mythic',
        'PVP': 'player arena battleground',
        'ECONOMY': 'transmog gold vendor',
        'RACE': 'time allied level up',
        'PATCH': '8.2 changes coming'
    };

    let tagChart = {
        areas: [],
        repartitions: [],
        backgroundColors: []
    };

    let promises = [];
    for (let tag in tags) {
        let keywords = tags[tag];
        const query = {
            "size": 0,
            "query": {
                "match": {
                    "text": keywords
                }
            }
        };

        let promise = search(query);
        promises.push(promise);
    }

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

            res.render('home', {
                'charts': [areaChart, tagChart, wordsRepartitionChart]
            });
        });

    Promise.all(promises).then(function (result) {
        const tagKeys = Object.keys(tags);
        for (let i in result) {
            const tag = tagKeys[i];
            tagChart.areas.push(tag);
            tagChart.repartitions.push(result[i]['hits']['total']);
            tagChart.backgroundColors.push(dynamicColors());
        }

        res.render('home', {
            optionTitle: 'Tag Repartition',
            section: 'Tags',
            areas: JSON.stringify(tagChart.areas),
            repartitions: JSON.stringify(tagChart.repartitions),
            backgroundColors: JSON.stringify(tagChart.backgroundColors)
        });
    });
});

function extractColumn(arr, column) {
    return arr.map(x => {
        if (typeof x[column] === "string" && x[column].length === 0) {
            return 'No area'
        }
        return x[column];
    });
}

module.exports = router;