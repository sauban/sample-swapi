const { get } = require('axios');
const httpStatus = require('http-status');
const _ = require('lodash');

const APIError = require('./apierror');

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

const toFeet = (num) => {
    if (isNaN(num)) {
        return null;
    }
    var realFeet = +num / 30.48;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return `${feet}ft and ${inches} inches`;
  };

exports.toFeet = toFeet;

const convertToNum = (str) => {
    if (isNaN(str)){
        return 0;
    }

    return Number(str);
};
exports.convertToNum = convertToNum;

exports.getMeta = (results) => ({
        total: results.length,
        totalHeight: results.reduce((acc, curr) => {
            acc.cm += convertToNum(curr.height);
            acc.inch = toFeet(acc.cm);
            return acc;
        }, { cm: 0 })
    });

exports.validateQUery = (allowedKeys, queryObj) => {
    return Object.keys(queryObj).reduce((acc, curr) => {
        if (!_.includes(allowedKeys, curr)) {
            return new APIError({
                status: httpStatus.BAD_REQUEST,
                message: 'Validation Error',
                errors: [
                    {
                        location: 'query',
                        message: `Invalid '${curr}' query key, it must be one of [${allowedKeys}]`
                    }
                ]
            });
        }
        return acc;
    }, null);
}