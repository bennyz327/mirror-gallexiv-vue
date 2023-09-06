<script setup>
import {ref, computed, onMounted, reactive} from 'vue';
import axios from 'axios';
import Navbar from "../components/Navbar.vue";
import TagFunction from "../components/functionComponents/TagFunction.vue";
import UserHomePage from "@/components/PostPictureView.vue";
import {useUserStore} from "@/store/userStore.js";
const {isLogin,token,name} = useUserStore()

let decodeName = eval("'"+name+"'")
import PostPictureView from "@/components/PostPictureView.vue";

import TagFunctionTest from "@/components/functionComponents/TagFunctionTest.vue";

// const json = ref(jsonFile)
const json = ref([])

// HomePage 假資料
// const imgDataImportHomePage = ref(imgJsonFile);
const URL =  import.meta.env.VITE_API_Post
const PostDetail = reactive({});

const loadAllPost = async () => {
  try{
    const response = await axios.get(URL)
    console.log(response.data.data)
    PostDetail.value = response.data.data;

    PostDetail.value.forEach((item) => {
      // console.log(imgUrlList.value)
      console.log("進迴圈"+item)
      loadblobUrl(item);
    });

  }catch (error){
    console.error('加载本地 JSON 文件失败：', error);
  }
};

loadAllPost();

// 圖片功能

//拿出使用者狀態


onMounted(() => {
  console.log(useUserStore())
})

//GPT

const loadblobUrl = async (item) => {
  if (!item || !item.picturesByPostId || item.picturesByPostId.length === 0) {
    return;
  }

  const a = item.picturesByPostId[0].pictureId;
  const src = 'http://localhost:8080/test/p/' + a;
  try {
    const blob = await load(src);
    item.blobUrl = window.URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to load image:', error);
  }
};

// 定义加载函数
const load = async (src) => {
  const config = { url: src, method: 'get', responseType: 'blob' };
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

    <div v-if="isLogin">
      已登入
    </div>
    <div>
      {{ decodeName }}
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

    <PostPictureView :imgUrlList="PostDetail"></PostPictureView>

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