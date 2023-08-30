<script setup>
import {ref, computed, onMounted} from 'vue';
import axios from 'axios';
import Navbar from "../components/Navbar.vue";
import TagFunction from "../components/TagFunction.vue";
import jsonFile from "../assets/tag.json"

const json = ref(jsonFile)

// 圖片功能

</script>

<template>

  <Navbar></Navbar>

  <!-- 整個頁面的容器大小 -->

  <div class="container">

    <!-- 熱門Tag的title-->

    <div class="text-center">

      <h3>熱門標籤</h3>

    </div>

    <!-- Tag 區塊 -->

    <div class="tag-div">
      <TagFunction :tagjson="json"></TagFunction>
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

.control-button :hover {
  background-color: #e6e6fa;
}

.tagname-block {
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