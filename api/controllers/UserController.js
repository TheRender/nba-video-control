/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  videos: function(req, res) {
    User.findOne({
      id: req.user.id
    }).populateAll().exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error finding the user.");
        console.log("Error = " + error);
        res.serverError();
      } else {
        Video.find({
          sort: {
            createdAt: -1
          }
        }).exec(function(err, videos) {
          if (err || videos == undefined) {
            console.log("There was an error finding the videos.");
            console.log("Error = " + err);
            res.serverError();
          } else {
            res.render('videos', {
              user: user,
              currentPage: 'videos',
              videos: videos
            });
          }
        });
      }
    });
  },

  addVideo: function(req, res) {
    User.findOne({
      id: req.user.id
    }).populateAll().exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error finding the user.");
        console.log("Error = " + error);
        res.serverError();
      } else {
        res.render('addVideo', {
          user: user,
          currentPage: 'addVideo'
        });
      }
    });
  },

};
