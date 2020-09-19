<template>
  <div>
    <form v-if="!submitted">
          <div class="form-group">
            <label>First Name</label>
            <input type="text" class="form-control" v-model="user.firstname" />
          </div>
          <div class="form-group">
            <label>Last Name</label>
            <input type="text" class="form-control" v-model="user.lastname" />
          </div>
          <div class="form-group">
            <label>Mail</label>
            <input type="text" class="form-control" v-model="user.email" />
          </div>
          <app-address v-model="user.address"></app-address>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="user.password" />
          </div>
          <div class="form-group">
            <label>
              <input type="radio" value="Yes" v-model="user.storeData" /> Yes
            </label>
            <label>
              <input type="radio" value="No" v-model="user.storeData" /> No
            </label>
          </div>

          <button type="submit" @click.prevent="submit()" class="btn btn-primary">Submit the Form</button>
    </form>
    <div class="row" v-if="submitted">
      <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h4>Summery of your Data</h4>
          </div>
          <div class="panel-body">
           The summery of your personal data as you entered in the previous form will display here for furthur reference.
          </div>
          <ul class="list-group">
               <li class="list-group-item">First Name: {{ user.firstname }}</li>
            <li class="list-group-item">Last Name: {{ user.lastname }}</li>
            <li class="list-group-item">Mail: {{ user.email }}</li>
            <li class="list-group-item">Mail: {{ user.address }}</li>
            <li class="list-group-item">paassword: {{ user.password }}</li>
            <li class="list-group-item">Store in Database?: {{ user.storeData }}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <display-chart></display-chart> -->
  </div>
</template>
<script>

import Address from "./Address.vue";
// import DisplayChart from "./DisplayChart";

export default {
  components: {
    appAddress: Address,
    // DisplayChart: DisplayChart
  },
  data() {
    return {
      user: {
        firstname: "sandakelum",
        lastname: "adikaram",
        email: "sandy@gmail.com",
        address: "10, olivetree rd, lilydale",
        password: "yourownpassword",
        storeData: "Yes"
      },
      submitted: false
    };
  },
  methods: {
    submit() {
      this.submitted = true;
      this.$http
        .post("https://vuedemo-b8297.firebaseio.com/user.json", this.user)
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>