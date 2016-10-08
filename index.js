/* jshint node: true */
'use strict';

var path = require('path');
var pickFiles = require('broccoli-static-compiler');

function findRoot(current) {
  var app;

  // Keep iterating upward until we don't have a grandparent.
  // Has to do this grandparent check because at some point we hit the project.
  do {
    app = current.app || app;
  } while (current.parent && current.parent.parent && (current = current.parent));

  return app;
}

module.exports = {
  name: 'ember-lokijs',

  treeForVendor: function(){
    var treePath = path.dirname(require.resolve('lokijs'));
    return pickFiles(this.treeGenerator(treePath), {
      srcDir: '/',
      destDir: 'lokijs'
    });
  },

  treeForAddon: function(app) {
    var app = findRoot(this);

    app.import('vendor/lokijs/lokijs.js');
    app.import('vendor/lokijs/loki-indexed-adapter.js');

    return this._super.treeForAddon.apply(this, arguments);
  }
};
