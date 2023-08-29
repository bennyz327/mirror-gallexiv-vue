<script setup>

import {reactive} from "vue";

// 傳回物件
const props = defineProps({
  subscriptionList: Array,
})

// 將物件取出
const items = reactive(props.subscriptionList);

</script>

<template>

  <div class="album py-5">
    <div class="container py-3">
      <main>
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">


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
                <h1 class="card-title pricing-card-title">NT${{item.subscriptionPrice}}<small
                    class="text-muted fw-light">/mo</small>
                </h1>

                <!-- 方案內容按鈕 -->
                <ul class="list-unstyled mt-3 mb-4">
                  <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="heading1">
                        <button class="accordion-button collapsed" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapse1"
                                aria-expanded="false" aria-controls="collapse1">
                          方案內容
                        </button>
                      </h2>

                      <!-- 方案敘述 -->
                      <div id="collapse1" class="accordion-collapse collapse"
                           aria-labelledby="heading1" data-bs-parent="#accordion1">
                        <div class="accordion-body">
                          {{ item.subscriptionDetail }}
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>

                <!--TODO 訂閱按鈕(傳遞參數到不同頁面) -->
                <button :id="'subscribeEnterId' + index" type="button" class="w-100 btn btn-outline-secondary">Subscribe</button>
              </div>
            </div>
          </div>
          </div>

        </div>
      </main>
    </div>
  </div>


</template>

<style scoped>

</style>