<template>
  <v-app>
    <navbar></navbar>
    <div class="content">
    </div>
  </v-app>
</template>

<script>
import Navbar from './components/user/ui/navigation/NavBar'
export default {
  components: {
    "navbar": Navbar
  }
};
</script>

<style scoped>
  .content{
    height: 1000px;
  }

</style>
