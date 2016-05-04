import DS from 'ember-data';
import Ember from 'ember';
import clone from 'ember-lokijs/utils/clone';

const { JSONSerializer } = DS;
const { isPresent } = Ember;

export default JSONSerializer.extend({
  primaryKey: '$loki',

  // Need to overwrite, or else extractMeta will remove the meta object from the payload
  extractMeta() {},

  serialize(snapshot) {
    const record = snapshot.attributes();

    if (isPresent(snapshot.id)) {
      record.$loki = parseInt(snapshot.id, 10);
    }

    record.meta = clone(record.meta);

    return record;
  }
});
