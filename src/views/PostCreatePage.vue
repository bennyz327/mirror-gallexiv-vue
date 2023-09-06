<script setup>
import Navbar from "@/components/Navbar.vue";
import PostCreateForm from "@/components/postCreatePage/PostCreateForm.vue";

// 避免上傳工具 載入不完全
window.addEventListener('load', function() {
  setTimeout(function() {
  }, 3000);
});


</script>

<template>

  <Navbar></Navbar>

  <div class="container">
    <div class="text-div">
      <h3>新增文章</h3>
    </div>
    <div class="create-form-block">
      <PostCreateForm></PostCreateForm>
    </div>
  </div>


</template>

<style scoped>

.create-form-block {
  width: 100%;

}

</style>