const fs = require("fs");
class Cache {
  static LIMIT = Number(process.env.CACHE_LIMIT ?? 10);

  static getCache() {
    try {
      return JSON.parse(fs.readFileSync("./cache.json"));
    } catch {
      return [];
    }
  }

  static get(number) {
    const cache = this.getCache();
    return cache.find((e) => e.number === number);
  }

  static set(number, value) {
    const cache = this.getCache();

    if (cache.length >= this.LIMIT) {
      cache.shift();
    }

    cache.push({ number, value });

    fs.writeFileSync("./cache.json", JSON.stringify(cache));
  }
}

module.exports = Cache;
