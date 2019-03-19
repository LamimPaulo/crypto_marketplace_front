<template>
  <div id="app">
    <Login/>
  </div>
</template>

<script>
  import Login from './components/auth/Login'

  export default {
    name: 'App',
    components: {
      Login
    }
  }
</script>

<style>
#app{
  min-height: 100vh;
}
</style>
