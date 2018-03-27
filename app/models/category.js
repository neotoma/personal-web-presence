import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Model from 'ember-data/model';

export default Model.extend({
  affiliations: hasMany('affiliation'),
  name: attr('string'),
  projects: hasMany('project')
});