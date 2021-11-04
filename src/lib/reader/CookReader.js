const TokenReader = require('./TokenReader');

module.exports = class CookReader extends TokenReader {
  constructor(input) {
    super(input, /[\/:@\{\}%~#\n]|\w+|./gm);
  }
};
