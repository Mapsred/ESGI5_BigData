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

module.exports = router;