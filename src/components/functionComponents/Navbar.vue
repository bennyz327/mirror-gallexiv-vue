<script>
import {ref, watch} from 'vue';
import {NBackTop} from "naive-ui";
export default {
  components: {NBackTop},
  setup() {
    // 使用 ref 創建響應式vue
    const selectedOption = ref('作品名稱');

    const apiUrl = ref('');

    // 監聽selectedOption
    watch(selectedOption, (newVal) => {
      if (newVal === '作品名稱') {
        apiUrl.value = '/localhost:8080/posts/byTitle';
      } else if (newVal === '1') {
        apiUrl.value = '/localhost:8080/posts/byAuthor';
      } else if (newVal === '2') {
        apiUrl.value = '/localhost:8080/posts/byHashtag';
      } else {
        apiUrl.value = '';
      }
    });

    // 創建搜尋方法
    const search = () => {
      // 使用 apiUrl 發送api請求
      // 例如使用 axios 發送到 apiUrl
      // axios.get(apiUrl.value).then(response => {
      // });
      console.log('API request URL: ', apiUrl.value);
    };

    // 供模塊使用
    return {
      selectedOption,
      apiUrl,
      search,
    };
  },
};
</script>

<template>

  <!-- 整個Navbar的容器大小 -->

  <div class="container justify-content-center">

    <div class="back-top-button">
      <template>
        <n-back-top :right="80" style=""/>
      </template>
    </div>

    <!--  標題列  -->

    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-xl-start">
<!--      <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">-->
<!--        <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">-->
<!--          <use xlink:href="#bootstrap"></use>-->
<!--        </svg>-->
<!--      </a>-->
      <router-link to="/" class="navbar-brand" style="margin-right: 36px; font-size: 30px;">Gallexiv</router-link>
      <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
        <li>
          <router-link to="" class="nav-link px-2 link-secondary">創作者</router-link>
        </li>
        <li>
          <router-link to="/postviewpage" class="nav-link px-2 link-secondary">單頁</router-link>
        </li>
        <li>
          <router-link to="" class="nav-link px-2 link-secondary">會員相關</router-link>
        </li>
      </ul>

      <!-- 搜尋表單 -->

      <div class="d-flex align-content-center flex-wrap">

        <div class="d-flex flex-wrap align-items-center justify-content-center">
          <button type="button" class="btn btn-outline-info me-2">發文</button>
        </div>

        <form class="d-flex">

          <div class="d-flex flex-wrap align-items-center justify-content-center">
            <input type="search" class="form-control me-2" placeholder="Search" aria-label="Search">
          </div>

          <div class="d-flex flex-wrap align-items-center justify-content-center">
            <select v-model="selectedOption" class="form-select form-select" aria-label=".form-select-lg example">
              <option value="作品名稱">作品名稱</option>
              <option value="1">創作者名稱</option>
              <option value="2">標籤搜尋</option>
            </select>
          </div>

          <div class="d-flex flex-wrap align-items-center justify-content-center" style="margin: 8px">
            <button @click="searchPosts" type="button" class="btn btn-outline-secondary">搜尋</button>
          </div>

        </form>

        <!-- 登入按鈕 -->
        <div class="d-flex flex-wrap align-items-center justify-content-center" style="margin: 8px">

          <!-- 登入前狀態 -->
          <button v-if="isLoggedIn" @click="login" class="btn btn-outline-secondary">登入</button>

          <!-- 登入後狀態 -->
          <div class="dropdown align-self-start" v-if="!isLoggedIn">

            <!-- 觸發下拉 -->
            <button
                class="btn btn-link dropdown-toggle rounded-circle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
              <img
                  src="../../assets/Picture/UserIcon.gif"
              alt="User"
              width="50"
              height="50"
              class="rounded-circle"
                  style="object-fit:contain;"
              />
            </button>

            <!-- 下拉區塊 -->
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

              <!-- 下拉選單 -->
              <router-link to="/userpage" class="dropdown-item" >個人資料</router-link>
              <router-link to="/login" class="dropdown-item" >登入</router-link>
              <router-link to="/setting" class="dropdown-item" >設定</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#" @click="logout">登出</a>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
  <router-view></router-view>
</template>

<style scoped>

.dropdown-toggle::after {
  display: none;
}

</style>