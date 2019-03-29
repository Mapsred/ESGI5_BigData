const express = require('express');
const router = express.Router();
const search = require("../libs/EsQueryBuilder");

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

    search(query).then(function(result){
        const areaRepartition = result.aggregations.tagcloud.buckets;

        const areas = extractColumn(areaRepartition, 'key'),
            repartitions = extractColumn(areaRepartition, 'doc_count');

        // let colors = [];
        // for(let i in areaRepartition) {
        //     colors.
        // }

        res.render('home', { section: 'Home', areas: JSON.stringify(areas), repartitions: JSON.stringify(repartitions) });
    });
});

function extractColumn(arr, column) {
    return arr.map(x =>  {
        if(typeof x[column] === "string" && x[column].length === 0){
            return 'No area'
        }
        return x[column];
    });
}

module.exports = router;