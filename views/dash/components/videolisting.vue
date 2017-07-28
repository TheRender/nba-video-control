
<template>
  <tr v-bind:class="{ warning: isQueued, success: isFinished, info: isUploading, danger: isError}">
    <td>
      {{ title }}
    </td>
    <td>
      {{ player }}
    </td>
    <td>
      {{ status }}
    </td>
    <td>
      {{ description }}
    </td>
    <td>
      {{ machine }}
    </td>
  </tr>
</template>


<script>
export default {
    props: [ 'initialtitle', 'initialstatus', 'initialdescription', 'initialplayer', 'initialmachine', 'initialid'],
    data() {
      return {
        title: "",
        status: "",
        description: "",
        player: "",
        machine: "",
        id: "",
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
      }
    },
    mounted: function() {
      this.title = this.initialtitle;
      this.status = this.initialstatus;
      this.description = this.initialdescription;
      this.machine = this.initialmachine;
      this.player = this.initialplayer;
      this.id = this.initialid;
      var obj = this;
      io.socket.on(obj.id, function(msg) {
        obj.title = msg.title;
        obj.status = msg.status;
        obj.description = msg.description;
        obj.machine = msg.machine;
        obj.player = msg.player;
      });
    }
}
</script>
