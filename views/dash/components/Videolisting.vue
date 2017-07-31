
<template>
  <tr v-bind:class="{ warning: isQueued, success: isFinished, info: isUploading, danger: isError}">
    <td>
      {{ player }}
    </td>
    <td>
      {{ status }}
    </td>
    <td>
      {{ machine }}
    </td>
    <td>
      {{ user }}
    </td>
    <td>
      <a :href="viewLink" class="">View</a>
    </td>
  </tr>
</template>


<script>
export default {
    props: [ 'initialstatus', 'initialplayer', 'initialmachine', 'initialid', 'initialuser'],
    data() {
      return {
        status: "",
        player: "",
        machine: "",
        id: "",
        user: ""
      }
    },
    methods: {
    },
    computed: {
      isQueued: function() {
        return (this.status == "Queued");
      },
      isFinished: function() {
        return (this.status == "Finished");
      },
      isUploading: function() {
        return (this.status == "Uploading");
      },
      isError: function() {
        return this.status.toLowerCase().includes('error');
      },
      viewLink: function() {
        return "/videos/view/" + this.id;
      }
    },
    mounted: function() {
      this.status = this.initialstatus;
      this.machine = this.initialmachine;
      this.player = this.initialplayer;
      this.id = this.initialid;
      this.user = this.initialuser;
      var obj = this;
      io.socket.on(obj.id, function(msg) {
        obj.status = msg.status;
        obj.machine = msg.machine;
        obj.player = msg.player;
      });
    }
}
</script>
