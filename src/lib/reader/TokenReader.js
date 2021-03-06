module.exports = class TokenReader {
  constructor(input = '', regex) {
    this.tokens = input.match(regex);
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

  readUntil(token) {
    let result = '';
    while (!this.eof() && this.peek() !== token) {
      result += this.read();
    }
    return result;
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
