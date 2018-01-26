import Ember from 'ember';
import { pluralize } from 'ember-inflector';

let pluralModelName = Ember.computed('modelName', function() {
  return this.get('modelName') ? pluralize(this.get('modelName')) : undefined;
});

export default Ember.Component.extend({
  attributeBindings: ['id'],
  classNameBindings: ['carousel', 'limit:limited', 'pluralModelName', 'listings.length:hasListings:hasNoListings', 'hideNoListings:hideNoListings'],
  classNames: 'listings',
  id: pluralModelName,
  pluralModelName: pluralModelName,
  sortedListingsProperties: ['publishedAt:desc', 'id:desc'],
  sortedListings: Ember.computed.sort('listings', 'sortedListingsProperties'),
  store: Ember.inject.service(),
  tagName: 'section',

  header: Ember.computed('modelName', function() {
    return this.get('modelName') ? pluralize(this.get('modelName').charAt(0).toUpperCase() + this.get('modelName').slice(1)) : undefined;
  }),

  init() {
    this._super(...arguments);

    if (!this.get('listings')) {
      var query = this.get('store').findAll(this.get('modelName'), {
        limit: this.get('limit'),
        sort: this.get('sort')
      }).then((listings) => {
        this.set('listings', listings);
      }).catch(() => {});

      this.deferRendering(query);
    }
  },

  actions: {
    error(error) {
      Ember.Logger.debug(error.message);
    }
  }
});