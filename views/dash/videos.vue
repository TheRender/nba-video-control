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
                  Title
                </th>
                <th>
                  Status
                </th>
                <th>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <videolisting
                v-for="video in videos"
                v-bind:title="video.title"
                v-bind:description="video.description"
                v-bind:status="video.status"
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
    hasVideos: function() {
      if (this.videos != undefined && this.videos.length > 0) {
        console.log(this.videos.length);
        return true;
      } else {
        return false;
      }
    }
  },
  mounted: function() {
    var obj = this;
    io.socket.on('connect', function socketConnected() {
      console.log("connected");
      io.socket.get('/socket/watch/videos', function(data, jwers) {
        console.log("subbed");
      });
      io.socket.get('/socket/watch/allVideos', function(data, jwers) {
        console.log("subbed");
      });
      io.socket.on('videos', function(msg) {
        console.log(msg);
        obj.videos = msg;
      });
    });
  }
};
</script>
