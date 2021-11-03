module.exports = class TokenReader {
  constructor(input) {
    this.tokens = input.match(/[\/:@\{\}%~#\n]|\w+|./gm);
    this.line = 1;
  }

  peek() {
    return this.tokens[0];
  }

  eof() {
    return this.tokens.length === 0;
  }

  read() {
    if (this.peek() === '\n') {
      this.line++;
    }
    return this.tokens.shift();
  }

  unread(token) {
    this.tokens.unshift(token);
  }

  expect(token) {
    const t = this.read();
    if (t === token) {
      return t;
    }
    throw new Error(`Expected ${token} but got ${t} on line ${this.line}`);
  }

  maybe(token) {
    if (this.peek() === token) {
      return this.read();
    } else {
      return false;
    }
  }
};
