<script setup>
import Navbar from "@/components/Navbar.vue";
import AvatarCropper from "vue-avatar-cropper";

import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore.js";
import { useRoute } from "vue-router";
import router from "@/router/router.js";

// 輸入限制區塊
const subscribeTitle = ref("");
const subscribePrice = ref("");
const subscribeDescription = ref("");
const previewPicture = ref("");
const getData = ref([]);
const URL = import.meta.env.VITE_API_PLAN;
const { token } = useUserStore();

const subscribeTitleRules = [
  (value) => {
    if (value && value.length <= 20 && value.trim().length > 0) {
      return true;
    } else if (!value || value.trim().length === 0) {
      return "至少必須輸入一個字元作為標題";
    } else {
      return "字數不能超過 20 個字";
    }
  },
];

const subscribePriceRules = [
  (value) => {
    if (!value || value.length === 0) {
      return '必須輸入一個數字';
    } else if (!/^\d+$/.test(value)) {
      return '只能輸入數字';
    } else {
      const numericValue = parseInt(value);
      if (numericValue >= 30 && numericValue <= 1000) {
        return true;
      } else {
        return "費用最少需要填寫30元以上，並且不能高過1000元";
      }
    }
  },
];

const subscribeDescriptionRules = [
  (value) => {
    if (value && value.length <= 250) {
      return true;
    } else if (value && value.length > 250) {
      return "字數不能超過 250 個字";
    } else {
      return true;
    }
  },
];

// 圖片上傳區塊
const maxFileSize = 2;
const showCropper = ref(true);
const message = ref("");
const route = useRoute();
const planId = ref('');

planId.value = route.query.planId;

const user = ref({
  planPicture: "",
});

const handleUploaded = (data) => {
  const base64str = data.url.substring(data.url.indexOf(",") + 1);
  const decoded = atob(base64str);
  const decodedFileSize = decoded.length / 1024 ** 2;

  if (decodedFileSize > maxFileSize) {
    message.value =
      "這張圖片太大了(超過2MB)請嘗試將它縮小後再上傳";

    setTimeout(() => {
      message.value = "";
    }, 5000);
  } else {
    user.value.avatar = data.getCroppedCanvas().toDataURL("image/png");
  }
};

const changeCropperVisibility = () => {
  showCropper.value = true;
};

const onChanged = (event) => {
  console.log(event.file.size);
};

const removePhoto = () => {
  user.value.avatar = "";
  message.value = "";
}

const getPlanData = async () => {

  try {
    const response = await axios.get(`${URL}/${planId.value}`, {
      headers: { 'Authorization': token }
    });
    getData.value = response.data;
    subscribeTitle.value = getData.value.data.planName;
    subscribePrice.value = getData.value.data.planPrice;
    subscribeDescription.value = getData.value.data.planDescription;
    previewPicture.value = getData.value.data.planPicture

    console.log(getData.value)
    console.log(response)

  } catch (error) {
    console.error('提交表单时出错：', error);
  }
}

getPlanData();

const submitForm = async () => {

  const planData = getData.value.data;
  planData.planName = subscribeTitle.value;
  planData.planPrice = subscribePrice.value;
  planData.planDescription = subscribeDescription.value;
  planData.planPicture = user.value.avatar;
  console.log('planData')
  // console.log(user.value.avatar)
  console.log(previewPicture.value)
  console.log(planData.planPicture)

  try {
    const response = await axios.put(`${URL}/update`, planData, { headers: { 'Authorization': token } });
    
    if (response.status === 200) {
      router.push({ name: 'SettingPage' });

    }
  } catch (error) {
    console.error('提交表单时出错：', error);
  }
};


</script>

<template>
  <Navbar></Navbar>

  <div class="container">

    <div class="page-title-div">
      <h3>修改方案</h3>
    </div>

    <!--全區塊-->
    <div class="create-subscribe-block">

      <!--預覽區塊-->
      <div class="subscribe-view-div" style="margin-top: 48px">

        <div class="col">
          <div class="card mb-4 rounded-4 shadow-sm">

            <!-- 圖片 -->
            <div class="card-header py-4 custom-header">
              <div class="text-center">
                <img v-if="user.avatar" :src="user.avatar" class="rounded img-fluid"
                  style="max-width: 180px; max-height: 120px;" alt="index">
                <img v-else src="../assets/Picture/presetPlanIcon.jpg" class="rounded img-fluid" alt=""
                  style="max-width: 180px; max-height: 120px;" />
              </div>
            </div>

            <!-- 內文 -->
            <div class="card-body">

              <!-- 方案名稱 -->
              <h4 class="my-4 fw-normal">{{ subscribeTitle }}</h4>

              <!-- 方案價格 -->
              <h3 class="card-title pricing-card-title">NT${{ subscribePrice }}<small
                  class="text-muted fw-light">/mo</small>
              </h3>

              <!-- 方案內容 -->
              <ul class="list-unstyled mt-3 mb-4">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h3 class="accordion-header">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapse" aria-expanded="false" aria-controls="collapse"
                        style="max-width: 440px">
                        <h5>方案內容</h5>
                      </button>
                    </h3>

                    <!-- 方案敘述 -->
                    <div id="collapse" class="accordion-collapse collapse" aria-labelledby="heading"
                      data-bs-parent="#accordion" style="max-width: 440px">
                      <div class="accordion-body">
                        {{ subscribeDescription }}
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div class="button-div" style="display: flex; justify-content: center">
          <v-btn type="button" @click="submitForm" style="width: 400px">
            送出方案
          </v-btn>
        </div>
      </div>


      <!--編輯區塊-->
      <div class="subscribe-edit-div">
        <div class="subscribe-text-form">
          <div class="subscribe-text-form-center">
            <v-sheet width="600">
              <v-form @submit.prevent>
                <h4>標題</h4>
                <v-text-field v-model="subscribeTitle" :rules="subscribeTitleRules" :counter="20" :maxlength="20"
                  label="標題"></v-text-field>

                <h4>費用</h4>
                <v-text-field v-model="subscribePrice" :rules="subscribePriceRules" :counter="4" :maxlength="4"
                  label="費用"></v-text-field>

                <h4>方案內容</h4>
                <v-textarea v-model="subscribeDescription" :rules="subscribeDescriptionRules" :counter="250"
                  :maxlength="250" label="敘述你的圖片或相關內容" no-resize style="width:600px" />
              </v-form>
            </v-sheet>
            <h4>方案圖片</h4>
          </div>
        </div>

        <!--圖片上傳-->
        <div class="wrapper">
          <div style="border: 1px solid #ccc; margin-left: 32px; margin-right: 32px ; border-radius: 16px">
            <div class="avatar-div" v-if="user.avatar">
              <img :src="user.avatar" class="avatar" alt="" />
            </div>
            <div class="avatar-div" v-else>
              <img :src="previewPicture" class="avatar" alt="" />
            </div>

            <div class="upload-and-delete-button-div" style="display: flex; justify-content: center">
              <div class="upload-button-div">
                <v-btn type="button" @click="changeCropperVisibility" style="width: 160px">
                  上傳訂閱圖片
                </v-btn>
              </div>

              <div class="delete-button-div">
                <v-btn v-if="user.avatar" type="button" @click="removePhoto" style="width: 160px">
                  刪除圖片
                </v-btn>
              </div>
            </div>
            <div style="display: flex; justify-content: center">
              <p style="color: red">{{ message }}</p>
            </div>
          </div>

          <avatar-cropper class="custom-avatar-cropper" v-model="showCropper" :cropper-options="{
            aspectRatio: 1.5,
            autoCropArea: 1,
            viewMode: 1,
            movable: false,
            zoomable: true,
          }" :mimes="'image/png, image/jpg, image/jpeg'" :upload-handler="handleUploaded" @changed="onChanged"
            :output-options="{}" :labels="{ submit: '上傳', cancel: '取消' }" />
        </div>


      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.create-subscribe-block {
  height: 720px;
  display: flex;
  padding: 16px;
  //border: 1px solid blue;
}

.subscribe-view-div {
  width: 40%;
  height: 100%;
  align-items: center;
  margin-right: 8px;
  //border: 1px solid green;
}

.subscribe-edit-div {
  width: 60%;
  margin-left: 8px;
  //border: 1px solid red;
}

.subscribe-text-form {
  display: flex;
  margin-top: 16px;
  margin-left: 16px;
  justify-content: center;
}

.wrapper {
  margin: 15px auto;
}

.avatar-div {
  min-width: 100%;
  min-height: 160px;
}

.upload-button-div {
  text-align: center;
  margin: 40px 0;
}

.delete-button-div {
  text-align: center;
  margin: 40px 0;
}

.avatar {
  width: 200px;
  height: 200px;
  //border-radius: 50%;
  display: block;
  object-fit: contain;
  margin: 20px auto;
}

.empty-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  width: 200px;
  height: 200px;
  //border-radius: 50%;

  &>p {
    margin: 0;
    font-size: 3rem;
    color: white;
  }
}

::v-deep(.cropper-view-box) {
  //border-radius: 50%;
}

::v-deep(.cropper-line) {
  background-color: #ff5722;
}

::v-deep(.cropper-point) {
  background-color: #ff5722;
}

::v-deep(.avatar-cropper .avatar-cropper-mark) {
  background: rgb(0 0 0 / 50%);
}

::v-deep(.cropper-modal) {
  opacity: 0.1;
}

::v-deep(.avatar-cropper .avatar-cropper-container) {
  border-radius: 16px;
  overflow: hidden;
}

::v-deep(.avatar-cropper .avatar-cropper-container .avatar-cropper-footer .avatar-cropper-btn:hover) {
  background-color: #f47c20;
}
</style>
