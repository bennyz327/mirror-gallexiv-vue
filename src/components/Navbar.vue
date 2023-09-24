<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { NBackTop } from "naive-ui";

// 登入後取得token跟isLogin狀態
import { useUserStore } from "@/store/userStore.js";
import router from "@/router/router.js";

const { token, isLogin } = useUserStore()
import axios from "axios";

import { useRouter } from 'vue-router';

const routerSearch = useRouter();

// 搜尋功能
const inputString = ref('');
// 預設為作品名稱搜尋
const selectedOption = ref('作品名稱')

// 切換搜尋功能
const navigateOnEnter = () => {
  if (inputString.value.trim()) {
    let routeName = 'PostSearchPage';
    let paramName = 'postTitle';

    if (selectedOption.value === '創作者名稱') {
      routeName = 'UserSearchPage';
      paramName = 'userName';
    } else if (selectedOption.value === '標籤搜尋') {
      routeName = 'TagSearchPage';
      paramName = 'tagName';
    }


    const routeParams = { [paramName]: inputString.value };
    routerSearch.push({ name: routeName, query: routeParams });
  }
};

//find loginUser
const loginUserData = ref(null);
if (token) {
  const loadUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/userInfos/profile`, { headers: { 'Authorization': token } });
      loginUserData.value = response.data.data;
      console.log("loginUserData:", loginUserData);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  loadUserData();
}


//
// const URL = import.meta.env.VITE_API_Post;
// const inputString = ref("");
// // 創建搜尋方法
// const search = async () => {
//   try {
//     const response = await axios.get(`${URL}/postTitle`, inputString)
//
//     if (response.status === 200) {
//     }
//   } catch (error) {
//     console.error('提交表单时出错：', error);
//   }

// 使用 apiUrl 發送api請求
// 例如使用 axios 發送到 apiUrl
// axios.get(apiUrl.value).then(response => {
// });
//   console.log('API request URL: ', apiUrl.value);
// };

const logout = () => {
  console.log('logout');
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  console.log('準備登出');
  location.reload();
  router.push('/');
};

</script>

<template>
  <div class="navbar-container">

    <!-- 整個Navbar的容器大小 -->

    <div class="container justify-content-center">

      <div class="back-top-button">
        <template>
          <n-back-top :right="80" style="" />
        </template>
      </div>

      <!--  標題列  -->
      <div class="d-flex align-items-center justify-content-center">
        <router-link to="/" class="navbar-brand" style="margin-right:24px;font-size: 30px;">Gallexiv</router-link>

        <div style="width: 30%;"></div>
        <!-- 搜尋表單 -->
        <div class="d-flex align-content-center">

          <div class="d-flex align-items-center search-bar">
            <input type="search" class="form-control me-1" placeholder="Search" aria-label="Search"
                   v-model="inputString"
                   @keydown.enter="navigateOnEnter">
          </div>

          <div class="d-flex align-items-center">
            <select v-model="selectedOption" class="form-select form-select" aria-label=".form-select-lg example">
              <option value="作品名稱">作品名稱</option>
              <option value="創作者名稱">創作者名稱</option>
              <option value="標籤搜尋">標籤搜尋</option>
            </select>
          </div>

          <div class="d-flex align-items-center">
            <router-link to="/post/create">
              <button type="button" class="btn btn-outline-info me-2">發文</button>
            </router-link>
          </div>


          <!-- 登入按鈕 -->
          <div class="align-items-center" style="margin: 8px">

            <!-- 登入前狀態 -->
            <router-link to="/login" class="dropdown-item">
              <button v-if="!isLogin" @click="login" class="btn btn-outline-secondary">登入</button>
            </router-link>

            <!-- 登入後狀態 -->
            <div class="dropdown align-self-start" v-if="isLogin">

              <!-- 觸發下拉 -->
              <button class="btn btn-link dropdown-toggle rounded-circle" type="button" id="dropdownMenuButton"
                      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img v-if="loginUserData && loginUserData.avatar" :src="loginUserData.avatar" alt="User" width="50"
                     height="50" class="rounded-circle" style="object-fit:cover;"/>
                <img v-else alt="User" width="50" src="../assets/Picture/userIcon.png"
                     height="50" class="rounded-circle" style="object-fit:cover;"/>
              </button>

              <!-- 下拉區塊 -->
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                <!-- 下拉選單 -->
                <router-link to="/user" class="dropdown-item" v-if="isLogin">個人資料</router-link>
                <router-link to="/user/collect" class="dropdown-item" v-if="isLogin">收藏</router-link>
                <router-link to="/user/order" class="dropdown-item" v-if="isLogin">訂閱中項目</router-link>
                <!--                <router-link to="/login" class="dropdown-item" v-if="!isLogin">登入</router-link>-->
                <router-link to="/backend" class="dropdown-item">後台管理</router-link>
                <router-link to="/setting" class="dropdown-item" v-if="isLogin">設定</router-link>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" @click="logout">登出</a>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.navbar-container {
  margin-bottom: 16px;
  position: sticky;
  top: 0;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

@media screen and (max-width: 1200px) {
  .search-bar {
    max-width: 120px;
  }
}
</style>
