<script setup>
import {ref, computed, onMounted, reactive} from 'vue';
import axios from "axios";

// Tag匯入及分頁功能
let tags = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

const props = defineProps({
  tagjson: Object,
})
// 將物件取出
// const items = reactive(props.tagjson);

const tagJsonData = computed(() => {
  return props.tagjson;
});

console.log(tagJsonData)


const paginatedTags = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return tagJsonData.value.tagName.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(tagJsonData.value.length / itemsPerPage));

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
{{tagJsonData}}
{{tagJsonData.length}}

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
          <router-link :to="{ name: 'TagSearchPage', params: { tagName: tag.tagName }}" class="text-decoration-none" v-for="(tag, index) in tagjson"
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