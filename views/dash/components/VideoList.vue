<template>
<div class="row">
  <div class="col-lg-4">
    <p>
      {{ title }}
    </p>
  </div>
  <div class="col-lg-4">
    <p>
      {{ status }}
    </p>
  </div>
  <div class="col-lg-4">
    <p>
      {{ player }}
    </p>
  </div>
</div>
<hr />
</template>


<script>
export default {
    props: [ 'title', 'status', 'player'],
    data() {
      return {}
    },
    methods: {
    }
}
</script>
