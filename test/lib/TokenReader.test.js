const { expect } = require('chai');
const TokenReader = require('../../src/lib/TokenReader');

describe('TokenReader', function () {
  describe('#constructor()', function () {
    it('should create a new TokenReader', function () {
      const reader = new TokenReader('foo bar');
      expect(reader.tokens).to.deep.equal(['foo', ' ', 'bar']);
    });

    it('should properly tokenize the language', function () {
      const reader = new TokenReader(
        'foo #bar @biz{} ~buz // baz\n@boz bez{1/2%byz} @foo{1.1%bar}'
      );
      expect(reader.tokens).to.deep.equal([
        'foo',
        ' ',
        '#',
        'bar',
        ' ',
        '@',
        'biz',
        '{',
        '}',
        ' ',
        '~',
        'buz',
        ' ',
        '/',
        '/',
        ' ',
        'baz',
        '\n',
        '@',
        'boz',
        ' ',
        'bez',
        '{',
        '1',
        '/',
        '2',
        '%',
        'byz',
        '}',
        ' ',
        '@',
        'foo',
        '{',
        '1',
        '.',
        '1',
        '%',
        'bar',
        '}'
      ]);
    });
  });

  describe('#peek()', function () {
    it('should return the next token', function () {
      const reader = new TokenReader('foo bar');
      expect(reader.peek()).to.equal('foo');
    });

    it('should not change the current token', function () {
      const reader = new TokenReader('foo bar');
      reader.peek();
      expect(reader.peek()).to.equal('foo');
    });
  });

  describe('#read()', function () {
    it('should return the next token', function () {
      const reader = new TokenReader('foo bar');
      expect(reader.read()).to.equal('foo');
    });

    it('should keep track of which line the token is on', function () {
      const reader = new TokenReader('foo\nbar');
      reader.read();
      expect(reader.line).to.equal(1);
      reader.read();
      reader.read();
      expect(reader.line).to.equal(2);
    });
  });

  describe('#unread()', function () {
    it('should unread the last token', function () {
      const reader = new TokenReader('foo bar');
      reader.unread(reader.read());
      expect(reader.peek()).to.equal('foo');
    });
  });

  describe('#expect()', function () {
    it('should return the next token if it matches', function () {
      const reader = new TokenReader('foo bar');
      expect(reader.expect('foo')).to.equal('foo');
    });

    it('should throw an error if the token does not match', function () {
      const reader = new TokenReader('foo bar');
      expect(() => reader.expect('bar')).to.throw(
        'Expected bar but got foo on line 1'
      );
    });
  });

  describe('#maybe()', function () {
    it('should return the next token if it matches', function () {
      const reader = new TokenReader('foo bar');
      expect(reader.maybe('foo')).to.equal('foo');
    });

    it('should return false if the token does not match', function () {
      const reader = new TokenReader('foo bar');
      expect(reader.maybe('bar')).to.equal(false);
    });
  });
});
