<script setup>

import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useUserStore} from "@/store/userStore.js";

// 傳回拿到的物件
const props = defineProps({
  subscribeList: Array,
})
// 將物件取出
const items = reactive(props.subscribeList);
const {token} = useUserStore();
const getData = ref([]);
const subscriptionImg = ref("");
const subscriptionName = ref("");
const subscriptionPrice = ref("");
const URL = import.meta.env.VITE_API_PLAN
const getPlanData = async () => {

  try {
    const response = await axios.get(`${URL}/test`,{headers: {'Authorization': token}
    });
    getData.value = response.data.data;
    // subscriptionImg.value = getData.value.data.planPicture;
    // subscriptionName.value = getData.value.data.planName;
    // subscriptionPrice.value = getData.value.data.planPrice;



  }catch (error){
    console.error('提交表单时出错：', error);
  }
}
getPlanData();


//  刪除功能
const route = useRoute();
const planId = ref(route.query.planId || '');

const deleteItem = async (planIdToDelete) => {
  try {
    //發送請求到特定API
    await axios.delete(`/api/delete/${planIdToDelete}`);
    console.error(planIdToDelete);

  } catch (error) {
    console.error('刪除失敗', error);
    console.error(planIdToDelete);
  }

};



//  刪除功能
const route = useRoute();
const planId = ref(route.query.planId || '');

const deleteItem = async (planIdToDelete) => {
  try {
    //發送請求到特定API
    await axios.delete(`/api/delete/${planIdToDelete}`);
    console.error(planIdToDelete);

  } catch (error) {
    console.error('刪除失敗', error);
    console.error(planIdToDelete);
  }

};


</script>

<template>

  <div class="setting-subscribe-block" v-if="getData">

    <div class="setting-subscribe-view-whole-div ">
      <div class="album py-3">
        <div class="container py-3">
          <main>
            <div class="row row-cols-1 row-cols-md-3 text-center">


              <!-- Subscribe Tier (for loop) -->

              <div v-for="(item, index) in getData" :key="index">
                <div class="col">
                  <div class="card mb-4 rounded-3 shadow-sm">

                    <!-- 圖片 -->
                    <div class="card-header py-3 custom-header">
                      <div class="text-center">
                        <img :src="item.planPicture" class="rounded img-fluid"
                             style="max-width: 180px; max-height: 120px;" alt="index">
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

                      <hr>

                      <!--編輯功能導向-->
                      <router-link :to="{name:'EditPlanPage', query:{planId: item.planId}}"
                                   style="text-decoration:none;color:black;">
                        <button :id="'subscribeSettingId' + index" type="button"
                                class="w-100 btn btn-outline-secondary">
                          編輯
                        </button>
                      </router-link>

                      <!--刪除功能-->
                      <button :id="'subscribeSettingId' + index" type="button"
                              class="w-100 btn btn-outline-secondary" data-bs-toggle="modal"
                              :data-bs-target="'#exampleModal'+ index"
                              style="margin-top: 16px">
                        刪除
                      </button>

                      <!--確認輸入框-->
                      <div class="modal fade" :id="'exampleModal' + index" tabindex="-1" :aria-labelledby="'exampleModalLabel' + index"
                           aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">確定要刪除嗎</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                      aria-label="Close"></button>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                              <button type="button" class="btn btn-primary" @click="deleteItem(item.planId)">確定</button>
                            </div>
                          </div>
                        </div>
                      </div>

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
  height: 20%;
  justify-content: center;
  align-content: center;
  text-align: center;
  margin-top: 72px;
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