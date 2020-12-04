<template>
<div class="app">
    <p>
    <!-- use router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
    <router-link to="/">home</router-link>
    <router-link to="/cursos">Go to Courses</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/logout">Salir</router-link>
  </p>
    <router-view/>
  </div>
</template>

<script>

</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
