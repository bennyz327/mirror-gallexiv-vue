<script setup>
import {ref, computed, onMounted, reactive, watch} from 'vue';
import {useRoute} from "vue-router";
const {isLogin,token,name} = useUserStore()
import {useUserStore} from "@/store/userStore.js";
import axios from 'axios';

import Navbar from "../components/Navbar.vue";
import TagFunction from "../components/functionComponents/TagFunction.vue";


let decodeName = eval("'"+name+"'")
import PostPictureView from "@/components/PostPictureView.vue";
import NoneFoundPage from "@/components/functionComponents/NoneFoundPage.vue";

// import jsonFile from "../assets/tag.json"
// import imgJsonFile from "../assets/imgList.json"

// const json = ref(jsonFile)
// const json = ref([])

// 取到的postTitle

const route = useRoute();
const postTitle = route.query.postTitle || '';

const URL =  import.meta.env.VITE_API_Post
const PostDetail = reactive({});

const loadAllPost = async () => {
  try{
    const response = await axios.get(`${URL}/search?postTitle=${postTitle}`)
    // const response = await axios.get(`${URL}/${postTitle}`)
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

watch(() => route.query.postTitle, (newPostTitle) => {
  loadAllPost(newPostTitle);
});


//拿出使用者狀態
onMounted(() => {
  console.log(useUserStore())
})

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



</script>

<template>

  <Navbar></Navbar>

  <!-- 整個頁面的容器大小 -->

  <div class="container">

    {{postTitle}}

    <template v-if="!PostDetail">
      <div class="none-found-block">
        <div class="none-found-center">
          <NoneFoundPage></NoneFoundPage>
        </div>
      </div>
    </template>


    <template v-if="PostDetail">

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

<!--    <div class="tag-div">-->
<!--      <TagFunction :tagjson="json"></TagFunction>-->
<!--    </div>-->

    <!-- 呈現圖片內容 -->

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