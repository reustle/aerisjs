define(['aeris/aerisapi'], function(AerisAPI) {
  describe('AerisAPI', function() {

    // Serializer tests are borrowed from jQuery
    // https://github.com/jquery/jquery/blob/e53a91909061c7a7280a274990db179b94db81b6/test/unit/serialize.js
    describe('URI Serializer', function() {

      it('should serialize objects to URI components', function() {
        var params;
        params = {'foo': 'bar', 'baz': 42, 'quux': 'All your base are belong to us'};
        expect(AerisAPI.serializeToURI(params)).toBe('foo=bar&baz=42&quux=All+your+base+are+belong+to+us');
      });

      it('should handle nulls and undefineds properly', function() {
        params = {'string': 'foo', 'null': null, 'undefined': undefined};
        expect(AerisAPI.serializeToURI(params)).toBe('string=foo&null=&undefined=');
      });

      it('should serialize an array as a value', function() {
        params = {'someName': [1, 2, 3], 'regularThing': 'blah' };
        expect(AerisAPI.serializeToURI(params)).toBe('someName%5B%5D=1&someName%5B%5D=2&someName%5B%5D=3&regularThing=blah');
      });

      it('should serialize an array of strings', function() {
        params = {'foo': ['a', 'b', 'c']};
        expect(AerisAPI.serializeToURI(params)).toBe('foo%5B%5D=a&foo%5B%5D=b&foo%5B%5D=c');
      });

      it('should serialize an array of string, and encode URI components', function() {
        params = {'foo': ['baz', 42, 'All your base are belong to us'] };
        expect(AerisAPI.serializeToURI(params)).toBe('foo%5B%5D=baz&foo%5B%5D=42&foo%5B%5D=All+your+base+are+belong+to+us');
      });

      it('should serialize nested objects', function() {
        params = {'foo': { 'bar': 'baz', 'beep': 42, 'quux': 'All your base are belong to us' } };
        expect(AerisAPI.serializeToURI(params)).toBe('foo%5Bbar%5D=baz&foo%5Bbeep%5D=42&foo%5Bquux%5D=All+your+base+are+belong+to+us');
      });

      it('should serialize deep nested objects', function() {
        params = { a: [1, 2], b: { c: 3, d: [4, 5], e: { x: [6], y: 7, z: [8, 9] }, f: true, g: false, h: undefined }, i: [10, 11], j: true, k: false, l: [undefined, 0], m: 'cowboy hat?' };
        expect(decodeURIComponent(AerisAPI.serializeToURI(params))).toBe('a[]=1&a[]=2&b[c]=3&b[d][]=4&b[d][]=5&b[e][x][]=6&b[e][y]=7&b[e][z][]=8&b[e][z][]=9&b[f]=true&b[g]=false&b[h]=&i[]=10&i[]=11&j=true&k=false&l[]=&l[]=0&m=cowboy+hat?');
      });

      it('should serialize nested arrays', function() {
        params = { 'a': [0, [1, 2], [3, [4, 5], [6]], { 'b': [7, [8, 9], [{ 'c': 10, 'd': 11 }], [[12]], [[[13]]], { 'e': { 'f': { 'g': [14, [15]] } } }, 16] }, 17] };
        expect(decodeURIComponent(AerisAPI.serializeToURI(params))).toBe('a[]=0&a[1][]=1&a[1][]=2&a[2][]=3&a[2][1][]=4&a[2][1][]=5&a[2][2][]=6&a[3][b][]=7&a[3][b][1][]=8&a[3][b][1][]=9&a[3][b][2][0][c]=10&a[3][b][2][0][d]=11&a[3][b][3][0][]=12&a[3][b][4][0][0][]=13&a[3][b][5][e][f][g][]=14&a[3][b][5][e][f][g][1][]=15&a[3][b][]=16&a[]=17');
      });

      it('should not double encode objects', function() {
        expect(decodeURIComponent(AerisAPI.serializeToURI({ 'a': [1, 2, 3], 'b[]': [4, 5, 6], 'c[d]': [7, 8, 9], 'e': { 'f': [10], 'g': [11, 12], 'h': 13 } }))).toBe('a[]=1&a[]=2&a[]=3&b[]=4&b[]=5&b[]=6&c[d][]=7&c[d][]=8&c[d][]=9&e[f][]=10&e[g][]=11&e[g][]=12&e[h]=13');
      });
    });
  });
});