<template>
  <div>
    <h1>Login</h1>
    <input type="email" v-model="email" />
    <input type="password" v-model="password" />
    <button @click="processLogin()">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    processLogin: function() {
      console.log(this.email)
      console.log(this.password);
      var elem = {
        email: this.email,
        password: this.password
      }
      console.log(elem);
    }
  }
};
</script>
