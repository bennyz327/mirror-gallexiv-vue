<script setup>
import {ref, computed, onMounted, reactive} from 'vue';
import axios from "axios";

// Tag匯入及分頁功能
let tags = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;
const URL = import.meta.env.VITE_API_TAG

  const loadPopularTags = async () => {
    try {
      // 導入數據
      const response =await axios.get(URL)
      tags.value = response.data.data;
      // console.log(response.data.data);
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
</script>

<template>
  <div class="tag-div">

    <!-- 左側按鈕 -->
    <div class="d-flex justify-content-between align-items-center">

      <div class="control-button">
        <button class="btn btn-link" @click="prevPage" :disabled="currentPage === 1">
          <i class="fa-solid fa-arrow-right fa-rotate-180 fa-lg" style="color:#d88d4f"></i>
        </button>
      </div>

      <!--TODO Tag  太長的話會沒辦法完整顯示 -->
      <div class="d-flex flex-row">
        <div class="d-flex justify-content-between align-items-center"
             style="margin: 16px; background-color:#ffffff ">
          <router-link :to="'/tags/' + tag.tagId" class="text-decoration-none" v-for="(tag, index) in paginatedTags"
                       :key="index">
            <v-btn style="color: #0c4128;margin-left: 8px;">
              #{{ tag.tagName }}
            </v-btn>
          </router-link>
        </div>
      </div>

      <!-- 右側按鈕 -->
      <div class="control-button">
        <button class="btn btn-link" @click="nextPage" :disabled="currentPage === totalPages">
          <i class="fa-solid fa-arrow-right fa-lg" style="color:#d88d4f"></i>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>

.tag-div li {
  height: 72px;
  margin: 16px;
}

.control-button button {
  height: 96px;
}

.control-button :hover {
  background-color: #eee8aa;
}

.tag-name-button {
  padding-left: 16px;
  padding-right: 16px;
  font-size: 24px;
  font-color: #d88d4f;

  margin: 8px;
  border-radius: 8px;
  height: 48px;
  max-width: 240px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

</style>