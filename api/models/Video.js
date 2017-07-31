/**
 * Video.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string'
    },

    status: {
      type: 'string'
    },

    player: {
      type: 'string'
    },

    playerID: {
      type: 'string'
    },

    description: {
      type: 'string'
    },

    tags: {
      type: 'string'
    },

    urls: {
      type: 'array',
      defaultsTo: []
    },

    machine: {
      type: 'string'
    },

    user: {
      type: 'string'
    },
  }
};
