<template>
<div>
  <Navbar v-bind:user="user"></Navbar>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1>Videos <a href="/addVideo" class="btn btn-success pull-right"><i class="fa fa-plus"></i> Add Video</a></h1>
        <div v-if="hasVideos">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>
                  Player Name
                </th>
                <th>
                  Status
                </th>
                <th>
                  Machine
                </th>
                <th>
                  Creator
                </th>
                <th>
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              <videolisting
                v-for="video in removeFinished"
                v-bind:initialstatus="video.status"
                v-bind:initialplayer="video.player"
                v-bind:initialmachine="video.machine"
                v-bind:initialid="video.id"
                v-bind:initialuser="video.user"
                :key="video.id"
              ></videolisting>
            </tbody>
          </table>
        </div>
        <div v-else>
          <center>
            <br />
            <h1>No Videos</h1>
            <a href="/addVideo" class="btn btn-success"> <i class="fa fa-plus"></i> Add Video</a>
          </center>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    removeFinished: function() {
      return this.videos.filter(function(elem) {
        return elem.status != "Finished"
      });
    },
    hasVideos: function() {
      if (this.removeFinished != undefined && this.removeFinished.length > 0) {
        console.log(this.removeFinished.length);
        return true;
      } else {
        return false;
      }
    },
  },
  mounted: function() {
    var obj = this;
    io.socket.on('connect', function socketConnected() {
      console.log("connected");
      io.socket.get('/socket/watch/videos', function(data, jwers) {
      });
      io.socket.get('/socket/watch/allVideos', function(data, jwers) {
      });
      io.socket.on('videos', function(msg) {
        obj.videos = msg;
      });
    });
  }
};
</script>
