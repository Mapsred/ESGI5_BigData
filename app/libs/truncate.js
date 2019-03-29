const truncate = function (elem, limit) {
    const substring = elem.substring(0, limit);

    return substring.length < elem.length ? substring + "..." : substring;
};

module.exports = truncate;
