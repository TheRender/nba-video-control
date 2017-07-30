/**
 * @file        :: api/policies/isAuthenticated.js
 * @author      :: Steven Hanna
 * @description :: This file handles what is and is not considered and authenticated requrest
 **/

module.exports = function(req, res, next) {
  console.log(req.session);
  console.log(req.user);
  console.log(req.passport);
  console.log(req.isAuthenticated());
  if (req.isSocket) {
    return next();
  } else if (req.session == undefined || (req.user == undefined && req.passport == undefined)) {
    return res.redirect('/login');
  } else if (req.session.authenticated || req.user || req.isAuthenticated()) {
    return next();
  } else {
    console.log("There is a bit of a situation here...");
    return res.redirect('/login');
  }
}
