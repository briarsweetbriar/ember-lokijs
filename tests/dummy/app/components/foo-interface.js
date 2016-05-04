import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

const { inject: { service } } = Ember;

export default Component.extend({
  store: service(),

  foos: computed(() => Ember.A()),

  actions: {
    createRecord() {
      get(this, 'store').createRecord('foo', { bar: 0 }).save();
    },

    updateRecord() {
      get(this, 'store').findAll('foo').then((foos) => {
        const foo = get(foos, 'firstObject');

        foo.incrementProperty('bar');
        foo.save();
      });
    },

    findRecord() {
      get(this, 'store').findRecord('foo', 1).then((foo) => {
        get(this, 'foos').clear().pushObject(foo);
      });
    },

    findAll() {
      get(this, 'store').findAll('foo').then((foos) => {
        get(this, 'foos').clear().pushObjects(foos.toArray());
      });
    },

    queryRecord() {
      get(this, 'store').queryRecord('foo', { bar: 0 }).then((foo) => {
        get(this, 'foos').clear().pushObject(foo);
      });
    },

    query() {
      get(this, 'store').query('foo', { bar: 0 }).then((foos) => {
        get(this, 'foos').clear().pushObjects(foos.toArray());
      });
    },

    deleteRecord() {
      get(this, 'store').findAll('foo').then((foos) => {
        const foo = get(foos, 'lastObject');

        foo.destroyRecord();
      });
    }
  }
});
