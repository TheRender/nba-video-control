/**
 * UserController
 *
 * @description :: Server-side logic for managing users
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
  {
    script: 'https://cdnjs.cloudflare.com/ajax/libs/vue-strap/1.1.37/vue-strap.min.js'
  },
  {
    script: '/js/moment.js'
  },
  {
    script: '/js/dependencies/sails.io.js'
  },
];

module.exports = {

  viewVideos: function(req, res) {
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
            res.render('dash/videos', {
              data: {
                user: user,
                videos: videos
              },
              vue: {
                head: {
                  title: "Videos | The Render Sports",
                  meta: metaHead
                },
                components: [
                  'views/dash/components/Navbar',
                  'views/dash/components/Videolisting',
                ]
              }
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
        var elem = [{
            style: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
            rel: 'stylesheet'
          },
          {
            script: 'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
          },
        ];
        list = metaHead.concat(elem);
        res.render('dash/addVideo', {
          data: {
            user: user
          },
          vue: {
            head: {
              title: "Add Video | The Render Sports",
              meta: list
            },
            components: [
              'views/dash/components/Navbar',
              'views/dash/components/Breadcrumb'
            ]
          }
        });
      }
    });
  },

  viewSpecificVideo: function(req, res) {
    req.validate({
      videoID: 'string'
    });
    User.findOne({
      id: req.user.id
    }).populateAll().exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error finding the user.");
        console.log("Error = " + error);
        res.serverError();
      } else {
        Video.findOne({
          id: req.param('videoID')
        }).exec(function(err, video) {
          if (err || video == undefined) {
            console.log("There was an error finding the video.");
            console.log("Error = " + err);
            res.serverError();
          } else {
            res.render('dash/viewVideo', {
              data: {
                user: user,
                video: video
              },
              vue: {
                head: {
                  title: "View Video | The Render Sports",
                  meta: metaHead
                },
                components: [
                  'views/dash/components/Navbar',
                  'views/dash/components/Breadcrumb'
                ]
              }
            });
          }
        });
      }
    });
  },

};
