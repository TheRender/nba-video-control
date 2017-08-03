<template>
<div>
  <Navbar v-bind:user="user"></Navbar>
  <div class="container">
    <Breadcrumb v-bind:crumbs="crumbData"></Breadcrumb>
    <div class="row">
      <div class="col-lg-12">
        <h1>Add Video </h1>
        <form>
          <div class="form-group">
            <label for="playerName">Player Name</label>
            <input class="form-control" id="playerName" type="text" v-model="playerName" placeholder="Lebron James" />
          </div>
          <div class="form-group">
            <label for="playerID">Player ID</label>
            <input class="form-control" id="playerID" type="text" v-model="playerID" :value="playerID"/>
          </div>
          <div class="form-group">
            <label for="date">Game Date</label>
            <input id="date" type="date" class="form-control" v-model="date">
          </div>
          <div class="form-group">
            <label for="title">Title</label>
            <input class="form-control" id="title" type="text" v-model="title" />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" rows="5" id="description" v-model="description"></textarea>
          </div>
          <div class="form-group">
            <label for="tags">Tags</label>
            <textarea class="form-control" rows="5" id="tags" v-model="tags"></textarea>
          </div>
          <div class="form-group">
            <label for="links">Links</label>
            <textarea class="form-control" rows="5" id="links" v-model="links"></textarea>
          </div>
          <a @click="addVideo()" class="btn btn-success"><i class="fa fa-plus"></i> Add Video to Queue</a>
        </form>
      </div>
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
      playerID: "",
      date: "",
    }
  },
  methods: {
    addVideo: function() {
      var d = {
        title: this.title,
        urls: this.splitLinks,
        description: this.description,
        tags: this.tags,
        player: this.playerName,
        playerID: this.playerID
      };
      $.ajax({
        type: 'POST',
        url: '/video/new',
        data: d,
        success: function(data) {
          if (data.success == true) {
            window.location.href = "/videos";
          } else {
            alert("There was an error creating the video");
          }
        }
      });
    },
    getVideoInfo: function(playerID) {
      var obj = this;
      $.ajax({
        type: 'GET',
        url: 'https://nba-api.therendersports.com/videos/information/' + playerID,
        success: function(data) {
          var video = data.video;
          obj.title = video.title;
          obj.description = video.description;
          obj.tags = video.tags;
          console.log(data);
        }
      });
    },
    getNameInfo: function(name) {
      var obj = this;
      $.ajax({
        type: 'POST',
        url: 'https://nba-api.therendersports.com/player/findFromname',
        data: { name: name },
        success: function(data) {
          if (data.player != undefined) {
            console.log("Got name info");
            obj.playerID = data.player.id
            obj.playerName = name;
            obj.getVideoInfo(obj.playerID);
          }
        }
      });
    },

  },
  computed: {
    splitLinks: function() {
      return this.links.split(",");
    },
    crumbData: function() {
      return [
        { href: "/videos", description: "Videos"},
        { href: "/videos/addVideo", description: "Add Video"},
      ]
    }
  },
  mounted: function() {
    var obj = this;
    $("#playerName").autoComplete({
      delay: 0,
      source: function(term, response) {
        $.ajax({
          type: 'POST',
          url: 'https://nba-api.therendersports.com/player/playerSearch',
          data: {searchTerm: term},
          success: function(data) {
            console.log(data.results);
            obj.playerID = "";
            response(data.results)
          }
        });
      },
      onSelect: function(event, term, item) {
        console.log(item[0].innerText);
        obj.playerName = item[0].innerText;
        obj.getNameInfo(item[0].innerText);
      }
    });
  },
};
</script>
