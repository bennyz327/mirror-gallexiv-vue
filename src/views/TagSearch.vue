<script>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';


export default {
  setup() {
    const tags = ref([]);
    const currentPage = ref(1);
    const itemsPerPage = 5;

    const loadPopularTags = async () => {
      const response = await axios.get(`${urlTagMostPopular}`, datas);
      tags.value = response.data.list;
    };

    onMounted(() => {
      loadPopularTags();
    });

    //獲取當前頁面
    const paginatedTags = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return tags.value.slice(startIndex, endIndex);
    });

    // 計算總頁面
    const totalPages = computed(() => Math.ceil(tags.value.length / itemsPerPage));

    // 切換當前頁面
    const setCurrentPage = (page) => {
      currentPage.value = page;
    };

    return {
      tags,
      paginatedTags,
      totalPages,
      setCurrentPage,
    };
  },
};
</script>

<script setup>
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params;
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
      <div class="d-flex flex-row">
        <div class="d-flex justify-content-between align-items-center" style="margin: 16px; background-color:#ffffff ">
          <a href="#" class="text-decoration-none" v-for="(tag, index) in paginatedTags" :key="index">
            <div>#{{ tag.name }}</div>
          </a>
        </div>
      </div>
      <!-- 分页控件 -->
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" v-for="page in totalPages" :key="page">
            <a class="page-link" href="#" @click="setCurrentPage(page)">{{ page }}</a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- 呈現圖片內容 -->

    <div class="album py-5 bg-light">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">


        <div class="col">
          <div class="card shadow-sm" style="object-fit: contain">
              <img src="../assets/Picture/mika.png" alt="Image Description" style="object-fit: cover; width: 100%; height: 225px;">
            <div class="card-body">
              <p class="card-text">{{id}}MikaSheep</p>
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
}

.tag-div li {
  height: 72px;
  margin: 16px;
}

.tag-div span {
  margin: 8px;
}

</style>