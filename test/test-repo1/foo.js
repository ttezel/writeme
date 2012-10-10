/*
 Output the given `str` to _stdout_.
*/
 exports.write = function(str) {
  process.stdout.write(str);
};

 /*
  Output the given `str` to _stdout_
  or the stream specified by `options`.
 
  @param {String} str
  @param {Object} options
  @return {Object} exports for chaining
*/
exports.write = function(str, options) {
  options = options || {};
  (options.stream || process.stdout).write(str);
  return this;
};