<template>
  <div>
    <h1>Signup</h1>
    <input type="text" v-model="firstName" />
    <br />
    <input type="text" v-model="lastName" />
    <br />
    <input type="email" v-model="email" />
    <br />
    <input type="password" v-model="password" />
    <br />
    <input type="password" v-model="signupkey" />
    <br />
    <button @click="processLogin()">Login</button>
  </div>
</template>

<script>

import axios from 'axios';

module.exports = {
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      signupkey: ""
    }
  },
  methods: {
    processLogin: function() {
      var d = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        signupkey: this.signupkey
      };
      axios.post('/signup', d)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(err) {
        console.log(err);
      });
    },
  }
};
</script>
