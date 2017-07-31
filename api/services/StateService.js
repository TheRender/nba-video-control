module.exports = {

  getState: function(cb) {
    State.find().limit(1).exec(function(err, state) {
      if (err || state == undefined) {
        console.log("There was an error finding the state.");
        console.log("Error = " + err);
        cb(err, undefined);
      } else {
        cb(null, state[0]);
      }
    });
  },

  toggle: function(cb) {
    StateService.getState(function(err, state) {
      if (err || state == undefined) {
        console.log("There was an error finding the state.");
        console.log("Error = " + err);
        cb(err, undefined);
      } else {
        // Toggle boolean
        state.locked = !state.locked;
        state.save(function(err) {
          if (err) {
            console.log("There was an error saving the state.");
            console.log("Error = " + err);
            cb(err, undefined);
          } else {
            cb(null, state);
          }
        });
      }
    });
  },

  createState: function(cb) {
    State.create({
      locked: false
    }).exec(function(err, state) {
      if (err || state == undefined) {
        console.log("There was an error creating the state.");
        console.log("Error = " + err);
        cb(err, undefined);
      } else {
        cb(null, state);
      }
    });
  }
}
