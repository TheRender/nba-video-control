
<template>
  <tr>
    <td>
      {{ title }}
    </td>
    <td>
      {{ status }}
    </td>
    <td>
      {{ description }}
    </td>
  </tr>
</template>


<script>
export default {
    props: [ 'title', 'status', 'description'],
    data() {
      return {}
    },
    methods: {
    }
}
</script>
