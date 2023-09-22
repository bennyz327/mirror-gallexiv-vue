<script setup>
import Navbar from "@/components/Navbar.vue";
import { onMounted, ref } from 'vue';
import axiosInstance from './api/api.js'
import { useUserStore } from "@/store/userStore.js";

const { token, isLogin } = useUserStore()

import backEndJsonFile from "@/assets/backendPage.json";
import axios from "axios";
import Default from "vue-upload-component";
import router from "@/router/router.js";

const jsonDataImportBackendVue = ref(backEndJsonFile);
let items = ref();

const IMGURL = import.meta.env.VITE_API_PICTURE;

// const items = ref('');


const editPost = async (postId) => {
  // 發送編輯請求
  router.push({ name: 'PostEditPage', query: { postId } });

};

const deletePost = async (postId) => {
  // 發送刪除請求
  if (window.confirm("真的要刪除嗎?")) {
    console.log("編輯ID:", postId)
    const URL_POST = import.meta.env.VITE_API_Post;
    try {
      const resDeletePost = await axios.delete(`${URL_POST}/${postId}/delete`, { headers: { 'Authorization': token } });
      console.log(resDeletePost.status)
      console.log('Response from server:', resDeletePost.data);
    } catch (error) {
      console.error('Error sending comment:', error);
    }
  }
  loadPersonPost();
};

//先確認是否登入
const ifNotLogin = () => {
  if (!isLogin) {
    router.push('/login');
  }
};
ifNotLogin();

//load posts
const posts = ref([]);
async function loadPersonPost() {
  const URL_POST = import.meta.env.VITE_API_Post;
  try {
    const response = await axios.post(`${URL_POST}/userPosts`, null, { headers: { 'Authorization': token } });
    posts.value = response.data.data;

    //Blob URL
    posts.value.forEach((post) => {
      post.postBlobUrls = [];
      post.picturesByPostId.forEach(async (picture) => {
        const picId = picture.pictureId;
        const response = await axios.get(`${IMGURL}/test/${picId}`, { responseType: 'blob', headers: { 'Authorization': token } });
        const blob = response.data;
        const blobUrl = window.URL.createObjectURL(blob);
        post.postBlobUrls.push(blobUrl);
      });
    });


  } catch (error) {
    console.error('Error fetching posts data:', error);
  }
}
loadPersonPost()

function formatTime(time) {

  var dateTime = new Date(time);

  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();

  var formattedMonth = month < 10 ? "0" + month : month.toString();
  var formattedDay = day < 10 ? "0" + day : day.toString();

  var formattedDateString = year + "-" + formattedMonth + "-" + formattedDay;
  console.log(formattedDateString);

  return (formattedDateString);
}


function testRole() {

  const url = 'http://localhost:8080/role'
  axiosInstance.get(url, {
    headers: {
      'Authorization': token + '22rr'
    }
  })
    .then((response) => {
      console.log(response.data.msg);
    })
    .catch((error) => {
      router.push('/401')
      console.error(error.response.data.msg);
    });
}


</script>

<template>
  <Navbar></Navbar>

  <div class="container" v-if="posts">

    <div class="title-text">
      <h3>貼文管理</h3>
    </div>
    <v-btn @click="testRole">測試不合法 token 跳轉401</v-btn>

    <div>{{ token }}</div>

    <table class="table">
      <thead>
        <tr style="text-align: center">
          <th scope="col">標題</th>
          <th scope="col">縮圖</th>
          <th scope="col">敘述</th>
          <th scope="col">喜歡數量</th>
          <th scope="col">上傳時間</th>
          <th scope="col">是否公開</th>
          <th scope="col">NFSW</th>
          <th scope="col">Tag</th>
          <th scope="col">編輯</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" class="text-center">
          <td class="text-max-width">{{ post.postTitle }}</td>
          <td><img :src="post.postBlobUrls[0]" alt="pictureSrc" class="picture-max-width" /></td>
          <td>
            <v-tooltip :text="post.postContent" activator="parent" location="bottom">
              <template v-slot:activator="{ propsDescription }">
                <v-btn v-bind="propsDescription">詳細</v-btn>
              </template>
            </v-tooltip>
          </td>
          <td class="text-max-width">{{ post.likeCount }}</td>
          <td class="date-max-width ">{{ formatTime(post.postTime) }}</td>
          <td>{{ post.postPublic }}</td>
          <td>{{ post.postAgeLimit }}</td>
          <td>
            <v-tooltip :text="post.tagsByPostId.map(tag => tag.tagName).join(', ')" activator="parent" location="bottom">
              <template v-slot:activator="{ propsTags }">
                <v-btn v-bind="propsTags">詳細</v-btn>
              </template>
            </v-tooltip>
          </td>
          <td>
            <v-btn @click="editPost(post.postId)">編輯</v-btn>
          </td>
          <td>
            <v-btn @click="deletePost(post.postId)">刪除</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.text-max-width {
  max-width: 48px;
  overflow: hidden;

}

.picture-max-width {
  width: 50px;
  height: 50px;
  object-fit: cover
}

.date-max-width {
  max-width: 80px;
}

.table tbody tr td {
  vertical-align: middle;
}
</style>

