import { LokiJSSerializer } from 'ember-lokijs';
import { module, test } from 'qunit';

module('Unit | Serializer | ember lokijs/lokjsi');

const createSnapshot = (object) => {
  object.attributes = () => {
    return object;
  };

  return object;
};

test('`serialize` transforms the record `id` into `$loki`', function(assert) {
  assert.expect(1);

  const record = createSnapshot({ id: 1 });
  const result = LokiJSSerializer.create().serialize(record);

  assert.equal(result.$loki, record.id, '$loki equals id');
});

test('`serialize` assigs no `$loki` if there is not an `id`', function(assert) {
  assert.expect(1);

  const record = createSnapshot({ });
  const result = LokiJSSerializer.create().serialize(record);

  assert.ok(!result.$loki, '$loki is blank');
});

test('`serialize` clones the record `meta`', function(assert) {
  assert.expect(1);

  const meta = { foo: true };
  const record = createSnapshot({ meta });
  const result = LokiJSSerializer.create().serialize(record);

  meta.bar = true;

  assert.ok(!result.meta.bar, '`meta` is cloned');
});
