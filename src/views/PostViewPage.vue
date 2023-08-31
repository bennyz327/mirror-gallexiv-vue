<script setup>
import '@/assets/css/postViewPage.css';
import Navbar from "../components/functionComponents/Navbar.vue";
import PostViewCarousel from "../components/functionComponents/PostViewCarousel.vue";
import InputTextBox from "../components/functionComponents/InputTextBox.vue";
import axios from "axios";
import { ref, onMounted, reactive, computed } from 'vue';
import Message from "../components/functionComponents/MessageArea.vue";


// 圖片區假資料
const imgDataReference = ref([
  {
    "pictureId": "0",
    "imgPath": "https://cdn.discordapp.com/attachments/940525773457072169/1143597896827162654/101585724_p1.png",
  },
  {
    "pictureId": "1",
    "imgPath": "https://cdn.discordapp.com/attachments/940525773457072169/1143599997208776757/101317845_p0.png",
  },
  {
    "pictureId": "2",
    "imgPath": "https://cdn.discordapp.com/attachments/940525773457072169/1143601111375286352/RABBIT_108010979_p0.jpg",
  }
]);

// 匯入資料到carousel
const imgDataImportToCarousel = reactive(
  imgDataReference.value.map(item => item.imgPath)
);

// 其他區域假資料

const testData = ref(null);

const fetchData = async () => {
  try {

    const fakeUserData = {
      "postUserName": "Aosora",
      "postDescription": "夏萊的老師有無窮的包容力  還有無限的地下室",
      "postTitle": "Fbi Open UP",
      "userImageURL": "https://i.imgur.com/6rpzbog.gif",
      "postUserImageURL": "https://media.discordapp.net/attachments/782068953899335710/1138768475754598420/83E0E2EE11DE10FD3314E2FE2D1EBDAE.gif",
    };


    setTimeout(() => {
      testData.value = fakeUserData;
    }, 1000);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

onMounted(() => {
  fetchData();
});

const liked = ref(false);
const collected = ref(false);
const hovered = ref(false);

const toggleLike = () => {
  liked.value = !liked.value;
  sendDataToBackend(userData.value.postData);
};

const toggleCollect = () => {
  collected.value = !collected.value;
  sendDataToBackend(userData.value.postData);
};

const heartClass = computed(() => {
  if (liked.value && hovered.value) {
    return 'fa-solid fa-heart fa-bounce fa-lg';
  } else if (!liked.value && hovered.value) {
    return 'fa-regular fa-heart fa-bounce fa-lg';
  } else {
    return liked.value ? 'fa-solid fa-heart fa-lg' : 'fa-regular fa-heart fa-lg';
  }
});


// const testData = reactive({
//   liked: liked.value,
//   collected: collected.value,
//   postData: {
//     // 这里放要传递给后端的数据
//   },
// });


// const sendDataToBackend = (data) => {
//   // const res = axios.post('',data);
//
// };


</script>

<template>
  <!-- Navbar -->

  <Navbar></Navbar>

  <div class="container" v-if="testData">
    <div class="container-postViewPageStyle">

      <!--------------------------------左半部區塊----------------------------------------->
      <div class="container-left-block">
        <!-- Carousel -->
        <div class="carousel-block">
          <PostViewCarousel :imgUrlList="imgDataImportToCarousel"></PostViewCarousel>
        </div>

        <!--------------------------------Carousel 分隔區 / 收藏按鈕區塊----------------------------------------->
        <div class="message-block">

          <!--愛心及收藏功能-->
          <div class="like-and-collect-block">
            <div class="like-button-block" style="margin-right: 5px">
              <button type="button" class="btn" @click="toggleLike" @mouseenter="hovered = true"
                @mouseleave="hovered = false">
                <i :class="heartClass" style="color: #da2b2b;"></i>
              </button>
            </div>

            <div class="favorite-button-block">
              <button :class="collected ? 'btn btn-primary' : 'btn btn-outline-secondary'" type="button"
                @click="toggleCollect">
                <span v-text="collected ? '已收藏' : '收藏'"></span>
              </button>
            </div>
          </div>

          <!--------------------------------留言功能區塊----------------------------------------->
          <div class="post-message-block">
            <!-- 留言者頭像區塊 -->
            <div class="message-user-avatar-block">
              <div class="rounded-circle" style="display:flex">
                <img :src="testData.userImageURL" alt="User" width="64" height="64" class="rounded-circle"
                  style="object-fit:cover;" />
              </div>
            </div>

            <!-- 輸入框區塊 -->
            <div class="message-input-block">
              <input-text-box label-id="messageInsert" labelText="留下您的留言" type-id="text"
                is-required="false"></input-text-box>
            </div>

          </div>

          <!-- 底部留言區塊 -->
          <div class="message-show-block">
            <!-- 單人留言區塊(v-for區塊) -->
            <div class="single-message-block">

              <div class="single-message-div">
                <!-- 留言者頭像 -->
                <div class="single-message-user-icon-div">

                </div>

                <!-- userName -->
                <div class="single-message-userName-div">
                </div>

                <!-- userContext -->
                <div class="single-message-userContext-div">
                </div>

                <!-- userContextTime -->
                <div class="single-message-userContextTime-div">
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <!--------------------------------右半部區塊----------------------------------------->
      <div class="container-right-block">

        <div class="whole-picture-name-block">

          <!-- 標題名稱 -->
          <div class="picture-name-block">

            <div class="picture-name-div">
              <h4 class="ellipsis" id="mainPostPicName">{{ testData.postTitle }}</h4>
            </div>

            <div class="menu-block">
              <i class="fa-solid fa-bars fa-xl" style="color: #d88d4f;"></i>
            </div>

          </div>

          <!--------------------------------圖片名稱  作者內容分隔線----------------------------------------->
          <div class="whole-author-introduce-block">

            <div class="author-introduce-block">

              <!-- 頭像 -->
              <div class="author-icon-block">
                <div class="rounded-circle" style="display:flex">
                  <img :src="testData.postUserImageURL" alt="User" width="64" height="64" class="rounded-circle"
                    style="object-fit:contain;" />
                </div>

                <!-- 名稱 -->
                <div class="author-name-block">
                  <h6 class="ellipsis" id="mainPostUserName">
                    {{ testData.postUserName }}
                  </h6>
                  <br>
                </div>
              </div>

              <!-- 圖片敘述 -->
              <div class="picture-description-block">
                <div class="description-block">
                  <p id="descriptionText" style="display:none">{{ testData.postDescription }}</p>
                  <a href="javascript:"
                    onclick="descriptionText.style.display=descriptionText.style.display==='none'?'':'none'"><i
                      class="fa-solid fa-crop-simple fa-bounce" style="color: #d88d4f;">顯示/隱藏敘述</i></a>
                  <!-- 可容納300字元左右 -->
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!--------------------------------底部區塊----------------------------------------->

      <div class="container-button-block">

      </div>

    </div>

  </div>

  <!-- 作者相關圖片超連結 (擱置)-->

  <!--        <div class="author-picture-relative-block">-->
  <!--        </div>-->
</template>

<style scoped>
</style>