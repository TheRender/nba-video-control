module.exports = function(req, res, next) {
  State.find().limit(1).exec(function(err, state) {
    if (err || state == undefined) {
      console.log("There was an error no states found.");
      console.log("Error = " + err);
      StateService.createState(function(err, state) {
        if (err || state == undefined) {
          console.log("There was an error creating the state.");
          console.log("Error = " + err);
          next();
        } else {
          next();
        }
      });
    } else if (state.length == 0) {
      StateService.createState(function(err, state) {
        if (err || state == undefined) {
          console.log("There was an error creating the state.");
          console.log("Error = " + err);
          next();
        } else {
          next();
        }
      });
    } else {
      next();
    }
  });
};
