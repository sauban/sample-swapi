const _ = require('lodash');

const fetchRecord = async (url, oldRecord=[]) => {
    try {
        const { data } = await get(url);
        let newRecord;
        if (data.results) {
            newRecord = [...oldRecord, ...data.results];
        }
        if (data.next) {
            return fetchRecord(data.next, newRecord);
        }
        return newRecord || data;
    } catch (error) {
        throw error;
    }
};

exports.fetchRecord = fetchRecord;

exports.getQueryValue = (query, delimiter=':') => {
    return query && query.split(delimiter)[1];
}

exports.getQueryKey = (query, delimiter=':') => {
    return query && query.split(delimiter)[0];
}

exports.toFeet = (num) => {
    if (isNaN(num)) {
        return null;
    }
    var realFeet = +num / 30.48;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return `${feet}ft and ${inches} inches`;
  };

exports.getMeta = (results) => ({
        total: results.length,
        totalHeight: results.reduce((acc, curr) => {
            if (isNaN(curr.height)) {
                return acc;
            }
            acc.cm += parseFloat(curr.height);
            acc.inch = toFeet(acc.cm);
            return acc;
        }, { cm: 0 })
    });

exports.convertToNum = (str) => {
    if (isNaN(str)){
        return 0;
    }

    return parseFloat(str);
};
