<template>
  <ol class="breadcrumb">
    <li v-for="(item, index) in crumbs" v-bind:class="{ active: isLast(item) }">
      <a v-if="!isLast(item)":href="item.href">{{ item.description }}</a>
      <span v-if="isLast(item)">{{ item.description}}</span>
    </li>
  </ol>
</template>


<script>
export default {
    props: [ 'crumbs' ],
    data() {
      return {}
    },
    methods: {
      isLast: function(item) {
        return this.crumbs.indexOf(item) == this.crumbs.length - 1;
      }
    }
}
</script>
