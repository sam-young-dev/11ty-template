module.exports = function shortDateFilter(value) {
  const dateObject = new Date(value);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  return `${months[dateObject.getMonth()]} ${dateObject.getDate()}`;
};
