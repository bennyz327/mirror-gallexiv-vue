<script setup>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import {useUserStore} from "@/store/userStore.js";
import {ref} from "vue";

const {token} = useUserStore();
const getData = ref([]);

const URL = import.meta.env.VITE_API_PLAN

//  抓取這個作者目前有訂閱的方案
const getMyPlanData = async () => {

  try {
    const response = await axios.get(`${URL}/myPaidPlan`, {
      headers: {'Authorization': token}
    });

    console.log(response.data);
    getData.value = response.data.data;

  } catch (error) {
    console.error('提交表单时出错：', error);
  }
}
getMyPlanData();


// 取消訂閱(後台subscription Table 的 planId 更改 status)
const cancelPlanFunction = async (planId) => {

  try {
    const response = await axios.get(`${URL}`, {
      headers: {'Authorization': token}
    });

    console.log(response.data);
    getData.value = response.data.data;

  } catch (error) {
    console.error('提交表单时出错：', error);
  }

};

</script>

<template>
  <Navbar></Navbar>

  <div class="container">
    <h3>訂閱中的項目</h3>

    <div class="user-subscribe-item-div-center">
      <div class="user-subscribe-item-div">
        <div class="subscribe-item-div" v-for="(item, index) in getData" :key="index">
          <div class="plan-picture-div"><img :src="item.planPicture" class="rounded img-fluid"
                                             style="max-width: 180px; max-height: 120px;" alt="index"></div>
          <div class="plan-detail-div row">

            <div class="plan-userName-text">
              作者名稱：{{ item.ownerIdByUserId.userName }}
            </div>
            <div class="plan-planName-text">
              方案：{{ item.planName }}
            </div>
            <div class="plan-planDescription-text">
              敘述內容：{{ item.planDescription }}
            </div>
            <div class="plan-planPrice-text">
              價格：{{ item.planPrice }}
            </div>
            <div class="plan-planExpired-text">
              訂閱到期時間：{{ item.subscriptionStartTime }}
            </div>
          </div>

          <div class="function-button-div">
            <div class="function-button">
              <router-link :to="{ name:'OrderPage', params: { planId: item.planId }}" style="text-decoration: none; color: black">
              <v-btn>繼續訂閱</v-btn>
            </router-link>
            </div>
            <div class="function-button" @click="cancelPlanFunction[item.planId]">
              <v-btn>取消訂閱</v-btn>
            </div>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>

<style scoped>

.user-subscribe-item-div-center {
  width: 100%;
  display: flex;
  justify-content: center;
}

.subscribe-item-div {
  display: flex;

  height: 160px;
  border: 1px solid #ccc;
  border-radius: 16px;
  margin: 16px 0;
}

.plan-picture-div {
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
//border: 1px solid red;
}

.plan-detail-div {
  width: 600px;
  max-width: 600px;
  align-items: center;

//border: 1px solid blue;
}

.plan-userName-text,
.plan-planName-text,
.plan-planDescription-text,
.plan-planPrice-text {
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.plan-planExpired-text{
  background-color: #ccc;
  max-width: 600px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.function-button-div{

}

.function-button {
  width: 160px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
//border: 1px solid green;
}


</style>