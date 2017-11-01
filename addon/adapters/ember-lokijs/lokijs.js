import DS from 'ember-data';
import Ember from 'ember';

const {
  get,
  getProperties,
  set
} = Ember;

const { Adapter } = DS;
const { RSVP: { Promise, resolve } } = Ember;

export default Adapter.extend({
  databaseName: 'ember-lokijs',
  indices: [],
  lokiOptions: {},

  init() {
    const db = new loki(get(this, 'databaseName'), get(this, 'lokiOptions'));

    set(this, '_dbLoadPromise', new Promise((_resolve) => {
      db.loadDatabase({}, () => {
        set(this, '_dbLoaded', true);
        _resolve();
      });
    }));

    set(this, 'db', db);

    this._super();
  },

  createRecord(store, type, snapshot) {
    return this._promiseWrap(() => {
      const record = this._findOrAddCollection(type).insert(store.serializerFor(type.modelName).serialize(snapshot));

      this._saveDatabase();

      return record;
    });
  },

  updateRecord(store, type, snapshot) {
    return this._promiseWrap(() => {
      const record = this._findOrAddCollection(type).update(store.serializerFor(type.modelName).serialize(snapshot));

      this._saveDatabase();

      return record;
    });
  },

  deleteRecord(store, type, snapshot) {
    return this._promiseWrap(() => {
      const serializedData = store.serializerFor(type.modelName).serialize(snapshot);
      const collection = this._findOrAddCollection(type);
      const record = collection.get(snapshot.id);

      collection.remove(serializedData);
      this._saveDatabase();

      return record;
    });
  },

  findAll(store, type) {
    return this._promiseWrap(() => {
      return this._findOrAddCollection(type).find();
    });
  },

  findRecord(store, type, id) {
    return this._promiseWrap(() => {
      return this._findOrAddCollection(type).get(id);
    });
  },

  query(store, type, query) {
    return this._promiseWrap(() => {
      return this._findOrAddCollection(type).find(this._queryConstructor(query));
    });
  },

  queryRecord(store, type, query) {
    return this._promiseWrap(() => {
      return this._findOrAddCollection(type).findOne(this._queryConstructor(query));
    });
  },

  _queryConstructor(query) {
    const keys = Object.keys(query);

    return keys.length <= 1 ? query : { '$and': keys.map((key) => {
      const object = {};

      object[key] = query[key];

      return object;
    })};
  },

  _findOrAddCollection(type) {
    const {
      db,
      indices
    } = getProperties(this, 'db', 'indices');

    let collection = db.getCollection(type.modelName);

    if (!collection) {
      collection = db.addCollection(type.modelName, {
        indices
      });
    }

    return collection;
  },

  _promiseWrap(cb) {
    if (get(this, '_dbLoaded')) {
      return resolve(cb() || []);
    } else {
      return new Promise((_resolve) => {
        get(this, '_dbLoadPromise').then(() => {
          _resolve(cb() || []);
        });
      });
    }
  },

  _saveDatabase() {
    const db = get(this, 'db');

    db.saveDatabase();
    db.loadDatabase();
  }
});
