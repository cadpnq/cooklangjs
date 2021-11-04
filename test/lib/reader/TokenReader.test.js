const { expect } = require('chai');
const TokenReader = require('../../../src/lib/reader/TokenReader');

const testRegex = /\w+|.|\n/gm;

describe('TokenReader', function () {
  describe('#constructor()', function () {
    it('should create a new TokenReader instance', function () {
      const reader = new TokenReader('foo bar', testRegex);
      expect(reader).to.be.an.instanceof(TokenReader);
    });

    it('should tokenize the input', function () {
      const reader = new TokenReader('foo bar', testRegex);
      expect(reader.tokens).to.deep.equal(['foo', ' ', 'bar']);
    });
  });

  describe('#peek()', function () {
    it('should return the next token', function () {
      const reader = new TokenReader('foo bar', testRegex);
      expect(reader.peek()).to.equal('foo');
    });

    it('should not change the current token', function () {
      const reader = new TokenReader('foo bar', testRegex);
      reader.peek();
      expect(reader.peek()).to.equal('foo');
    });
  });

  describe('#eof()', function () {
    it('should return true if the reader is at the end of the stream', function () {
      const reader = new TokenReader('foo bar', testRegex);
      reader.read();
      expect(reader.eof()).to.be.false;
      reader.read();
      reader.read();
      expect(reader.eof()).to.be.true;
    });
  });

  describe('#read()', function () {
    it('should return the next token', function () {
      const reader = new TokenReader('foo bar', testRegex);
      expect(reader.read()).to.equal('foo');
    });

    it('should keep track of which line the token is on', function () {
      const reader = new TokenReader('foo\nbar', testRegex);
      reader.read();
      expect(reader.line).to.equal(1);
      reader.read();
      reader.read();
      expect(reader.line).to.equal(2);
    });
  });

  describe('#unread()', function () {
    it('should unread the last token', function () {
      const reader = new TokenReader('foo bar', testRegex);
      reader.unread(reader.read());
      expect(reader.peek()).to.equal('foo');
    });
  });

  describe('#expect()', function () {
    it('should return the next token if it matches', function () {
      const reader = new TokenReader('foo bar', testRegex);
      expect(reader.expect('foo')).to.equal('foo');
    });

    it('should throw an error if the token does not match', function () {
      const reader = new TokenReader('foo bar', testRegex);
      expect(() => reader.expect('bar')).to.throw(
        'Expected bar but got foo on line 1'
      );
    });
  });

  describe('#maybe()', function () {
    it('should return the next token if it matches', function () {
      const reader = new TokenReader('foo bar', testRegex);
      expect(reader.maybe('foo')).to.equal('foo');
    });

    it('should return false if the token does not match', function () {
      const reader = new TokenReader('foo bar', testRegex);
      expect(reader.maybe('bar')).to.equal(false);
    });
  });
});
