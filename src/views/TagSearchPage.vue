<script setup>
import {ref, computed, onMounted, reactive} from 'vue';
import {useRoute} from "vue-router";
import {useUserStore} from "@/store/userStore.js";
const {isLogin, token, name} = useUserStore()
import axios from 'axios';

import Navbar from "../components/Navbar.vue";
import PostPictureView from "@/components/PostPictureView.vue";
import NoneFoundPage from "@/components/functionComponents/NoneFoundPage.vue";

let decodeName = eval("'" + name + "'")

// import jsonFile from "../assets/tag.json"
// import imgJsonFile from "../assets/imgList.json"
// const json = ref(jsonFile)
// const json = ref([])

// HomePage 假資料
// const imgDataImportHomePage = ref(imgJsonFile);
const URL = import.meta.env.VITE_API_Post
const PostDetail = reactive({});

const loadAllPost = async () => {
  try {
    const response = await axios.get(URL)
    console.log(response.data.data)
    PostDetail.value = response.data.data;

    PostDetail.value.forEach((item) => {
      // console.log(imgUrlList.value)
      console.log("進迴圈" + item)
      loadblobUrl(item);
    });

  } catch (error) {
    console.error('加载本地 JSON 文件失败：', error);
  }
};

loadAllPost();

// 圖片功能

//拿出使用者狀態

// 取到的postTitle
const route = useRoute();
const tagName = route.params.tagName;

onMounted(() => {
  console.log(useUserStore())
})

//GPT

const loadblobUrl = async (item) => {
  if (!item || !item.picturesByPostId || item.picturesByPostId.length === 0) {
    return;
  }
  const IMGURL = import.meta.env.VITE_API_PICTURE
  const a = item.picturesByPostId[0].pictureId;
  try {
    const blob = await load(`${IMGURL}/test/${a}`);
    item.blobUrl = window.URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to load image:', error);
  }
};

// 定义加载函数
const load = async (src) => {
  const config = {url: src, method: 'get', responseType: 'blob'};
  const response = await axios.request(config);
  return response.data; // the blob
};

// 为每个项目调用loadblobUrl
//   console.log("hook")
//   console.log(imgUrlList)
//   console.log(imgUrlList.value)
//   if ( imgUrlList.value && Array.isArray(imgUrlList.value)) {
//     imgUrlList.value.forEach((item) => {
//       console.log(imgUrlList.value)
//       console.log("進迴圈"+item)
//       loadblobUrl(item);
//     });
//   }


//GPT

</script>

<template>

  <Navbar></Navbar>

  <!-- 整個頁面的容器大小 -->

  <div class="container">

    <!-- 呈現搜尋圖片內容 -->

    <!--    <template v-if="data">-->
    <!--    <PostPictureView :imgUrlList="PostDetail"></PostPictureView>-->
    <!--    </template>-->
    <!--    -->
    <!--    <template v-if="!data">-->
    <!--      -->
    <!--    </template>-->

    <template v-if="!searchData">
    <div class="none-found-block">
      <div class="none-found-center">
        <NoneFoundPage></NoneFoundPage>
      </div>
    </div>
    </template>

    <template v-if="searchData">
      <PostPictureView :imgUrlList="PostDetail"></PostPictureView>
    </template>

  </div>

</template>

<style scoped>

.none-found-block{
  width: 100%;
}

.none-found-center{
  text-align: center;
}


</style>