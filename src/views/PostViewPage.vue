<script>
import Navbar from "../components/Navbar.vue";
import PostViewCarousel from "../components/PostViewCarousel.vue";
import {defineComponent} from 'vue'
import InputTextBox from "../components/InputTextBox.vue";

export default defineComponent({
  name: "PostViewPage",
  components: {InputTextBox, PostViewCarousel, Navbar}
})
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

      <hr class="border border-success border-1 opacity-50">
      <!-- Carousel底下 -->

      <!-- 留言區塊 -->
      <div class="message-block">

        <!-- 發文區塊 -->
        <div class="post-message-block">

          <input-text-box></input-text-box>

        </div>


      </div>

    </div>

    <!-- 右邊版面 -->
    <div class="container-right-block">

      <!-- 標題名稱 -->
      <div class="picture-name-block">

        <div class="picture-name-div">
          <h4 class="ellipsis">Connection reset</h4>
        </div>

        <div class="menu-block">
          <i class="fa-solid fa-bars fa-xl" style="color: #d88d4f;"></i>
        </div>

      </div>

      <hr class="border border-danger border-2 opacity-50">

      <div class="author-description-block">

        <!-- 有超連結的區塊 -->
        <router-link :to="'/user/'" class="link-color-avoid">

          <div class="author-introduce-block">

            <!-- 頭像 -->
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

        </router-link>

        <!-- 內容簡介 -->
        <div class="picture-description-block">
          <div class="time-block">
            <p>2023-06-18</p>
          </div>
          <div class="description-block">
            <p>訂閱即可解鎖新功能，而且若符合資格，還可獲得廣告收益分成。</p>
            <!-- 可容納500字元左右 -->
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
  margin: 8px;
}

.container-right-block {
  float: right;
  width: auto;
  margin: 8px;
  padding: 16px;
  background-color: #FCFAF1;
  border-radius: 16px;
  //box-shadow: 0px 0px 10px rgba(0, 0, 0, 1);
}

.container-button-block {
  float: none;
  height: 80px;

}

.picture-name-block {
  display: flex;
  width: 470px;
  text-overflow: ellipsis;
  align-items: center;
  margin: 8px;
}

.picture-name-div {
  width: 470px;
  max-width: 416px;
}

.menu-block {

}

.author-introduce-block {
  display: flex;
  align-items: center;
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
  height: 432px;
  width: 420px;
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