/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var metaHead = [
  // Style
  {
    style: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css',
    rel: 'stylesheet'
  },
  {
    style: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
    rel: 'stylesheet'
  },
  // Scripts
  {
    script: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'
  },
  {
    script: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
  },
];

module.exports = {

  login: function(req, res) {
    if (req.user != undefined) {
      res.redirect('/videos');
    } else {
      res.render('landing/login', {
        data: {},
        vue: {
          head: {
            title: "Login | The Render Sports",
            meta: metaHead
          }
        }
      });
    }
  },

  signup: function(req, res) {
    if (req.user != undefined) {
      res.redirect('/videos');
    } else {
      res.render('landing/signup', {
        data: {},
        vue: {
          head: {
            title: "Signup | The Render Sports",
            meta: metaHead
          }
        }
      });
    }
  },

};
