<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1>Signup</h1>
          <form>
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input class="form-control" id="firstName" type="text" v-model="firstName" placeholder="John" />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input class="form-control" id="lastName" type="text" v-model="lastName" placeholder="Smith" />
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input class="form-control" id="email" type="email" v-model="email" placeholder="example@example.com" />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" class="form-control" type="password" v-model="password" placeholder="********"/>
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" class="form-control" type="password" v-model="confirmPassword" placeholder="********"/>
            </div>
            <div class="form-group">
              <label for="signupKey">Signup Key</label>
              <input id="signupKey" class="form-control" type="password" v-model="signupkey" placeholder="********"/>
            </div>
            <a href="#" class="btn btn-success" @click="processLogin()">Login</a>
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
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      signupkey: "",
      confirmPassword: ""
    }
  },
  methods: {
    processLogin: function() {
      var d = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        signupKey: this.signupkey
      };
      $.ajax({
        type: 'POST',
        url: '/signup',
        data: d,
        success: function(data) {
          if (data.success == true) {
            window.location = "/videos";
          } else {
            alert("error");
          }
        }
      });
    },
  }
};
</script>
