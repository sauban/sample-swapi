/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
const { get } = require('axios');

const fetchRecord = async (url, oldRecord = []) => {
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
exports.getIdFromUrl = url => url.substring(0, url.length - 1).split('/').pop();

exports.fetchRecord = fetchRecord;

const convertToNum = (str) => {
  if (isNaN(str)) {
    return 0;
  }

  return Number(str);
};
exports.convertToNum = convertToNum;
