<script setup>
import Navbar from "../components/Navbar.vue";
import PostViewCarousel from "../components/PostViewCarousel.vue";
import InputTextBox from "../components/InputTextBox.vue";
import { ref } from 'vue';

// 愛心按鈕點擊功能
const liked = ref(false);
const toggleLike = () => {
  liked.value = !liked.value;
};

// 收藏按鈕點擊功能
const collected = ref(false);
const toggleCollect = () => {
  collected.value = !collected.value;
};

//

</script>

<template>

  <!-- Navbar -->

  <Navbar></Navbar>

  <div class="container">

    <!-- 左邊版面 -->
    <div class="container-left-block">
      <!-- Carousel -->
      <div class="carousel-block">
        <PostViewCarousel></PostViewCarousel>
      </div>

      <!-- Carousel底下 -->

      <!-- 留言區塊 -->
      <div class="message-block">


        <div class="like-and-collect-block">
          <div class="like-button-block">
            <button type="button" class="btn btn-outline-primary" @click="toggleLike" style="">
              <i v-if="liked" class="fa-solid fa-heart fa-lg" style="color: #da2b2b;"></i>
              <i v-else class="fa-regular fa-heart fa-lg" style="color: #da2b2b;"></i>
            </button>
          </div>

          <div class="favorite-button-block">
            <button :class="collected ? 'btn btn-primary' : 'btn btn-outline-primary'" type="button" @click="toggleCollect">收藏</button>
          </div>
        </div>

        <div class="post-message-block">
          <!-- 頭像區塊 -->
          <div class="message-user-avatar-block">
            <div class="rounded-circle" style="display:flex">
              <img src="../assets/Picture/UserIcon.gif" alt="User" width="64" height="64" class="rounded-circle"
                   style="object-fit:contain;"/>
            </div>
          </div>

          <div class="message-input-block">
            <!-- 輸入框區塊 -->
            <input-text-box label-id="messageInsert" labelText="留下您的留言"></input-text-box>
          </div>

        </div>

      </div>
    </div>

    <!-- 右邊版面 -->
    <div class="container-right-block">

      <div class="author-and-description-block">

        <!-- 標題名稱 -->
        <div class="picture-name-block">

          <div class="picture-name-div">
            <h4 class="ellipsis">Connection reset</h4>
          </div>

          <div class="menu-block">
            <i class="fa-solid fa-bars fa-xl" style="color: #d88d4f;"></i>
          </div>

        </div>

        <!--<hr class="border border-danger border-2 opacity-50">-->

        <div class="author-description-block">

          <div class="author-introduce-block">

            <!-- 頭像 -->
            <div class="icon-authorname-block">
              <div class="rounded-circle" style="display:flex">
                <img src="../assets/Picture/UserIcon.gif" alt="User" width="64" height="64" class="rounded-circle"
                     style="object-fit:contain;"/>
              </div>

              <!-- 名稱 -->
              <div class="author-name-block">
                <h6 class="ellipsis">
                  BennyZhou
                </h6>
                <br>
              </div>
            </div>

            <!-- 內容簡介 -->
            <div class="picture-description-block">
              <div class="description-block">
                <p id="descriptionText" style="display:none">訂閱即可解鎖新功能，而且若符合資格，還可獲得廣告收益分成。</p>
                <a href="javascript:"
                   onclick="descriptionText.style.display=descriptionText.style.display=='none'?'':'none'"><i
                    class="fa-solid fa-crop-simple fa-bounce" style="color: #d88d4f;">顯示/隱藏敘述</i></a>
                <!-- 可容納300字元左右 -->
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="container-button-block">

    </div>

  </div>


  <!-- 作者相關圖片超連結 (擱置)-->

  <!--        <div class="author-picture-relative-block">-->
  <!--        </div>-->
</template>

<style scoped>

.container {
  display: flex;
  overflow: hidden;
}

.container-left-block {
  float: left;
  width: auto;
  margin-right: 16px;
}

.post-message-block {
  display: flex;
  align-items: center;
}

.like-and-collect-block{
  display: flex;
  margin-top: 16px;
  float:right;
}

.message-user-avatar-block{
  display: inline-block;
}

.message-input-block {
  display: inline-block;
  align-items: center;
  margin-top: 16px;
}

.container-right-block {
  float: right;
  width: 480px;
  border-radius: 16px;
//margin: 8px; //box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
}

.container-button-block {
  float: none;
  height: 80px;
}


.author-and-description-block {
  background-color: #FCFAF1;
}

.picture-name-block {
  display: flex;
  width: 480px;
  text-overflow: ellipsis;
  align-items: center;
  padding: 16px;
}

.picture-name-div {
  width: 424px;
  max-width: 416px;
}

.author-introduce-block {
  display: flex;
//align-items: center; flex-direction: column;
}

.icon-authorname-block {
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
}

.author-name-block {
  display: flex;
  width: 420px;
  height: 80px;
  line-height: 80px;
//text-overflow: ellipsis; padding: 8px;
}

.picture-description-block {
  display: flex;
  float: right;
  text-align: left;
  height: 480px;
  padding-left: 16px;
  padding-right: 16px;
}

.ellipsis {
  margin: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

a.link-color-avoid {
  text-decoration: none;
  color: black;
}


</style>