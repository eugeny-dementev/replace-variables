const Lab = require('lab');
const lab = exports.lab = Lab.script();
const experiment = lab.experiment;
const test = lab.test;

const assert = require('assert');

const inject = require('../index');

experiment('Replace ${variables}.', () => {
  experiment('Without ${variables}.', () => {
    var strings = [
      'ывашгр',
      'аывргшаырг  ываргшгры авгрш',
      'fsa0 j0f sdsfdj0 jj',
      "Запутанная \" 'строка' \"",
      '\''
    ];

    strings.forEach((string) => {
      test(`No changes for ${string}.`, (done) => {

        assert.equal(string, inject({}, string));

        done();
      });
    });
  });

  test('All repeats replaced.', (done) => {
    var string = '${hello} ${hello} ${hello}';

    var context = { hello: 'привет' };

    assert.equal('привет привет привет', inject(context, string));

    done();
  });

  test('Variables with selfinnered paths replaced fine.', (done) => {
    var string = '${h} ${hh} ${hhh} ${hhhh}';

    var context = {
      h: 1,
      hh: 2,
      hhh: 3,
      hhhh: 4
    };

    assert.equal('1 2 3 4', inject(context, string));

    done();
  });

  test('Not variables not replace', (done) => {
    var string = '$1 $ h$ $$ 100$ $10';

    assert.equal('$1 $ h$ $$ 100$ $10', inject({}, string));

    done();
  });

  test('If wrong value type, throw error', (done) => {
    var string = '${hh}';

    assert.throws(() => {
      inject({}, string);
    }, TypeError);

    done();
  });

  test('Dots in variable path', (done) => {
    var string = '${h.h}';

    var context = {
      h: {
        h: 'строка'
      }
    };

    assert.equal('строка', inject(context, string));

    done();
  });
});
