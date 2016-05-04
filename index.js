/* jshint node: true */
'use strict';

var path = require('path');
var pickFiles = require('broccoli-static-compiler');

module.exports = {
  name: 'ember-lokijs',

  treeForVendor: function(){
    var treePath = path.dirname(require.resolve('lokijs'));
    return pickFiles(this.treeGenerator(treePath), {
      srcDir: '/',
      destDir: 'lokijs'
    });
  },

  included: function(app) {
    this._super.included(app);
    app.import('vendor/lokijs/lokijs.js');
    app.import('vendor/lokijs/loki-indexed-adapter.js');
  }
};
