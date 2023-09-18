<script setup>
import Navbar from "@/components/Navbar.vue";
import creatorSearchJsonFile from '@/assets/creatorSearchList.json';

import {ref} from "vue";
import NoneFoundPage from "@/components/functionComponents/NoneFoundPage.vue";
import {useRoute} from "vue-router";

const jsonDataImportCreatorSearch = ref(creatorSearchJsonFile);

// 取到的userName
const route = useRoute();
const 取到的userName = route.params.取到的userName;


// 相關追隨按鈕功能(以及發送到後端)
const followed = ref(false);

const toggleUsersFollow = (userId) => {
  const userToToggle = jsonDataImportCreatorSearch.value.find(item => item.userId === userId);
  if (userToToggle) {
    userToToggle.followed = !userToToggle.followed;
    sendDataToBackend(userToToggle);
  }
};

const sendDataToBackend = (user) => {
  // 实现向后端发送数据的逻辑，可以使用 axios 或其他方式发送数据
};


</script>

<template>
  <navbar></navbar>

  <div class="container">

    <template v-if="!jsonDataImportCreatorSearch">
      <div class="none-found-block">
        <div class="none-found-center">
          <NoneFoundPage></NoneFoundPage>
        </div>
      </div>
    </template>

    <template v-if="jsonDataImportCreatorSearch">
      <div class="creator-block" v-if="jsonDataImportCreatorSearch">

        <div v-for="(item, index) in jsonDataImportCreatorSearch" :key="index">

          <div class="single-creator-block">

            <div class="single-creator-div">

              <!-- 留言者頭像區塊 -->
              <div class="creator-avatar-icon-div">
                <div class="rounded-circle" style="display:flex">
                  <img :src="item.userIcon" alt="User" width="64" height="64" class="rounded-circle"
                       style="object-fit:cover;"/>
                </div>
              </div>

              <!-- 留言者文字區塊 -->
              <div class="creator-detail-div">

                <div class="creator-name-div">{{ item.userName }}</div>
                <div class="creator-account-div">@{{ item.userAccount }}</div>
                <div class="creator-description-div">{{ item.userDescription }}</div>

              </div>

              <!--追隨按鈕-->
              <div class="users-follow-button-div">
                <button :class="item.followed ? 'btn btn-primary' : 'btn btn-outline-secondary'" type="button"
                        @click="toggleUsersFollow(item.userId)">
                  <span v-text="item.followed ? '已追隨' : '追隨'"></span>
                </button>
              </div>
            </div>
          </div>

          <!--圖片預覽-->
          <div class="creator-picture-div">

            <div class="creator-picture-preview-div">
              <div v-for="(src, index) in item.pictureSrc" :key="index">
                <img :src="src" :alt="'Picture ' + (index + 1)" class="creator-picture-preview"/>
              </div>
            </div>

          </div>

          <hr>

        </div>
      </div>

      <div class="text-center" style="margin-top: 32px">
        <v-pagination
            v-model="page"
            :length="10"
            prev-icon="mdi-menu-left"
            next-icon="mdi-menu-right"
        ></v-pagination>
      </div>
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

.creator-block {
//display: flex; //position: relative; //left:160px; justify-content: center; margin-top: 24px;
}

.single-creator-block {
  display: flex;
  justify-content: center;
  margin: 4px 0;
}

.single-creator-div {
  height: 90px;
  margin: 8px;
//border:3px solid red;
}

.creator-avatar-icon-div {
  position: relative;
  display: inline-block;
  float: left;
  right: -8px;
  top: 8px;
}

.creator-detail-div {
  display: inline-block;
  width: 960px;
}

.creator-name-div {
  display: inline-block;
  padding-top: 8px;
  padding-left: 24px;
}

.creator-account-div {
  display: inline-block;
  padding-top: 8px;
  padding-left: 16px;
  color: #71767B;
}

.creator-description-div {
//display: inline-block; padding-left: 24px; max-width: 800px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
}

.users-follow-button-div {
  display: inline-block;
  position: relative;
  right: 24px;
  top: -24px;
}

.users-follow-button-div button {
  width: 120px;
}

.creator-picture-div {
  display: flex;
  justify-content: center;
}

.creator-picture-preview-div {
  width: 70%;
  display: flex;
}

.creator-picture-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 0 16px;
  border-radius: 16px;
}

.creator-picture-preview:hover {
  transform: scale(1.2);
  transition: transform 0.3s;
}

@media screen and (max-width: 1400px) {
  .creator-detail-div {
    max-width: 640px;
  }

  .creator-description-div {
    max-width: 360px;
    overflow: hidden;
  }

  .creator-picture-preview:hover {
    transform: scale(1.5);
    transition: transform 0.3s;
  }

}

</style>