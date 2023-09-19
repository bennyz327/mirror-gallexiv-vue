<script setup>
import Navbar from "@/components/Navbar.vue";
import {useRoute} from "vue-router";
import {reactive, ref} from "vue";

const route = useRoute();
const planId = ref(route.query.planId || ''); //  接收來自router的值以外要讓他成為ref可以更新資料

// const URL = import.meta.env.VITE_API_Post
const planDetail = reactive({});




</script>

<template>
<Navbar></Navbar>
</template>

<style scoped>

</style>