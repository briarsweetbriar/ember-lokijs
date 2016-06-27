[![npm version](https://badge.fury.io/js/ember-lokijs.svg)](https://badge.fury.io/js/ember-lokijs)
[![Build Status](https://travis-ci.org/null-null-null/ember-lokijs.svg?branch=master)](https://travis-ci.org/null-null-null/ember-lokijs)

# ember-lokijs

[LokiJS](https://github.com/techfort/LokiJS) is a highly performant localStorage/sessionStorage/indexedDB interface. This addon wraps Loki and also provides an extensible adapter and serializer so you can easily use it with Ember Data models.

## Installation

`ember install ember-lokijs`

## Usage

First, add the `LokiJSModelMixin` to your model:

```js
// models/foo.js
import DS from 'ember-data';
import { LokiJSModelMixin } from 'ember-lokijs';

export default DS.Model.extend(LokiJSModelMixin, {
});
```

Next, extend a `LokiJSAdapter` for your model:

```js
// adapters/foos.js
import { LokiJSAdapter } from 'ember-lokijs';

export default LokiJSAdapter;
```

Finally, extend a `LokiJSSerializer` for your model:

```js
// serializer/foos.js
import { LokiJSSerializer } from 'ember-lokijs';

export default LokiJSSerializer;
```

And that's it!

### `indices`

If you want a particular query to be faster, you can index its attributes in your adapter:

```js
// adapters/user.js
import { LokiJSAdapter } from 'ember-lokijs';

export default LokiJSAdapter.extend({
  indices: ['username', 'email']
});
```

### `databaseName`

By default, the adapter will place all models in the same database named `ember-lokijs`. If you wish to place them in separate databases, simply provide your adapters with unique `databaseName`:

```js
// adapters/user.js
import { LokiJSAdapter } from 'ember-lokijs';

export default LokiJSAdapter.extend({
  databaseName: 'user-db'
});
```

### `Adapter`

If you want to use a lokijs adapter other than the default, you can specify it:

```js
// adapters/user.js
import { LokiJSAdapter } from 'ember-lokijs';

export default LokiJSAdapter.extend({
  Adapter: LokiIndexedAdapter
});
```

### `adapterOptions`

If you specify a custom lokijs adapter, you can also pass in options:

```js
// adapters/user.js
import { LokiJSAdapter } from 'ember-lokijs';

export default LokiJSAdapter.extend({
  Adapter: LokiCordovaFSAdapter,
  adapterOptions: {
    prefix: 'loki'
  }
});
```
