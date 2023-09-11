<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref } from 'vue';

import backEndJsonFile from "@/assets/backendPage.json";
const jsonDataImportBackendVue = ref(backEndJsonFile);

const items = ref(jsonDataImportBackendVue);

const editPost = (item) => {
  // 在这里执行编辑帖子的逻辑，可以使用 item.post
  // 例如，发送后端请求来编辑帖子
  console.log("编辑帖子", item);
};

const deletePost = (postId) => {
  console.log("删除帖子", postId);
};
</script>

<template>

  <Navbar></Navbar>

  <div class="container" v-if="items">

    <div class="title-text">
      <h3>貼文管理</h3>
    </div>

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
      <tr v-for="item in items" :key="item.id" class="text-center">
        <td class="text-max-width">{{ item.postTitle }}</td>
        <td><img :src="item.pictureSrc" alt="pictureSrc" class="picture-max-width"/></td>
        <td class="text-max-width">{{ item.postDescription }}</td>
        <td class="text-max-width">{{ item.likeCount }}</td>
        <td class="date-max-width ">{{ item.updateTime }}</td>
        <td>{{ item.isPublic }}</td>
        <td>{{ item.isNFSW }}</td>
        <td>
          <v-tooltip :text="item.postTag">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">詳細</v-btn>
            </template>
          </v-tooltip></td>
        <td>
          <v-btn @click="editPost(item)">編輯</v-btn>
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

.text-max-width{
  max-width: 48px;
  overflow:hidden;

}

.picture-max-width{
  width: 50px;
  height: 50px;
  object-fit: cover
}

.date-max-width {
  max-width: 80px;
}

.table tbody tr td{
  vertical-align: middle;
}

</style>