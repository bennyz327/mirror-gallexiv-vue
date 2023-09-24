<script setup>

import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "@/store/userStore.js";
import axios from "axios";
import { useRoute } from "vue-router";
// 傳回拿到的物件
const props = defineProps({
  subscriptionList: Array,
})

// 將物件取出
const items = reactive(props.subscriptionList);

const PLANURL = import.meta.env.VITE_API_PLAN
const {token, isLogin} = useUserStore();
const route = useRoute();
const userId = ref(route.params.userId || '');

const planData = ref();
const fetchData = async () => {
  try {
    if (userId.value) {
      console.log(userId.value);
      const response = await axios.get(`${PLANURL}/personalPlan`, { params: { state: 2, userId: userId.value } })
      planData.value = response.data.data;
    } else {
      const response = await axios.get(`${PLANURL}/personalPlan?state=1`, { headers: { 'Authorization': token } })
      planData.value = response.data.data;
    }

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
onMounted(() => {
  fetchData();
})

</script>

<template>
  <div class="album py-3">
    <div class="container py-3">
      <main>
        <div v-if="isLogin">
          <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
            <!-- Subscribe Tier (for loop) -->
            <div v-for="(item, index) in planData" :key="index">
              <div class="col">
                <div class="card mb-4 rounded-3 shadow-sm">
                <!-- 圖片 -->
                <div class="card-header py-3 custom-header">
                  <div class="text-center">
                    <img v-if="item.planPicture" :src="item.planPicture" class="rounded img-fluid" style="max-width: 180px; max-height: 120px;"
                      alt="index">
                    <img v-else src="../../assets/Picture/presetPlanIcon.jpg" class="rounded img-fluid" style="max-width: 180px; max-height: 120px;"
                         alt="index">
                  </div>
                </div>
                  <!-- 內文 -->
                <div class="card-body">

                  <!-- 方案名稱 -->
                  <h4 class="my-4 fw-normal">{{ item.planName }}</h4>

                  <!-- 方案價格 -->
                  <h3 class="card-title pricing-card-title">NT${{ item.planPrice }}
                    <small class="text-muted fw-light">/mo</small>
                  </h3>

                  <!-- 方案內容按鈕 -->
                  <ul class="list-unstyled mt-3 mb-4">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                      <div class="accordion-item">
                        <h3 class="accordion-header">
                          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                  :data-bs-target="'#collapse' + index" aria-expanded="false"
                                  :aria-controls="'collapse' + index">
                            <h5>方案內容</h5>
                          </button>
                        </h3>

                        <!-- 方案敘述 -->
                        <div :id="'collapse' + index" class="accordion-collapse collapse"
                             :aria-labelledby="'heading' + index" :data-bs-parent="'#accordion' + index">
                          <div class="accordion-body">
                            {{ item.planDescription }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ul>

                <!--TODO 訂閱按鈕(傳遞參數到不同頁面) -->
                <router-link :to="'/subscribe/order/'+item.planId" >
                  <button class="btn btn btn-outline-secondary" style="width: 100%">
                  訂閱
                  </button>
                </router-link>
<!--                  <button :id="'subscribeEnterId' + index" type="button"-->
<!--                    class="w-100 btn btn-outline-secondary">訂閱</button>-->
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div style="display:flex; justify-content: center"><h2>登入查看更多內容</h2></div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.btn-outline-secondary {
  height: 64px;
}
</style>
