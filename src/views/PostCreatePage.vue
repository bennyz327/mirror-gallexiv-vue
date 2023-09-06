<script setup>
import Navbar from "@/components/Navbar.vue";
import PictureUploadFunction from "@/components/functionComponents/PictureUploadFunction.vue";
import PostCreateForm from "@/components/postCreatePage/PostCreateForm.vue";


</script>

<template>

  <Navbar></Navbar>

  <div class="container">

    <div class="upload-picture-block">
      <PictureUploadFunction></PictureUploadFunction>
    </div>

    <div class="input-form-block">
      <PostCreateForm></PostCreateForm>
    </div>

  </div>


</template>

<style scoped>
.upload-picture-block {
  width: 100%;

}

.input-form-block {
  width: 100%;

}

</style>