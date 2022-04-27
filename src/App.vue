<template>
  <navbar></navbar>
  <login></login>
</template>

<script>
import Login from './views/login.vue'
import Navbar from './views/navbar.vue'

export default {
  name: 'App',
  components: {
    Login,
    Navbar,
  }
}
</script>


