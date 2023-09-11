<script setup>
import {onMounted} from "vue";
import Navbar from "@/components/Navbar.vue";
import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';


function loadLibrary(libraryPath) {
  let newScript = document.createElement('script')
  newScript.setAttribute('src', libraryPath)
  document.head.appendChild(newScript)
}
onMounted(() => {
  loadLibrary("/src/assets/js/uploadSinglePicture");
});


</script>

<template>

<Navbar></Navbar>

  <div class="upload-box">
    <input type="file" accept="image/png,image/jpeg,image/jpg" class="upload-input"/>
    <div class="upload-action"></div>
    <div class="preview-box" style="object-fit: cover"></div>
  </div>
</template>

<style scoped>

.upload-box {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 50px auto;
  overflow: hidden;
  border: 1px dashed #ccc;
  text-align: center;
  &::after {
    display: inline-block;
    margin-top: -8px;
    content: "+";
    line-height: 200px;
    font-size: 90px;
    color: #ccc;
  }

  .preview-box img{
    object-fit: contain;
  }

  [type="file"] {
    display: none;
  }

  .upload-action {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .preview-box {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      min-width: 100%;
      width: 100%;
      min-height: 100%;
    }
  }
}

.hide {
  display: none;
}

</style>