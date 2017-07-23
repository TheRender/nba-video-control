/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  login: function(req, res) {
    if (req.user != undefined) {
      res.redirect('/videos');
    } else {
      res.render('login');
    }
  },

  signup: function(req, res) {
    if (req.user != undefined) {
      res.redirect('/videos');
    } else {
      res.render('signup');
    }
  },

};
