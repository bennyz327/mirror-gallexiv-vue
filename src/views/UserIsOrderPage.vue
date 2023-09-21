<script setup>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import {useUserStore} from "@/store/userStore.js";
import {ref} from "vue";

const {token} = useUserStore();
const getData = ref([]);

// 此頁面需要作者正在訂閱的方案內容
const URL = import.meta.env.VITE_API_PLAN

const getPlanData = async () => {

  try {
    const response = await axios.get(`${URL}/personalPlan`, {
      headers: {'Authorization': token}
    });
    getData.value = response.data.data;

  } catch (error) {
    console.error('提交表单时出错：', error);
  }
}
getPlanData();

</script>

<template>
  <Navbar></Navbar>

  <div class="container">
    <h3>訂閱中的項目</h3>


    <div class="user-subscribe-item-div">

      <div class="subscribe-item-div" v-for="(item, index) in getData" :key="index">
        <div class="plan-picture-div"><img :src="item.planPicture" class="rounded img-fluid"
                                           style="max-width: 180px; max-height: 120px;" alt="index"></div>
        <div class="plan-detail-div row">

          <div class="plan-userName-text">
            作者名稱：{{ item.userName }}
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

        </div>
        <div class="function-button-div"></div>


      </div>

    </div>


  </div>
</template>

<style scoped>
.user-subscribe-item-div {
  width: 100%;
  display: flex;
  justify-content: center;
}

.subscribe-item-div {
  display: flex;
  width: 1000px;
  height: 160px;
  border: 1px solid #ccc;
  border-radius: 16px;
}

.plan-picture-div {
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  //border: 1px solid red;
}

.plan-detail-div {
  width: 560px;
  max-width: 560px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  //border: 1px solid blue;
}

.plan-userName-text,
.plan-planName-text,
.plan-planDescription-text,
.plan-planPrice-text{

}


.function-button-div {
  width: 160px;
  //border: 1px solid green;
}


</style>