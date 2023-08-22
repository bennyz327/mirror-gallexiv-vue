<script setup>
import Navbar from "./components/Navbar.vue";

</script>

<template>

  <div v-if="$route.meta.keepNavbar">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>

</template>
