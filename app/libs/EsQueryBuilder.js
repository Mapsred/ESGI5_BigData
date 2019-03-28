const elasticsearch = require('elasticsearch');

const search = async function (content, index = 'tweets') {
    const client = new elasticsearch.Client({
        host: 'elasticsearch:9200'
    });

    let result = {};

    try {
        result = await client.search({
            index: index,
            body: content
        });

        return new Promise().resolve(result);
    } catch (error) {
        console.trace(error.message);
    }

    return result;
};

module.exports = search;