<script setup>
import Navbar from "@/components/Navbar.vue";
import { onMounted, ref } from 'vue';
import axiosInstance from './api/api.js'
import { useUserStore } from "@/store/userStore.js";

const { token, isLogin } = useUserStore()

import backEndJsonFile from "@/assets/backendPage.json";
import axios from "axios";
import Default from "vue-upload-component";
import router from "@/router/router.js";

const jsonDataImportBackendVue = ref(backEndJsonFile);
let items = ref();

const IMGURL = import.meta.env.VITE_API_PICTURE;

// const items = ref('');


const editPost = async (postId) => {
  // 發送編輯請求
  router.push({ name: 'PostEditPage', query: { postId } });

};

const deletePost = async (postId) => {
  // 發送刪除請求
  if (window.confirm("真的要刪除嗎?")) {
    console.log("編輯ID:", postId)
    const URL_POST = import.meta.env.VITE_API_Post;
    try {
      const resDeletePost = await axios.delete(`${URL_POST}/${postId}/delete`, { headers: { 'Authorization': token } });
      console.log(resDeletePost.status)
      console.log('Response from server:', resDeletePost.data);
    } catch (error) {
      console.error('Error sending comment:', error);
    }
  }
  loadPersonPost();
};

//先確認是否登入
const ifNotLogin = () => {
  if (!isLogin) {
    router.push('/login');
  }
};
ifNotLogin();

//load posts
const posts = ref([]);
async function loadPersonPost() {
  const URL_POST = import.meta.env.VITE_API_Post;
  try {
    const response = await axios.post(`${URL_POST}/userPosts`, null, { headers: { 'Authorization': token } });
    posts.value = response.data.data;

    //Blob URL
    posts.value.forEach((post) => {
      post.postBlobUrls = [];
      post.picturesByPostId.forEach(async (picture) => {
        const picId = picture.pictureId;
        const response = await axios.get(`${IMGURL}/test/${picId}`, { responseType: 'blob', headers: { 'Authorization': token } });
        const blob = response.data;
        const blobUrl = window.URL.createObjectURL(blob);
        post.postBlobUrls.push(blobUrl);
      });
    });


  } catch (error) {
    console.error('Error fetching posts data:', error);
  }
}
loadPersonPost()

function formatTime(time) {

  var dateTime = new Date(time);

  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();

  var formattedMonth = month < 10 ? "0" + month : month.toString();
  var formattedDay = day < 10 ? "0" + day : day.toString();

  var formattedDateString = year + "-" + formattedMonth + "-" + formattedDay;
  console.log(formattedDateString);

  return (formattedDateString);
}


function testRole() {

  const url = 'http://localhost:8080/role'
  axiosInstance.get(url, {
    headers: {
      'Authorization': token + '22rr'
    }
  })
    .then((response) => {
      console.log(response.data.msg);
    })
    .catch((error) => {
      router.push('/401')
      console.error(error.response.data.msg);
    });
}


async function testPay() {
  try {
    const formContainer = document.getElementsByClassName('.pay'); // 请替换 'form-container' 为你的 div 的 ID
    const url = 'http://localhost:8080/ecpayCheckout';

    const response = await axiosInstance.post(url, {
      "tradeDate": "2023/03/12 15:30:23",
      "totalAmount": 30001,
      "tradeDesc": "testDesc",
      "itemName": "iPad",
      "returnURL": "http://localhost:8080/pay/ecpayReturn",
      // "clientBackURL": "localhost"
      // "clientBackURL": "http://localhost:3100/backend"
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

    // const newWindow = window.open('', '_blank','width=600,height=600');
    // newWindow.document.write(response.data);

    const form = document.getElementById('allPayAPIForm'); // 请替换 'allPayAPIForm' 为你的表单的 ID
    form.submit();
  } catch (error) {
    console.error(error.response.data.msg);
  }
}

// const formContainer = ref(null);
// const fetchFormData = async () => {
//   try {
//     const response = await axiosInstance.post('http://localhost:8080/ecpayCheckout', {
//       "tradeDate": "2023/03/12 15:30:23",
//       "totalAmount": 30001,
//       "tradeDesc": "testDesc",
//       "itemName": "iPad",
//       "returnURL": "localhost",
//       "clientBackURL": "localhost"
//     }, {
//       headers: {
//         'Authorization': token
//       }
//     });
//     console.log(response.data);
//     // 将后端返回的 HTML 内容添加到表单容器中
//     formContainer.value = response.data;
//     const formDiv = document.getElementsByClassName('.pay');
//     formDiv.innerHTML = formContainer.value;
//   } catch (error) {
//     console.error(error.response.data.msg);
//   }
// };
// const submitForm = () => {
//   // 找到表单元素并提交
//   const form = formContainer.value.querySelector('#allPayAPIForm');
//   if (form) {
//     form.submit();
//   } else {
//     console.error("找不到表单元素。");
//   }
// };
// onMounted(() => {
//   // 在组件挂载后获取表单数据
//   fetchFormData();
// });

async function queryPayResult() {
  try {
    const res = await axiosInstance.post('http://localhost:8080/pay/queryTradeNo',
        {
          "tradeNo": "b28aaedfc67b485eab2c",
        },
        {
          headers: {
            'Authorization': token
          }
        });
    console.log(res.data);
  } catch (error) {
    console.error(error.response.data.msg);
  }
}


</script>

<template>
  <Navbar></Navbar>

  <div class="container" v-if="posts">

    <div class="title-text">
      <h3>貼文管理</h3>
    </div>
<!--    <v-btn @click="testRole">測試不合法 token 跳轉401</v-btn>-->


<!--    <div>-->
<!--      <v-btn @click="testPay">測試綠界</v-btn>-->
<!--      <v-btn @click="queryPayResult">查詢結果</v-btn>-->
<!--    </div>-->

<!--    <div>{{ token }}</div>-->

    <table class="table">
      <thead>
        <tr style="text-align: center">
          <th scope="col">標題</th>
          <th scope="col">縮圖</th>
          <th scope="col">敘述</th>
          <th scope="col">喜歡數量</th>
          <th scope="col">上傳時間</th>
          <th scope="col">是否公開</th>
          <th scope="col">NFSW</th>
          <th scope="col">Tag</th>
          <th scope="col">編輯</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" class="text-center">
          <td class="text-max-width">{{ post.postTitle }}</td>
          <td><img :src="post.postBlobUrls[0]" alt="pictureSrc" class="picture-max-width" /></td>
          <td>
            <v-tooltip :text="post.postContent" activator="parent" location="bottom">
              <template v-slot:activator="{ propsDescription }">
                <v-btn v-bind="propsDescription">詳細</v-btn>
              </template>
            </v-tooltip>
          </td>
          <td class="text-max-width">{{ post.likeCount }}</td>
          <td class="date-max-width ">{{ formatTime(post.postTime) }}</td>
          <td>{{ post.postPublic }}</td>
          <td>{{ post.postAgeLimit }}</td>
          <td>
            <v-tooltip :text="post.tagsByPostId.map(tag => tag.tagName).join(', ')" activator="parent" location="bottom">
              <template v-slot:activator="{ propsTags }">
                <v-btn v-bind="propsTags">詳細</v-btn>
              </template>
            </v-tooltip>
          </td>
          <td>
            <v-btn @click="editPost(post.postId)">編輯</v-btn>
          </td>
          <td>
            <v-btn @click="deletePost(post.postId)">刪除</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.text-max-width {
  max-width: 48px;
  overflow: hidden;

}

.picture-max-width {
  width: 50px;
  height: 50px;
  object-fit: cover
}

.date-max-width {
  max-width: 80px;
}

.table tbody tr td {
  vertical-align: middle;
}
</style>