<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import axios from "axios";
import {useUserStore} from "@/store/userStore.js";
import {useRoute} from "vue-router";

// 傳回物件
const props = defineProps({
  subscriptionList: Array,
})

// 將物件取出
const items = reactive(props.subscriptionList);

const POSTURL = import.meta.env.VITE_API_Post
const {token, isLogin} = useUserStore();
const postDataWithPlan = ref();
const route = useRoute();
const userId = ref(route.params.userId || '');

const loadAllPost = async () => {
  try {
    if (userId.value) {
      // 他人的專屬頁面
      const postWithPlanResponse = await axios.get(`${POSTURL}`, {
        params: {
          s: 3,
          userId: userId.value
        }
      })
      postDataWithPlan.value = postWithPlanResponse.data.data;
      console.log(postDataWithPlan.value)
      postDataWithPlan.value.forEach((item) => {
        // console.log(imgUrlList.value)
        console.log("進迴圈" + item)
        loadblobUrl(item);
      });

    } else {
      const postWithPlanResponse = await axios.get(`${POSTURL}?s=0`, {headers: {'Authorization': token}})
      postDataWithPlan.value = postWithPlanResponse.data.data;
      console.log(postDataWithPlan.value)

      postDataWithPlan.value.forEach((item) => {
        // console.log(imgUrlList.value)
        console.log("進迴圈" + item)
        loadblobUrl(item);
      });
    }
  } catch (error) {
    console.error('加载本地 JSON 文件失败：', error);
  }
};

loadAllPost();

// 圖片功能

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
  const config = {url: src, method: 'get', responseType: 'blob'};
  const response = await axios.request(config);
  return response.data; // the blob
};

const liked = ref([]);
const hovered = ref([]);

const toggleLike = (index) => {
  liked.value[index] = !liked.value[index];
};

const heartClass = computed(() => {
  return (index) => {
    if (liked.value[index] && hovered.value[index]) {
      return 'fa-solid fa-heart fa-bounce fa-lg';
    } else if (!liked.value[index] && hovered.value[index]) {
      return 'fa-regular fa-heart fa-bounce fa-lg';
    } else {
      return liked.value[index] ? 'fa-solid fa-heart fa-lg' : 'fa-regular fa-heart fa-lg';
    }
  };
});


</script>

<template>

  <div v-if="postDataWithPlan && isLogin">

    <div class="galley-middle-block">
      <div class="picture-galley-block">
        <div class="picture-item-div" v-for="(item, index) in postDataWithPlan" :key="index">
          <a target="_blank" :href="'/post/' + item.postId">
            <img :src="item.blobUrl" alt="pic"
                 style="width: 240px; height: 240px; object-fit: cover; border-radius: 8px;"
                 class="picure-div">
          </a>
          <!-- TODO 吃飽太閒寫hover按鈕浮現功能-->
          <div class="picture-item-text-button-div">

            <div class="picture-text-div">
              <p>{{ item.postTitle }}</p>
            </div>

            <div class="picture-item-user-div">

              <div class="picture-item-user-icon-div">
                <img :src="item.userinfoByUserId.avatar" alt="User" width="32" height="32" class="rounded-circle"
                     style="object-fit: cover;border: 1px solid #ccc"/>
              </div>
              <div class="picture-item-user-name-div">
                <p>{{ item.userinfoByUserId.userName }}</p>
              </div>
              <div class="like-button-div">
                <button type="button" class="btn" @click="toggleLike(index)" @mouseenter="hovered[index] = true"
                        @mouseleave="hovered[index] = false">
                  <i :class="heartClass(index)" style="color: #da2b2b;"></i>
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>

    <br>

    <!--  TODO 自動加載更多內容  -->
    <!--    -->
    <!--    <div class="text-center">-->
    <!--      <v-pagination-->
    <!--          v-model="page"-->
    <!--          :length="10"-->
    <!--          prev-icon="mdi-menu-left"-->
    <!--          next-icon="mdi-menu-right"-->
    <!--      ></v-pagination>-->
    <!--  </div>-->
  </div>
  <div v-else>
    <div style="display:flex; justify-content: center"><h2>登入查看更多內容</h2></div>
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
//background-color: #d88d4f; opacity: 80%;
}

.picture-item-text-button-div {
  padding: 8px;

}

.picture-text-div {
//background-color: #F0EEFA; max-width: 264px; height: 32px; text-align: left; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
//text-decoration: underline;
}

.picture-item-user-div {
  display: flex;
  width: 224px;
}

.picture-item-user-icon-div {
  width: 20%;
}

.picture-item-user-name-div {
  width: 65%;
  max-width: 100%;
  height: 32px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 8px;
}

.like-button-div {
  width: 15%;
}

.text-center {
  color: black;
}

</style>