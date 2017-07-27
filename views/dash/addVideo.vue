<template>
<div>
  <Navbar v-bind:user="user"></Navbar>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1>Add Video </h1>
        <form>
          <div class="form-group">
            <label for="playerName">Player Name</label>
            <input class="form-control" id="playerName" type="text" v-model="playerName" placeholder="Lebron James" />
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
            <label for="links">Links</label>
            <textarea class="form-control" rows="5" id="links" v-model="links"></textarea>
          </div>
          <button class="btn btn-success"><i class="fa fa-plus"></i> Add Video to Queue</button>
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
    }
  },
  methods: {
    addVideo: function() {
      var d = {

      }
    },
    getVideoInfo: function() {

    }
  }
};
</script>
