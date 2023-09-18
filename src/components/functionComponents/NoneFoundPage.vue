<script setup>

import router from "@/router/router.js";
</script>

<template>



  <h3>
  沒有找到任何相關結果
  </h3>
  <a @click=$router.back()>
    <h3 style="color: blue; text-decoration: underline; cursor: pointer;">
      返回上一頁
    </h3>
  </a>



</template>

<style scoped>

</style>