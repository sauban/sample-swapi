
const NodeCache = require('node-cache');
const { Promise } = require('bluebird');

function cacheFactory(ttlSeconds) {
  const cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });

  return {
    get(key, storeFunction) {
      const value = cache.get(key);
      if (value) {
        return Promise.resolve(value);
      }

      return storeFunction().then((result) => {
        this.set(key, result);
        return result;
      });
    },

    set(key, value) {
      cache.set(key, value);
      return value;
    },

    del(keys) {
      cache.del(keys);
    },
  };
}

module.exports = cacheFactory;
