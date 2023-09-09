<script setup>

import {reactive} from "vue";

// 傳回拿到的物件
const props = defineProps({
  subscribeList: Array,
})
// 將物件取出
const items = reactive(props.subscribeList);

</script>

<template>

  <div class="setting-subscribe-block" v-if="items">

    <div class="setting-subscribe-view-whole-div ">
      <div class="album py-3">
        <div class="container py-3">
          <main>
            <div class="row row-cols-1 row-cols-md-3 text-center">


              <!-- Subscribe Tier (for loop) -->

              <div v-for="(item, index) in items" :key="index">
                <div class="col">
                  <div class="card mb-4 rounded-3 shadow-sm">

                    <!-- 圖片 -->
                    <div class="card-header py-3 custom-header">
                      <div class="text-center">
                        <img :src="item.subscriptionImg" class="rounded img-fluid"
                             style="max-width: 180px; max-height: 120px;" alt="index">
                      </div>
                    </div>

                    <!-- 內文 -->
                    <div class="card-body">

                      <!-- 方案名稱 -->
                      <h4 class="my-4 fw-normal">{{ item.subscriptionName }}</h4>

                      <!-- 方案價格 -->
                      <h3 class="card-title pricing-card-title">NT${{ item.subscriptionPrice }}
                        <small class="text-muted fw-light">/mo</small>
                      </h3>

                      <hr>

                      <!--TODO 編輯設定按鈕 -->
                      <button :id="'subscribeSettingId' + index" type="button" class="w-100 btn btn-outline-secondary">
                        編輯
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>


    <router-link to="/subscribe/create" class="setting-subscribe-plus-new-router-link">
      <div class="setting-subscribe-plus-new-div">
        <div style="display:flex; align-items: center">
          <img src="../../assets/Picture/plusIcon.png" width="48" height="48" alt="plus-icon">
          <h2 style="margin: 0">新增方案</h2>
          <div style="margin-left: 16px">
            <p style="margin: 0">(最多可以擁有3個方案)</p>
          </div>
        </div>
      </div>
    </router-link>

  </div>

</template>

<style scoped>

.setting-subscribe-block {
  height: 640px;
  padding: 16px;
}

.setting-subscribe-view-whole-div {
  height: 70%;
}

.setting-subscribe-plus-new-div {
  display: flex;
  height: 30%;
  margin-top: 8px;
  margin-bottom: 8px;
  justify-content: center;
  align-content: center;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 16px;

}

.setting-subscribe-plus-new-router-link {
  text-decoration: none;
  color: black
}

.setting-subscribe-plus-new-router-link :hover {
  background-color: #ccc;
  color: white;
  opacity: 0.9;
}

</style>