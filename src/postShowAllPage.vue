<template>
  <div id="navbar-container"></div>

  <div class="container-xl">

    <div class="container-split">

      <!-- 左邊保留部分 -->

      <div class="col-md-8 col-lg-8" style="float: left; width: 60%; ">

        <div class="picture-div">

          <!-- 圖片位置 -->
          <!-- Place somewhere in the <body> of your page -->

          <div class="picture-center-align">

            <img :src="picpath+'/dessert.jpg'" alt="noimg">
            <img :src="picpath+'/mika.png'" alt="noimg">

          </div>
        </div>


      </div>

      <!-- 右側保留部分 -->
    </div>
    <div class="col-md-4 col-lg-4" style="float: right; width: 40%;">

      <!-- 作者區塊 -->

      <div class="author-div" style="margin-left: 72px;">
        <div class="picture-name-div">
          <h4>picture Name</h4>
        </div>
        <div class="author-name-div">
          <h5>author Name</h5>
        </div>
        <div class="author-post-detail">
          <p>post detail</p>
        </div>
        <div class="post-time-div">
          <p>2023-08-13 20:10:49</p>
        </div>
        <div class="hashtag-div">
          <p>#momoi #midori #yuuka</p>
        </div>
      </div>

      <hr>
      <br>

      <!-- 留言區塊 -->

      <div class="message-block" style="margin-left: 72px;">
        <div class="message-user-message">

          <div class="user-name">
            <h6>user-name</h6>
          </div>

          <div class="user-post-time">
            <p>2023-8-16 20:34:23</p>
          </div>

        </div>

        <div class="message-user-post-message">
          cute
          <hr>
        </div>

        <!-- 下一則 -->

      </div>

    </div>
  </div>
  <div id="footer-container" style="clear: both;"></div>
</template>

<script>
import {ref} from "vue";
import axios  from "axios";

//發出請求
axios.get("http://localhost:8080/posts/5").then((res) => {
  console.log(res.data);
});

export default {
  name: "postShowAllPage",
  components: {},
  props: {},
  setup() {
    const picpath = ref("./src/assets/Picture");
    return {
      picpath,
    };
  },
};
</script>

<style>
/* 圖片區塊最外框 */

.picture-div {
  padding: 12px;
}

/* 圖片輪播區塊 */

.slider-div img {
  background-color: ghostwhite;
  max-height: 480px;
  max-width: 100%;
  object-fit: contain;
  padding: 30px;
}

.carousel-div {
  margin-top: -72px;
}

.carousel-div img {
  max-height: 120px;
  object-fit: contain;
}

/* 後面改的圖片區塊 */

.picture-center-align {
  text-align: center;
}

.picture-center-align img {
  max-height: 100%;
  max-width: 500px;
  display: inline-block;
  vertical-align: middle;
  margin-top: 20px;

}

/* 作者區塊 */

.author-div {
  margin-top: 60px;
  height: 360px;
}


/* 留言區塊 */

.message-block {
  margin-left: 72px;
  overflow-y: auto;
  max-height: 180px;
}

.message-user-message {
  display: flex;
}

.user-post-time {
  margin-left: 48px;
}

.user-name {
  text-decoration: underline;
}
</style>