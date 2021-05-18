// Import filters
const longDateFilter = require('./src/filters/long-date-filter.js');
const mediumDateFilter = require('./src/filters/medium-date-filter.js');
const shortDateFilter = require('./src/filters/short-date-filter.js');
const markdownFilter = require('./src/filters/markdown-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

// Import transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");
const parseTransform = require("./src/transforms/parse-transform.js");
const criticalCSSTransform = require("./src/transforms/critical-css-transform.js");

// Import data files
const site = require("./src/_data/site.json");

module.exports = function(config) {
  // Filters
  config.addFilter('longDateFilter', longDateFilter);
  config.addFilter('mediumDateFilter', mediumDateFilter);
  config.addFilter('shortDateFilter', shortDateFilter);
  config.addFilter('markdownFilter', markdownFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

  // Transforms
  config.addTransform("parse", parseTransform);
  if (site.criticalCSS) {
    config.addTransform("critical-css", criticalCSSTransform);
  } 
  else {
    // Critical will also minify
    config.addTransform("htmlmin", htmlMinTransform);
  }

  // Custom collections
  const now = new Date();
  const livePosts = post => post.date <= now && !post.data.draft;
  config.addCollection("posts", collection => {
    return [
      ...collection.getFilteredByGlob("./src/posts/*.md").filter(livePosts)
    ].reverse();
  });

  config.addCollection("featuredPosts", collection => {
    return [
      ...collection.getFilteredByGlob("./src/posts/*.md").filter(post => {
        return post.date <= now && !post.data.draft && post.data.featured
      })
    ].reverse();
  });

  config.addCollection("postFeed", collection => {
    return [
      ...collection.getFilteredByGlob("./src/posts/*.md").filter(livePosts)
    ]
    .reverse()
    .slice(0, site.postsPerPage);
  });

  // Returns a list of people ordered by filename
  config.addCollection('people', collection => {
    return collection.getFilteredByGlob('./src/people/*.md').sort((a, b) => {
      return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
    });
  });

  // Passthrough
  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy('src/images');
  config.addPassthroughCopy('src/js');

  return {
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};