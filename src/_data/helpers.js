module.exports = {
  getNextHeadingLevel(currentLevel) {
    return parseInt(currentLevel, 10) + 1;
  },
  getReadingTime(text) {
    const wordsPerMinute = 200;
    const numberOfWords = text.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  },
  currentYear() {
    const today = new Date();
    return today.getFullYear();
  },
  /**
   * Returns back some attributes based on wether the
   * link is active or a parent of an active item
   *
   * @param {String} itemUrl The link in question
   * @param {String} pageUrl The page context
   * @returns {String} The attributes or empty
  */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
      response = ' aria-current="page"';
    }

    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      response += ' data-state="active"';
    }

    return response;
  },
  /**
   * Take a key and return back the item that matches.
   * Note: item in the collection must have a key attribute in
   * Front Matter
   *
   * @param {Array} collection 11ty collection
   * @param {Number} key collection of key
   * @returns {Array} result collection or empty
   */
   filterCollectionByKey(collection, key) {
    const arrayItem = collection.filter(x => x.data.key === key);
    return arrayItem[0];
  }
};
