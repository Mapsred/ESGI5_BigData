const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");
const dynamicColors = require("../libs/colorLib");

router.get('/area', (req, res) => {
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

        res.render('home', {
            optionTitle: 'Area Repartition',
            section: 'Area',
            areas: JSON.stringify(areas),
            repartitions: JSON.stringify(repartitions),
            backgroundColors: JSON.stringify(backgroundColors)
        })
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