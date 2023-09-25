<script setup>
import Navbar from "@/components/Navbar.vue";
import {ref} from "vue";
import {useUserStore} from "@/store/userStore.js";
import {useRoute} from "vue-router";

const {token} = useUserStore();
import axios from 'axios';
const PLANURL = import.meta.env.VITE_API_PLAN

const route = useRoute();
const planId = ref(route.params.planId || '');

// 假資料，需要 planName, planPrice, userName, subscriptionId
import fakeJsonDataFromOrder from "../assets/orderpage.json"
import axiosInstance from "@/views/api/api.js";

// const items = ref(fakeJsonDataFromOrder);
const items = ref([]);

// 創建當前date
const nowDate = new Date();
const year = nowDate.getFullYear();
const month = nowDate.getMonth() + 1;
const day = nowDate.getDate();
const currentDate = `${year}/${month}/${day}`;

// 創建下次付款時間
nowDate.setDate(nowDate.getDate() + 30);
const year2 = nowDate.getFullYear();
const month2 = nowDate.getMonth() + 1;
const day2 = nowDate.getDate();
const nextPayDate = `${year2}/${month2}/${day2}`;

// 請求訂閱資訊
async function getSubscriptionData() {
  try {
    const url = 'http://localhost:8080/plans/' + planId.value;
    const response = await axiosInstance.get(url, {
      headers: {
        'Authorization': token
      }
    });

    console.log(response.data);
    items.value.push(response.data.data)
    console.log(items.value);

  } catch (error) {
    console.error(error.response.data.msg);
  }
}
getSubscriptionData();


// const planDetail = {
//   "planId": planId.value,
//   "planName": ,
//   "planPrice": 300,
//   "userName": "test",
//   "planDescription": "test"
// }

console.log(planId.value);

async function creatOrder(plan) {
  try {
    const url = 'http://localhost:8080/ecpayCheckout';
    const response = await axiosInstance.post(url, {
      "planId": planId.value,
      "totalAmount": plan.planPrice,
      "tradeDesc": plan.planDescription,
      "itemName": plan.planName,
      "returnURL": "http://localhost:8080/pay/ecpayReturn",
    }, {
      headers: {
        'Authorization': token
      }
    });

    console.log(response.data);
    // formContainer.innerHTML = response.data;
    //開啟新視窗並將返回值放入新分頁的HTML中
    const newWindow = window.open('', '_blank');
    newWindow.document.write(response.data);

  } catch (error) {
    console.error(error.response.data.msg);
  }
}

//
// const sendPostRequest = () => {
//   // 在這裡定義POST請求的數據（如果需要）
//   const postData = {
//     // 您的POST數據
//   };
//
//   // 執行POST請求
//   // axios.post('http://localhost:8080/ecpayCheckout', postData, {headers: {'Authorization': token}})
//   axios.post(`http://localhost:8080/ecpayCheckout`,{headers: {'Authorization': token}})
//       .then(response => {
//         // POST請求成功處理
//         console.log('POST請求成功', response);
//
//         // 在這裡可以根據需要處理回應或將用戶導向新頁面
//         // 例如，您可以使用路由將用戶導向新頁面
//         // this.$router.push('/ecpayCheckout');
//       })
//       .catch(error => {
//         // POST請求失敗處理
//         console.error('POST請求失敗', error);
//       });
// };
</script>

<template>

  <Navbar></Navbar>

  <div class="container" v-if="items">

    <h3>訂閱確認</h3>

    <div class="order-block">
      <div class="order-detail-div" v-for="(item, index) in items" :key="index">
        <div class="order-detail-div-center">

          <table class="table table-striped table-bordered table-hover">
            <thead>
            <tr>
              <th scope="col">訂單編號</th>
              <th scope="col">{{ item.subscriptionId }}</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>訂閱作者</td>
              <td>{{ item.ownerIdByUserId.userName }}</td>

            </tr>
            <tr>
              <td>訂閱方案名稱</td>
              <td>{{ item.planName }}</td>

            </tr>
            <tr>
              <td>訂閱價格</td>
              <td>NT$ {{ item.planPrice }}</td>
            </tr>
            <tr>
              <td>訂閱開始時間</td>
              <td>{{ currentDate }}</td>
            </tr>
            <tr>
              <td>下次付款時間</td>
              <td>{{ nextPayDate }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr>

      <div class="order-push-div">
        <h5>付款方式</h5>

        <div class="order-push-div-flex">

          <div class="pay-way-select-div">

            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked>
              <label class="form-check-label" for="flexRadioDefault1">
                綠界金流
<!--                <img src="../assets/Picture/EcpayPicture.png" style="width: 160px;height: 160px; object-fit: cover">-->
              </label>
            </div>
<!--            <div class="form-check">-->
<!--              <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">-->
<!--              <label class="form-check-label" for="flexCheckDisabled">-->
<!--                <img src="../assets/Picture/LinePayDisable.png" style="width: 160px;height: 160px; object-fit: cover">-->
<!--              </label>-->
<!--            </div>-->

          </div>

          <!--付款按鈕-->
          <div class="link-pay-button">
            <v-btn block="" size="large" @click="creatOrder(items.pop())">前往付款</v-btn>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

.order-block {
  display: block;

}

.order-detail-div {
  display: flex;
  justify-content: center;
}

.order-detail-div-center {
  width: 60%;
}

.order-push-div {
  width: 100%;
}

.pay-way-select-div {
  width: 70%;
  display: flex;
  justify-content: center;
}

.order-push-div-flex {
  display: flex;
}

.link-pay-button {
  display: flex;
  width: 240px;
  justify-items: center;
  align-items: center;
}

</style>