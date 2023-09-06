<script setup>
import {computed, reactive, ref} from "vue";
import axios from "axios";
import {computed, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, reactive, ref} from "vue";


// 傳回物件
const props = defineProps({
  imgUrlList: Object
})
// 將物件取出
const items = reactive(props.imgUrlList);

const datas  = reactive({
  imgPath: "",
  postName:"",
  userImg:"",
  userName:"",
  likeId:0,
  postId:""
})

const URL =  import.meta.env.VITE_API_Post
const liked = ref([]);
const hovered = ref([]);

const loadAllPost = async () => {
  try{
    const response = await axios.get(URL)
    console.log(response.data)
    datas.postName = response.data.postName
    console.log(datas.postName)
    datas.postId = response.data.postId
  }catch (error){
    console.error('加载本地 JSON 文件失败：', error);
  }
};

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
loadAllPost();

</script>

<template>

  <div v-if="datas">

    <div class="galley-middle-block">
      <div class="picture-galley-block">
        <div class="picture-item-div" v-for="item in imgUrlList.value">
          <a target="_blank" :href="'/posts/' + item.userinfoByUserId.postId">
            <img v-if="item.blobUrl" :src="item.blobUrl" alt="pic"
                 style="width: 240px; height: 240px; object-fit: cover; border-radius: 8px;"
                 class="picture-div">
          </a>
          <!-- TODO 吃飽太閒寫hover按鈕浮現功能-->
          <div class="picture-item-text-button-div">

            <div class="picture-text-div">
              <p>{{ item.postTitle }}</p>
            </div>


            <div class="picture-item-user-div">
              <div class="picture-item-user-icon-div">
                <router-link :to="'/user/' + item.userinfoByUserId.userId">
                  <img :src="item.userinfoByUserId.avatar" alt="User" width="32" height="32" class="rounded-circle"
                       style="object-fit: cover;border: 1px solid #ccc;"/>
                </router-link>
              </div>

              <div class="picture-item-user-name-div">
                <router-link :to="'/user/' + item.userinfoByUserId.userId"
                             style="text-decoration:none; color:inherit; float: left">
                  <p>{{ item.userinfoByUserId.userName }}</p>
                </router-link>
              </div>

              <div class="like-button-div">
                <button type="button" class="btn" @click="toggleLike(index)" @mouseenter="hovered[index] = true"
                        @mouseleave="hovered[index] = false" style="padding: 0">
                  <i :class="heartClass(index)" style="color: #da2b2b;"></i>
                </button>
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
//background-color: #d88d4f; opacity: 80%;
}

.picture-item-text-button-div {
  padding: 8px;

}

.picture-text-div {
//background-color: #F0EEFA; max-width: 264px; height: 32px; text-align: left; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; //text-decoration: underline;
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
}

.like-button-div {
  width: 15%;
  padding-left: 8px;
}

.text-center {
  color: black;
}

</style>