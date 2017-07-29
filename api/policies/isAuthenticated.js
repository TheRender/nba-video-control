module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy
  // or if this is the last policy, the controller
  if (req.isSocket) {
    return next();
  } else if (req.session != undefined && req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/login');
  }
}
