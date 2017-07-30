/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  login: function(req, res) {
    var user = req.body;
    passport.authenticate('local', function(err, user, info) {
      if (err || !user) {
        console.log("user = " + user);
        console.log("error = " + err);
        console.log("info = " + info);
        res.send({
          success: false,
          status: 401
        });
      } else if (!err && user) {
        req.logIn(user, function(err) {
          if (err) {
            console.log("There was an error logging in the user.");
            console.log("Error = " + err);
            console.log(user);
            res.serverError();
          } else {
            console.log("successful");
            console.log(user);
            res.send({
              user: user,
              success: true,
              status: 200
            });
          }
        });
      } else {
        console.log("Something happened here...");
        console.log(err);
        console.log(user);
        res.serverError();
      }
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.redirect('/login');
  },

  signup: function(req, res) {
    var post = req.body;
    var userData = {
      username: post.email,
      password: post.password,
      firstName: post.firstName,
      lastName: post.lastName,
      fullName: post.firstName + " " + post.lastName,
    };

    var user;
    async.series([
      function(callback) {
        if ("nba-videos123" == post.signupKey) {
          callback();
        } else {
          res.send({
            success: false,
            message: "Invalid signup key"
          });
        }
      },
      function(callback) {
        User.create(userData).exec(function(err, newUser) {
          if (err || newUser == undefined) {
            console.log("There was an error creating the user.");
            console.log("Error = " + err);
            res.serverError();
          } else {
            user = newUser;
            callback();
          }
        });
      },
    ], function(callback) {
      req.logIn(user, function(err) {
        if (err) {
          console.log(err);
          res.serverError();
        } else {
          res.send({
            success: true,
            user: user
          });
        }
      });
    });
  },

};
