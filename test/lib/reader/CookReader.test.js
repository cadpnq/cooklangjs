const { expect } = require('chai');
const CookReader = require('../../../src/lib/reader/CookReader');

describe('CookReader', function () {
  describe('#constructor()', function () {
    it('should create a new CookReader instance', function () {
      const cookReader = new CookReader();
      expect(cookReader).to.be.an.instanceof(CookReader);
    });

    it('should properly the input', function () {
      const reader = new CookReader(
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
});
