/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Base from 'ember-cp-validations/validators/base';

const {
  get,
  isEmpty
} = Ember;

export default Base.extend({
  buildOptions(options, defaultOptions) {
    if(typeof options === 'boolean') {
      options = {
        presence: options
      };
    }
    return this._super(options, defaultOptions);
  },

  validate(value, options) {
    if (options.presence === true && !this._isPresent(value)) {
      return this.createErrorMessage('blank', value, options);
    }

    if(options.presence === false && this._isPresent(value)) {
      return this.createErrorMessage('present', value, options);
    }

    return true;
  },

  /**
   * Handle presence of ember proxy based instances
   */
  _isPresent(value) {
    if(Ember.ObjectProxy.detectInstance(value) || Ember.ArrayProxy.detectInstance(value)) {
        return this._isPresent(get(value, 'content'));
    }
    return !isEmpty(value);
  }
});
