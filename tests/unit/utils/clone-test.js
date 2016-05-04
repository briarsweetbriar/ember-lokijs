import Ember from 'ember';
import clone from 'ember-lokijs/utils/clone';
import { module, test } from 'qunit';

module('Unit | Utility | clone');

const { typeOf } = Ember;

test('returns undefined if passed undefined', function(assert) {
  assert.expect(1);

  const result = clone(undefined);

  assert.equal(typeOf(result), 'undefined', 'cloned correct type');
});

test('returns null if passed null', function(assert) {
  assert.expect(1);

  const result = clone(null);

  assert.equal(typeOf(result), 'null', 'cloned correct type');
});

test('returns string if passed string', function(assert) {
  assert.expect(2);

  const result = clone('foo');

  assert.equal(typeOf(result), 'string', 'cloned correct type');
  assert.equal(result, 'foo', 'cloned string');
});

test('returns blank string if passed blank string', function(assert) {
  assert.expect(2);

  const result = clone('');

  assert.equal(typeOf(result), 'string', 'cloned correct type');
  assert.equal(result, '', 'cloned string');
});

test('returns number if passed number', function(assert) {
  assert.expect(2);

  const result = clone(1);

  assert.equal(typeOf(result), 'number', 'cloned correct type');
  assert.equal(result, 1, 'cloned number');
});

test('returns number 0 if passed 0', function(assert) {
  assert.expect(2);

  const result = clone(0);

  assert.equal(typeOf(result), 'number', 'cloned correct type');
  assert.equal(result, 0, 'cloned number');
});

test('clones objects', function(assert) {
  assert.expect(3);

  const original = { foo: true };
  const result = clone(original);

  result['bar'] = true;

  assert.equal(typeOf(result), 'object', 'cloned correct type');
  assert.ok(result.bar, 'cloned object can be altered');
  assert.ok(!original.bar, 'original object is not altered');
});

test('clones arrays', function(assert) {
  assert.expect(3);

  const original = ['foo'];
  const result = clone(original);

  result.push('bar');

  assert.equal(typeOf(result), 'array', 'cloned correct type');
  assert.equal(result.length, 2, 'cloned array can be altered');
  assert.equal(original.length, 1, 'original array is not altered');
});

test('clones empty arrays', function(assert) {
  assert.expect(3);

  const original = [];
  const result = clone(original);

  result.push('bar');

  assert.equal(typeOf(result), 'array', 'cloned correct type');
  assert.equal(result.length, 1, 'cloned array can be altered');
  assert.equal(original.length, 0, 'original array is not altered');
});
