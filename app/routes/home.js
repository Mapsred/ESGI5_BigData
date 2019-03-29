const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const dynamicColors = require("../libs/colorLib");

router.get('/', (req, res) => {

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
                res.render('home', {
                    optionTitle: 'Tag Repartition',
                    section: 'Tags',
                    areas: JSON.stringify(tagChart.areas),
                    repartitions: JSON.stringify(tagChart.repartitions),
                    backgroundColors: JSON.stringify(tagChart.backgroundColors)

                });
            }
        });

    }

});

module.exports = router;