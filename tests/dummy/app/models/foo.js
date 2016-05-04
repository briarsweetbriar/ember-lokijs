import DS from 'ember-data';
import { LokiJSModelMixin } from 'ember-lokijs';

const {
  Model,
  attr
} = DS;

export default Model.extend(LokiJSModelMixin, {
  bar: attr('number')
});
