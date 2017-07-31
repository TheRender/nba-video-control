<template>
<div>
  <Navbar v-bind:user="user"></Navbar>
  <div class="container">
    <Breadcrumb v-bind:crumbs="crumbData"></Breadcrumb>
    <div class="row">
      <div class="col-lg-12">
        <h1>{{ playerName }} <button v-if="isQueued" @click="deleteVideo()" class="btn btn-danger pull-right">Delete Video</button></h1>
        <h2>{{ title }}</h2>
        <h3><span v-bind:class="color">{{ status }}</span> - {{ machine }}</h3>
        <p>
          {{ description }}
        </p>
        <br />
        <h3>Links</h3>
        <ol>
          <li v-for="link in links">
            {{ link }}
          </li>
        </ol>
        <h3>Tags</h3>
        <p>
          {{ tags }}
        </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      playerName: "",
      links: "",
      title: "",
      description: "",
      tags: "",
      date: "",
      videoID: "",
      status: "",
      machine: ""
    }
  },
  methods: {
    deleteVideo: function() {
      var obj = this;
      var d = {
        videoID: obj.videoID
      };
      $.ajax({
        type: 'POST',
        url: '/video/delete',
        data: d,
        success: function(data) {
          if (data.success == true) {
            window.location.href = "/videos"
          } else {
            alert("Error deleting the video");
          }
        }
      });
    }
  },
  computed: {
    splitLinks: function() {
      return this.links.split(",");
    },
    color: function() {
      return {
        'text-success': this.status == "Finished",
        'text-danger': this.status.toLowerCase().includes('error'),
        'text-warning': this.status == "Queued",
        'text-info': this.status == "Uploading"
      }
    },
    isQueued: function() {
      return this.status == "Queued";
    },
    crumbData: function() {
      return [
        { href: "/videos", description: "Videos"},
        { href: "/videos/view/" + this.videoID, description: this.title},
      ]
    }
  },
  mounted: function() {
    this.title = this.video.title;
    this.playerName = this.video.player;
    this.links = this.video.urls;
    this.description = this.video.description;
    this.tags = this.video.tags;
    this.videoID = this.video.id;
    this.status = this.video.status;
    this.machine = this.video.machine;
    var obj = this;
    io.socket.on(obj.videoID, function(msg) {
      obj.status = msg.status;
      obj.machine = msg.machine;
    });
  },

};
</script>
