<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Cursos</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-on:click="nuevo()">Add Cursos</button>
        <br><br>
        <table class="table table-hover">

          <thead class="nav">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Period</th>
              <th scope="col">State</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, index) in list" :key="index">
              <td>{{ d.ID }}</td>
              <td>{{ d.name }} - {{ d.ID }}</td>
              <td>{{ d.period }}</td>
              <td>{{ d.state }}</td>
              
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          @click="editar(d.ID)">
                      Update
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDelete(d)">
                      Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>



<script>

import client from "../api";

export default {
  name: 'Cursos',
  data: function() {
    return{
      list: [],
      message: '',
      showMessage: false,
    }
  },
  methods: {
    editar: function (id){
      this.$router.push('/cursos/new/' + id);
    },
    nuevo: function () {
      this.$router.push('/cursos/new');
    },
    getStudents: function() {
      client.get("/cu/cursos").then((res) => {
          this.list = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onDelete: function (d) {
      var r = confirm("Eliminar ?");
      if (r == true) {
        this.delete(d.ID);
      }
    },
    delete: function (id) {
      client
        .delete(`/cu/cursos/${id}`)
        .then(() => {
          this.getStudents();
          this.message = "Cursos removed!";
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
          this.getStudents();
        });
    },
  },
  created: function () {
    this.message = this.$route.query.msg;
    //console.log(this.message);
    if (typeof(this.message) !=='undefined') {// || this.message !== null
      this.showMessage = true;
     // this.makeToast("Hecho", this.message, "success");
    }
    this.getStudents();
  },
}
</script>


<style>

</style>