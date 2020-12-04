<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Cursos Form</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-on:click="back()">Cancel</button>
        <br><br>
        ID={{ f.ID }}
        <!--<b-form @submit="onSubmit" @reset="onReset" class="w-100">-->
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-name-group"
                      label="Name:"
                      label-for="form-name-input">
            <b-form-input id="form-name-input"
                          type="text"
                          v-model="f.name"
                          required
                          placeholder="Enter name">
            </b-form-input>
          </b-form-group>

          <b-form-group id="form-period-group"
                        label="period:"
                        label-for="form-period-input">
              <b-form-input id="form-period-input"
                            type="text"
                            v-model="f.period"
                            required
                            placeholder="Enter period">
              </b-form-input>
          </b-form-group>
          <b-form-group id="form-state-group"
                        label="State:"
                        label-for="form-state-input">
              <b-form-input id="form-state-input"
                            type="text"
                            v-model="f.state"
                            required
                            placeholder="Enter state">
              </b-form-input>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-button-group>
        </b-form>
      </div>
    </div>
  </div>
</template>

<style>
.container{
 background: #45965A; 
}
.col-sm-10{
  background:#57BD70;
  left: 8%;
}

</style>

<script>
import client from "../api";

export default {
  name: 'Cursos',
  data: function() {
    return{
      list: [],
      message: '',
      showMessage: false,
      f: {
        "ID": "",
        "name": "",
        "period": "",
        "state": "",
      }
    }
  },
  methods: {

    back: function (){
    this.$router.push("/cursos")
    },

 create: function (payload) {
      client
        .post("/cu/cursos", payload)
        .then(() => {
          console.log(payload);
          this.$router.push("/cursos")

          this.message = 'Cursos added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    initForm: function() {
      this.f.name = "";
      this.f.period = "";
      this.f.state = "";
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      const payload = {
        name: this.f.name,
        period: this.f.period,
        state: this.f.state,
      };
      if (this.f.ID > 0){
        this.updateStudent(payload, this.f.ID)
      } else {
        this.create(payload)
      }
      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
      
    },
    getStudentId: function(id) {
      client
        .get(`/cu/cursos/${id}`)
        .then((res) => {
          this.f = res.data;
        })
        .catch((error) => {
          //this.message = error;
          //this.showMessage = true;
          console.error(error);
        });
    },
 updateStudent: function (payload, id) {
      client
        .put(`/cu/cursos/${id}`, payload)
        .then(() => {
          console.log(payload);
          this.$router.push("/cursos")
          this.message = 'Cursos updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          //this.message = error;
          //this.showMessage = true;
          console.error(error);
        });
    },
  },
  created: function(){
  this.f.ID = this.$route.params.id;
    if (this.f.ID>0){
      this.getStudentId(this.f.ID)
      //this.getBooks();
    }
  }, 
}
</script>
