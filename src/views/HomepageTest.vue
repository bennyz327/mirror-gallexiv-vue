<script setup>
import {ref, computed, onMounted} from 'vue';
import tagJson from "../assets/tag.json";

// Tag匯入及分頁功能
const tags = ref([]);
const currentPage = ref(1);
const itemsPerPage = 7;
const loadPopularTags = () => {
  try {
    // 導入數據
    tags.value = tagJson;
  } catch (error) {
    console.error('加载本地 JSON 文件失败：', error);
  }
};

onMounted(() => {
  loadPopularTags();
});

const paginatedTags = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return tags.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(tags.value.length / itemsPerPage));

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

//  主頁匯入及分頁功能

// export default {
//   setup() {

// return {
//   tags,
//   paginatedTags,
//   totalPages,
//   setCurrentPage,
// };
// },
// };


</script>

<template>

  <!-- 整個頁面的容器大小 -->

  <div class="container">

    <!-- 熱門Tag的title-->

    <div class="text-center">

      <h3>熱門標籤</h3>

    </div>

    <!-- Tag 區塊 -->

    <div class="tag-div">

      <!-- 左側按鈕 -->

      <div class="d-flex justify-content-between align-items-center">

        <div class="control-button">
          <button class="btn btn-link" @click="prevPage" :disabled="currentPage === 1">
            <i class="fa-solid fa-arrow-right fa-rotate-180 fa-lg"></i>
          </button>
        </div>

        <!-- Tag -->

        <div class="d-flex flex-row">
          <div class="d-flex justify-content-between align-items-center"
               style="margin: 16px; background-color:#ffffff ">
            <router-link :to="'/tags/' + tag.tagId" class="text-decoration-none" v-for="(tag, index) in paginatedTags"
                         :key="index">
              <div class="tagname-block">#{{ tag.tagName }}</div>
            </router-link>
          </div>
        </div>

        <!-- 右側按鈕 -->

        <div class="control-button">
          <button class="btn btn-link" @click="nextPage" :disabled="currentPage === totalPages">
            <i class="fa-solid fa-arrow-right fa-lg"></i>
          </button>
        </div>

      </div>
    </div>

    <!-- 呈現圖片內容 -->

    <div class="album py-5 bg-light">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">


        <div class="col">
          <div class="card shadow-sm" style="object-fit: contain">
            <img src="../assets/Picture/mika.png" alt="Image Description"
                 style="object-fit: cover; width: 100%; height: 225px;">
            <div class="card-body">
              <p class="card-text">MikaSheep</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn- btn-outline-secondary">
                    &hearts;
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">收藏</button>
                </div>
                <small class="text-muted">9 分鐘</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.text-center {
  background-color: #F8F9FA;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  border-radius: 8px;
}

.tag-div li {
  height: 72px;
  margin: 16px;
}

.control-button button {
  height: 96px;
}

.control-button :hover{
  background-color: #e6e6fa;
}

.tagname-block{
  background-color: #e6e6fa;
  padding-left: 16px;
  padding-right: 16px;
  margin: 8px;
  border-radius: 8px;
  max-height: 48px;
  max-width: 144px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>