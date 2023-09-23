<script setup>
import {ref, computed, onMounted, reactive, watch} from 'vue';
import {useRoute} from "vue-router";

const {isLogin, token, name} = useUserStore()
import {useUserStore} from "@/store/userStore.js";
import axios from 'axios';

import Navbar from "../components/Navbar.vue";
import NoneFoundPage from "@/components/functionComponents/NoneFoundPage.vue";
import PostPictureView from "@/components/PostPictureView.vue";

let decodeName = eval("'" + name + "'")

// 取到的postTitle相關搜尋資料
const route = useRoute();
const postTitle = ref(route.query.postTitle || ''); //  接收來自router的值以外要讓他成為ref可以更新資料

const URL = import.meta.env.VITE_API_Post
const PostSearchDetail = reactive({});

const loadSearchPost = async () => {
  try {
    const response = await axios.get(`${URL}/postTitle?postTitle=${postTitle.value}`,{headers: {'Authorization': token}})
    console.log(response.data.data);
    PostSearchDetail.value = response.data.data;
    console.log(PostSearchDetail)
    PostSearchDetail.value.forEach((item) => {
      // console.log(imgUrlList.value)
      console.log("進迴圈" + item);
      loadblobUrl(item);
    });

  } catch (error) {
    console.error('加载本地 JSON 文件失败：', error);
  }
};

// 執行第一次
loadSearchPost();

// 重新載入postTitle的值送入axios
watch(() => route.query.postTitle, (newPostTitle) => {
  postTitle.value = newPostTitle; // 更新 postTitle 的值
  loadSearchPost();
});

//  取出圖片
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

//  加載圖片
const load = async (src) => {
  const config = { url: src, method: 'get', responseType: 'blob',headers:{ 'Authorization': token } };
  const response = await axios.request(config);
  return response.data; // the blob
};

</script>

<template>

  <Navbar></Navbar>

  <!-- 整個頁面的容器大小 -->

  <div class="container">

<!--    <template v-if="PostSearchDetail">-->
<!--      <div class="none-found-block">-->
<!--        <div class="none-found-center">-->
<!--          <NoneFoundPage></NoneFoundPage>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->

      <PostPictureView :imgUrlList="PostSearchDetail"></PostPictureView>

  </div>

</template>

<style scoped>

.none-found-block {
  width: 100%;
}

.none-found-center {
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