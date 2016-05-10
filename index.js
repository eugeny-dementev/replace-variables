var _get = require('lodash.get');

var INJECT_VARIABLES_REGEXP = /\${([a-zA-Z]+[a-zA-Z0-9.]*)}/g;
var TYPE_REGEXP = /(string|number)/;

/**
 * Replace ${h.h.h} with ctx.h.h.h value.
 *
 * If value if not number or string, throws error.
 * @param {Object} ctx
 * @param {string} str
 * @return {string}
 * @throws {TypeError}
 */
module.exports = function replaceVariables (ctx, str) {
  return str.replace(INJECT_VARIABLES_REGEXP, function replaceVariable (s, path) {
    var value = _get(ctx, path);

    if (!TYPE_REGEXP.test(typeof value)) {
      throw new TypeError('Cannot replace variable ' + path + '. Not a number or string');
    }

    return value;
  });
};
