/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  new: function(req, res) {
    User.findOne({
      id: req.user.id
    }).populateAll().exec(function(err, user) {
      if (err || user == undefined) {
        console.log("There was an error finding the user.");
        console.log("Error = " + error);
        res.serverError();
      } else {
        var post = req.body;
        var obj = {
          title: post.title,
          status: "Queued",
          player: post.player,
          description: post.description,
          urls: post.urls,
          machine: "Not assigned",
          user: user.fullName
        };
        async.series([
          function(callback) {
            Video.create(obj).exec(function(err, video) {
              if (err || video == undefined) {
                console.log("There was an error creating the video.");
                console.log("Error = " + err);
                res.serverError();
              } else {
                callback();
              }
            })
          },
          function(callback) {
            Video.find({}).exec(function(err, videos) {
              if (err || videos == undefined) {
                console.log("There was an error finding the videos.");
                console.log("Error = " + err);
                res.serverError();
              } else {
                sails.sockets.blast('videos', videos);
                callback();
              }
            });
          },
        ], function(callback) {
          res.send({
            success: true
          });
        });
      }
    });
  },

  edit: function(req, res) {
    var post = req.body;
    Video.update({
      id: post.id
    }, post).exec(function(err, updated) {
      if (err || updated == undefined) {
        console.log("There was an error editing the video.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        console.log(post.id);
        console.log("UPDATED");
        console.log(updated[0]);
        sails.sockets.blast(updated[0].id, updated[0]);
        res.send({
          success: true
        });
      }
    });
  },

  delete: function(req, res) {
    var post = req.body;
    Video.destroy({
      id: post.videoID
    }).exec(function(err) {
      if (err) {
        console.log("There was an error destroying the video.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  readyQueue: function(req, res) {
    Video.find({
      status: "Queued"
    }).exec(function(err, videos) {
      if (err || videos == undefined) {
        console.log("There was an error finding the queued videos.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        res.send({
          videos: videos
        });
      }
    });
  },

  returnState: function(req, res) {
    StateService.getState(function(err, state) {
      if (err || state == undefined) {
        console.log("There was an error finding the state.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        res.send({
          state: state
        });
      }
    });
  },

  getLatest: function(req, res) {
    var state;
    var video;
    async.series([
        function(callback) {
          StateService.getState(function(err, states) {
            if (err || states == undefined) {
              console.log("There was an error finding the state.");
              console.log("Error = " + err);
              res.serverError();
            } else {
              state = states;
            }
          });
        },
        function(callback) {
          if (state.locked == true) {
            res.send({
              locked: state.locked
            });
          } else {
            callback();
          }
        },
        function(callback) {
          Video.find({
            where: {
              status: "queued"
            },
            limit: 1,
            sort: {
              createdAt: -1
            }
          }).exec(function(err, videos) {
            if (err || videos == undefined) {
              console.log("There was an error finding the videos.");
              console.log("Error = " + err);
              res.serverError();
            } else {
              video = videos[0];
              callback();
            }
          });
        }
      ],
      function(callback) {
        res.send({
          video: video
        });
      });
  },

  subToAllVids: function(req, res) {
    sails.sockets.join(req, 'videos', function(err) {
      if (err) {
        res.send({
          error: true
        });
      } else {
        res.send({
          success: true
        });
      }
    });
  },

  subscribeToVideos: function(req, res) {
    Video.find({}).exec(function(err, videos) {
      if (err || videos == undefined) {
        console.log("There was an error finding the videos.");
        console.log("Error = " + err);
        res.serverError();
      } else {
        async.each(videos, function(video, callback) {
          sails.sockets.join(req, video.id, function(err) {
            if (err) {
              console.log("There was an error subscribing to the monitor.");
              console.log("Error = " + err);
              res.serverError();
            } else {
              callback();
            }
          });
        }, function(err) {
          if (err) {
            console.log("There was an error finishing the async.");
            console.log("Error = " + err);
            res.serverError();
          } else {
            res.send({
              success: true
            });
          }
        });
      }
    });
  },
};
