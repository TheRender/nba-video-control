/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {

    firstName: 'string',

    lastName: 'string',

    fullName: 'string',

    username: {
      type: 'email',
      unique: true
    },

    password: {
      type: 'string'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },

  },

  // Encrypt password before object is created
  beforeCreate: function(user, cb) {
    console.log("BEFORE CREATE");
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function() {}, function(err, hash) {
        if (err) {
          console.log(err);
        } else {
          user.password = hash;
          cb(null, user);
        }
      });
    });
  }
};
