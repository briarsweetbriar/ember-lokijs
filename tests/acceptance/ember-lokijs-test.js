import Ember from 'ember';
import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { hook } from 'ember-hook';

let db;

function getText() {
  return Ember.$(this).text().trim();
}

moduleForAcceptance('Acceptance | ember lokijs', {
  beforeEach() {
    db = new loki('ember-lokijs');
  },

  afterEach() {
    localStorage.clear();
  }
});

test('visiting /ember-lokijs', function(assert) {
  assert.expect(14);

  visit('/');

  andThen(() => {
    click(hook('createRecord'));
    click(hook('createRecord'));
    click(hook('createRecord'));
  });

  andThen(() => {
    db.loadDatabase();
  });

  andThen(() => {
    const foos = db.getCollection('foo').data;

    assert.equal(foos.length, 3, '3 foos saved to local db');
    assert.deepEqual(foos.map((foo) => foo.bar), [0, 0, 0], 'foos all have value of 0');
  });

  andThen(() => {
    click(hook('updateRecord'));
    click(hook('updateRecord'));
  });

  andThen(() => {
    db.loadDatabase();
  });

  andThen(() => {
    const foos = db.getCollection('foo').data;

    assert.equal(foos.length, 3, 'still 3 foos after update');
    assert.deepEqual(foos.map((foo) => foo.bar), [2, 0, 0], 'foo values updated correctly');
  });

  andThen(() => {
    click(hook('findRecord'));
  });

  andThen(() => {
    db.loadDatabase();
  });

  andThen(() => {
    const bars = find(hook('bar'));

    assert.equal(bars.length, 1, 'findRecord retrieves only a single record');
    assert.deepEqual(bars.map(getText).toArray(), ['2'], 'findRecord retrieves the record regardless of value');
  });

  andThen(() => {
    click(hook('findAll'));
  });

  andThen(() => {
    db.loadDatabase();
  });

  andThen(() => {
    const bars = find(hook('bar'));

    assert.equal(bars.length, 3, 'findAll retrieves all records');
    assert.deepEqual(bars.map(getText).toArray(), ['2', '0', '0'], 'findAll retrieves all records regardless of value');
  });

  andThen(() => {
    click(hook('queryRecord'));
  });

  andThen(() => {
    db.loadDatabase();
  });

  andThen(() => {
    const bars = find(hook('bar'));

    assert.equal(bars.length, 1, 'queryRecord retrieves only a single record');
    assert.deepEqual(bars.map(getText).toArray(), ['0'], 'queryRecord retrieves the record based on value');
  });

  andThen(() => {
    click(hook('query'));
  });

  andThen(() => {
    db.loadDatabase();
  });

  andThen(() => {
    const bars = find(hook('bar'));

    assert.equal(bars.length, 2, 'query retrieves all records that match query');
    assert.deepEqual(bars.map(getText).toArray(), ['0', '0'], 'query retrieves the records based on their values');
  });

  andThen(() => {
    click(hook('deleteRecord'));
  });

  andThen(() => {
    db.loadDatabase();
  });

  andThen(() => {
    const foos = db.getCollection('foo').data;

    assert.equal(foos.length, 2, 'deleteRecord deleted the foo');
    assert.deepEqual(foos.map((foo) => foo.bar), [2, 0], 'remaining foos are untouched');
  });
});
