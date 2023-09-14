<script setup>
import Navbar from "@/components/Navbar.vue";
import {onMounted, ref} from 'vue';
import axiosInstance from './api/api.js'
import {useUserStore} from "@/store/userStore.js";

const {token} = useUserStore()

import backEndJsonFile from "@/assets/backendPage.json";
import axios from "axios";
import Default from "vue-upload-component";

const jsonDataImportBackendVue = ref(backEndJsonFile);
let items = ref();


// const items = ref('');


const editPost = (postId) => {
  // 發送編輯請求
  console.log("編輯ID", postId);
};

const deletePost = (postId) => {
  // 發送刪除請求
  console.log("刪除ID", postId);
};


// onMounted(() => {
function loadPersonPost() {
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY5NDQyNjAzNiwiZXhwIjoxNjk0NDI3ODM2fQ.ci4vgyLtaw338kvs9-'
  //   }
  // }
  const url = '/posts/person'
  axiosInstance.post(url, null,{
    headers: {
      'Authorization': token
    }
  })
      .then((response) => {
        console.log(response.data.data);
        items.value = ref(response.data.data);
      })
      .catch((error) => {
        console.error('There was a problem with the GET request:', error);
      });
}

loadPersonPost();
// })

</script>

<template>

  <Navbar></Navbar>

  <div class="container" v-if="items">

    <div class="title-text">
      <h3>貼文管理</h3>
    </div>

    <div>{{token}}</div>

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
      <tr v-for="item in items.value" :key="item.id" class="text-center">
        <td class="text-max-width">{{ item.postTitle }}</td>
        <td><img :src="item.pictureSrc" alt="pictureSrc" class="picture-max-width"/></td>
        <td>
          <v-tooltip
            :text="item.postDescription"
            activator="parent"
            location="bottom">
          <template v-slot:activator="{ propsDescription }">
            <v-btn v-bind="propsDescription">詳細</v-btn>
          </template>
        </v-tooltip></td>
        <td class="text-max-width">{{ item.postDescription }}</td>
        <td class="text-max-width">{{ item.likeCount }}</td>
        <td class="date-max-width ">{{ item.postTime }}</td>
        <td>{{ item.postPublic }}</td>
        <td>{{ item.postAgeLimit }}</td>
        <td>
          <v-tooltip
              :text="item.tagsByPostId.map(tag => tag.tagName).join(', ')"
              activator="parent"
              location="bottom">
            <template v-slot:activator="{ propsTags }">
              <v-btn v-bind="propsTags">詳細</v-btn>
            </template>
          </v-tooltip>
        </td>
        <td>
          <v-btn @click="editPost(item.postId)">編輯</v-btn>
        </td>
        <td>
          <v-btn @click="deletePost(item.postId)">刪除</v-btn>
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