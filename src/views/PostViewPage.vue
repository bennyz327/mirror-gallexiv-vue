<script>
import Navbar from "../components/Navbar.vue";
import PostViewCarousel from "../components/PostViewCarousel.vue";
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PostViewPage",
  components: {PostViewCarousel, Navbar}
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

      <!-- Carousel底下 -->

    </div>

    <!-- 右邊版面 -->
    <div class="container-right-block">

      <!-- 標題名稱 -->

      <div class="picture-name-block">
        <h4 class="ellipsis">Connection reset</h4>
      </div>
      <hr class="border border-danger border-2 opacity-50">

      <div class="author-description-block">

        <router-link :to="'/user/'" class="link-color-avoid">

          <div class="author-introduce" style="display: flex; align-items: center;">

            <!-- 頭像 -->
            <div class="rounded-circle" style="display:flex">
              <img src="../assets/Picture/UserIcon.gif" alt="User" width="50" height="50" class="rounded-circle"
                   style="object-fit:contain;"/>
            </div>

            <!-- 名稱 -->
            <div class="author-name-block">
              <h6 class="ellipsis">BennyZhou</h6>
            </div>

            <!-- 內容簡介 -->
            <div class="picture-description-block">
              <p class="ellipsis"></p>

            </div>
          </div>

        </router-link>

        <div class="p">

          <div class="">

          </div>

        </div>

      </div>

    </div>


  </div>
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
  width: auto;
  margin: 8px;
  padding: 16px;
}

.picture-name-block {
  display: flex;
  width: 420px;
  text-overflow: ellipsis;
  align-items: center;
  margin: 8px
}

.author-name-block {
  display: flex;
  width: 420px;
  text-overflow: ellipsis;
  padding: 8px;
}

.picture-description-block{

}

a.link-color-avoid {
  text-decoration: none;
  color: black;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

</style>