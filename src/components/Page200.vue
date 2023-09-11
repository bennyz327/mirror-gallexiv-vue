<script setup>
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/userStore.js";
import { storeToRefs } from "pinia";

const store = useUserStore();


let statusCode = ref(200);
let msg = ref("登入成功");
let redirect = ref("/");
//定義一個每秒減少的變數
const time = ref(5);

//定義一個定時器
let timer = null;

//定義一個函數
//每秒減少
//如果時間小於等於0
//清除定時器
//跳轉到首頁
function countDown() {
  time.value--;
  if (time.value <= 0) {
    clearInterval(timer);
    window.location.href = redirect.value;
  }
}

//設置定時器
timer = setInterval(countDown, 1000);
//頁面卸載的時候清除定時器
window.onunload = function () {
  clearInterval(timer);
};

</script>

<template>
  <div class="container">
    <span class="left">{{ statusCode }}</span><br>
    <div class="pulse"></div>
    <i class="fas fa-heart"></i>
    <span class="right">{{ msg }}</span>
    <span>{{ time }} 秒後跳轉至首頁</span>
  </div>
</template>

<style scoped lang="scss">
$purple: #AB6FBC;
$lightpurple: #CD99DB;
$pink: #F4B0CC;

@import url('https://fonts.googleapis.com/css?family=IBM+Plex+Serif');

html {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  background: #efefef;
  font-family: IBM Plex serif;
  font-size: 20px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px 0 0 0;
  margin: 0;
  height: 100%;
  max-width: 100%;
  flex-direction: column;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

.left {
  font-size: 200px;
  color: $purple;
  text-shadow: 1px 1px 10px rgba($lightpurple, 1);
  animation: 1.2s ease-out 0s 1 slideInFromLeft;
  margin-bottom: -70px;
}

.right {
  animation: 1.2s ease-out 0s 1 slideInFromRight;
  color: $purple;
}

@keyframes grow {
  0% {
    transform: scale(1);
  }

  60% {
    color: $pink;
  }
  100% {
    transform: scale(1.2);
    color: $lightpurple;
  }
}

.fa-heart {
  margin-top: 5px;
  margin-bottom: 5px;
  color: $pink;
  font-size: 50px;
  top: 200px;
  animation: grow 1s ease infinite;
}

/*禁止選取*/
* {
  -webkit-touch-callout: none; /*系统默认菜单被禁用*/
  -webkit-user-select: none; /*webkit浏览器*/
  -khtml-user-select: none; /*早期浏览器*/
  -moz-user-select: none; /*火狐*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
}

input {
  -webkit-user-select: auto; /*webkit浏览器*/
}

textarea {
  -webkit-user-select: auto; /*webkit浏览器*/
}

</style>