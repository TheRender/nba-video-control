module.exports = {

  unlock: function(cb) {
    State.find({
      limit: 1
    }).exec(function(err, state) {
      if (err || state == undefined) {
        console.log("There was an error getting the state.");
        console.log("Error = " + err);
        cb(err, undefined);
      } else {
        state.locked = false;
        state.save(function(err) {
          if (err) {
            console.log("There was an error saving the state.");
            console.log("Error = " + err);
            cb(err, undefined);
          } else {
            cb(undefined, state);
          }
        });
      }
    });
  },

  lock: function(cb) {
    State.find({
      limit: 1
    }).exec(function(err, state) {
      if (err || state == undefined) {
        console.log("There was an error getting the state.");
        console.log("Error = " + err);
        cb(err, undefined);
      } else {
        state.locked = true;
        state.save(function(err) {
          if (err) {
            console.log("There was an error saving the state.");
            console.log("Error = " + err);
            cb(err, undefined);
          } else {
            cb(undefined, state);
          }
        });
      }
    });
  },

  getState: function(cb) {
    State.find({
      limit: 1
    }).exec(function(err, state) {
      if (err || state == undefined) {
        console.log("There was an error finding the state.");
        console.log("Error = " + err);
        cb(err, undefined);
      } else {
        cb(undefined, state[0]);
      }
    });
  }
}
