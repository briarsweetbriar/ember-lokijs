import { LokiJSAdapter } from 'ember-lokijs';
import { module, test } from 'qunit';

module('Unit | Adapter | ember lokijs/lokijs');

test('`initializeDb` initializes and then sets a loki db', function(assert) {
  assert.expect(2);

  const adapter = LokiJSAdapter.create();

  assert.ok(adapter.get('db'), 'database is set');
  assert.equal(adapter.get('db.filename'), 'ember-lokijs', '`db` is a loki database');
});
