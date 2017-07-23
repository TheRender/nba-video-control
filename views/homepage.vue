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
      console.log("email: " + this.email);
      console.log("password: " + this.password);
    }
  }
};
</script>
