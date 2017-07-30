module.exports = function(req, res, next) {
  State.find().exec(function(err, states) {
    if (err || states == undefined) {
      console.log("There was an error no states found.");
      console.log("Error = " + err);
      State.create({
        locked: false
      }).exec(function(err, state) {
        if (err || state == undefined) {
          console.log("There was an error creating the state.");
          console.log("Error = " + err);
        } else {
          next();
        }
      });
    } else {
      next();
    }
  });
};
