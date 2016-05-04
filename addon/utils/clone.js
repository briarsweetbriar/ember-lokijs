import Ember from 'ember';

const { isNone } = Ember;

export default function clone(object) {
  if (isNone(object)) { return object; }

  return JSON.parse(JSON.stringify(object));
}
