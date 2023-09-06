<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';
import Navbar from "../components/Navbar.vue";
import TagFunction from "../components/functionComponents/TagFunction.vue";
import UserHomePage from "@/components/PostPictureView.vue";

// import jsonFile from "../assets/tag.json"
import imgJsonFile from "../assets/imgList.json"
import TagFunctionTest from "@/components/functionComponents/TagFunctionTest.vue";

// const json = ref(jsonFile)
const json = ref([])

// HomePage 假資料
const imgDataImportHomePage = ref(imgJsonFile);
const URL =  import.meta.env.VITE_API_Post
const postDatas  = ref([])

const loadAllPost = async () => {
  try{
    const response = await axios.get(URL)
    console.log(response.data.data)
    postDatas.value = response.data;

  }catch (error){
    console.error('加载本地 JSON 文件失败：', error);
  }
};

loadAllPost();

// 圖片功能

</script>

<template>

  <Navbar></Navbar>

  <!-- 整個頁面的容器大小 -->

  <div class="container">

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