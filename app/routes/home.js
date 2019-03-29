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

            search(query).then(function (result) {
                tagChart.areas.push(tag);
                tagChart.repartitions.push(result['hits']['total']);
                tagChart.backgroundColors.push(dynamicColors());

                let lastKeys = Object.keys(tags)[Object.keys(tags).length - 1];
                if (tag === lastKeys) {
                    tagChart = {
                        section: 'Tags',
                        areas: JSON.stringify(tagChart.areas),
                        repartitions: JSON.stringify(tagChart.repartitions),
                        backgroundColors: JSON.stringify(tagChart.backgroundColors)
                    };

                    res.render('home', {
                        'charts': [areaChart, tagChart]
                    });
                }
            });

        }

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