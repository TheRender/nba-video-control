<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1>Login</h1>
        <form>
          <div class="form-group">
            <label for="email">Email Address</label>
            <input class="form-control" id="email" type="email" v-model="email" placeholder="example@example.com" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" v-model="password" placeholder="********"/>
          </div>
          <button class="btn btn-success" @click="processLogin()">Login</button>
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
      password: ""
    }
  },
  methods: {
    processLogin: function() {
      var d = {
        username: this.email,
        password: this.password
      };

      $.ajax({
        type: 'POST',
        url: '/login',
        data: d,
        success: function(data) {
          if (data.success == true) {
            console.log("SUCCESS");
            window.location = "/videos";
          } else {
            alert("Error");
          }
        }
      });
    }
  }
};
</script>
