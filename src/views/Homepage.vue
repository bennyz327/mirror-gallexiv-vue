<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';
import Navbar from "../components/Navbar.vue";
import TagFunction from "../components/functionComponents/TagFunction.vue";
import UserHomePage from "@/components/PostPictureView.vue";
import {useUserStore} from "@/store/userStore.js";
const {isLogin,token} = useUserStore()

import jsonFile from "../assets/tag.json"
import imgJsonFile from "../assets/imgList.json"
import TagFunctionTest from "@/components/functionComponents/TagFunctionTest.vue";

const json = ref(jsonFile)

// HomePage 假資料
const imgDataImportHomePage = ref(imgJsonFile);

// 圖片功能

//拿出使用者狀態


onMounted(() => {
  console.log(useUserStore())
})

</script>

<template>

  <Navbar></Navbar>

  <!-- 整個頁面的容器大小 -->

  <div class="container">

    <div v-if="isLogin">
      {{ useUserStore.name }}
    </div>
    <div>
      {{ isLogin }}
    </div>
    <div>
      {{ token }}
    </div>

    <!-- 熱門Tag的title-->

    <div class="text-center">

      <h3>熱門標籤</h3>

    </div>

    <!-- Tag 區塊 -->

    <div class="tag-div">
      <TagFunction :tagjson="json"></TagFunction>
    </div>

    <!-- 呈現圖片內容 -->

    <UserHomePage :imgUrlList="imgDataImportHomePage"></UserHomePage>

  </div>

</template>

<style scoped>


.text-center {
  background-color: #F8F9FA;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  border-radius: 8px;
}

.tag-div li {
  height: 72px;
  margin: 16px;
}

.control-button button {
  height: 96px;
}

.control-button :hover {
  background-color: #e6e6fa;
}


</style>