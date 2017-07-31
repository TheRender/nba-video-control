/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  'GET /login': {
    controller: 'home',
    action: 'login'
  },

  'GET /signup': {
    controller: 'home',
    action: 'signup'
  },

  'POST /login': {
    controller: 'auth',
    action: 'login'
  },

  'POST /signup': {
    controller: 'auth',
    action: 'signup'
  },

  'GET /logout': {
    controller: 'auth',
    action: 'logout'
  },

  'GET /videos': {
    controller: 'user',
    action: 'viewVideos'
  },

  'GET /videos/view/:videoID': {
    controller: 'user',
    action: 'viewSpecificVideo'
  },

  'POST /video/new': {
    controller: 'video',
    action: 'new'
  },

  'POST /video/edit': {
    controller: 'video',
    action: 'edit'
  },

  'POST /video/delete': {
    controller: 'video',
    action: 'delete'
  },

  'GET /videos/queue': {
    controller: 'video',
    action: 'readyQueue'
  },

  'GET /videos/queue/latest': {
    controller: 'video',
    action: 'getLatest'
  },

  'GET /addVideo': {
    controller: 'user',
    action: 'addVideo'
  },

  'GET /socket/watch/videos': {
    controller: 'video',
    action: 'subscribeToVideos'
  },

  'GET /socket/watch/allVideos': {
    controller: 'video',
    action: 'subToAllVids'
  },



  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

};
