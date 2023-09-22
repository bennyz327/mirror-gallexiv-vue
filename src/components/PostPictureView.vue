<script setup>
import {computed, onMounted, onUpdated, reactive, ref} from "vue";
import {onBeforeRouteUpdate} from "vue-router";

// 傳回物件
const props = defineProps({
  imgUrlList: Object
})
// 將物件取出
const items = reactive(props.imgUrlList);

const URL = import.meta.env.VITE_API_Post
const liked = ref([]);
const hovered = ref([]);

//  點讚功能
const toggleLike = (postId) => {
  liked.value[postId] = !liked.value[postId];
};

//  切換點讚狀態功能
const heartClass = computed(() => {
  return (postId) => {
    if (liked.value[postId] && hovered.value[postId]) {
      return 'fa-solid fa-heart fa-bounce fa-lg';
    } else if (!liked.value[postId] && hovered.value[postId]) {
      return 'fa-regular fa-heart fa-bounce fa-lg';
    } else {
      return liked.value[postId] ? 'fa-solid fa-heart fa-lg' : 'fa-regular fa-heart fa-lg';
    }
  };
});

</script>

<template>
  <div v-if="imgUrlList">

    <div class="galley-middle-block">
      <div class="picture-galley-block">
        <div class="picture-item-div" v-for="item in imgUrlList.value">
          <router-link :to="{ name:'PostViewPagePath', params: { postId: item.postId }}">
            <img v-if="item.blobUrl" :src="item.blobUrl" alt="pic"
                 style="width: 240px; height: 240px; object-fit: cover; border-radius: 8px;"
                 class="picture-div">
          </router-link>
          <!-- TODO 吃飽太閒寫hover按鈕浮現功能-->
          <div class="picture-item-text-button-div">

            <!--作品名稱-->
            <div class="picture-text-div">
              {{ item.postTitle }}
            </div>


            <!--文字第二行-->
            <div class="user-detail-div">

              <!--該篇作者投向-->
              <div class="user-icon-div">
                <router-link :to="'/user/' + item.userinfoByUserId.userId">
                  <img :src="item.userinfoByUserId.avatar" alt="User" width="32" height="32" class="rounded-circle"
                       style="object-fit: cover;border: 1px solid #ccc;"/>
                </router-link>
              </div>

              <!--該篇作者姓名-->
              <div class="user-name-div">
                <router-link :to="'/user/' + item.userinfoByUserId.userId"
                             style="text-decoration:none; color:inherit; float: left">
                  {{ item.userinfoByUserId.userName }}
                </router-link>
              </div>

              <!--like按鈕-->
              <div class="like-button-div">
                <button type="button" class="btn" @click="toggleLike(item.postId)"
                        @mouseenter="hovered[item.postId] = true"
                        @mouseleave="hovered[item.postId] = false" style="margin: 0; padding:0">
                  <i :class="heartClass(item.postId)" style="color: #da2b2b;"></i>
                </button>
              </div>
              <!--like數量-->
              <div class="like-val-div">
                1000{{}}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <br>

    <div class="text-center">
      <v-pagination
          v-model="page"
          :length="10"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped>

.galley-middle-block {
  display: flex;
  justify-content: center;
}

.picture-galley-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.picture-item-div {
  border: 1px solid #ccc;
  float: left;
  width: 264px;
  height: 336px;
  margin: 12px;
  border-radius: 16px;
  padding: 8px;
}

.picture-item-div a {
  display: flex;
  justify-content: center;
  align-items: center;
}

.picture-item-div:hover img {
  border: 2px solid #777;
  /* background-color: #d88d4f; opacity: 80%; */
}

.picture-item-text-button-div {
  padding: 8px;

}

.picture-text-div {
  /* background-color: #F0EEFA; max-width: 264px; */
  margin: 0;
  height: 32px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* text-decoration: underline; */
}

.user-detail-div {
  display: flex;
  width: 224px;
}

.user-icon-div {
  width: 20%;
}

.user-name-div {
  width: 50%;
  height: 32px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.like-button-div {
  width: 15%;
  position: relative;
  top: -4px;
}

.like-val-div {
  width: 15%;
  text-align: center;
  margin: 0;
}

.text-center {
  color: black;
}
</style>