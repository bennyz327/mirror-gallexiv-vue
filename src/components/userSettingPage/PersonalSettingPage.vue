<script setup>
import SettingPageInputTextComponent from "@/components/userSettingPage/SettingPageInputTextComponent.vue";

import {ref} from "vue";
import AvatarCropper from "vue-avatar-cropper";
import axios from "axios";
import {useUserStore} from "@/store/userStore.js";

const maxFileSize = 2;
const showCropper = ref(true);
const message = ref("");

const user = ref({
  id: "",
  avatar: "",
});

const {token} = useUserStore();
const getData = ref([]);
const URL = import.meta.env.VITE_API_USER

const getUserData = async () => {

  try {

    //todo 變成perfume
    const response = await axios.get(`${URL}/profile`,{headers: {'Authorization': token}
    });
    getData.value = response.data.data;
    user.value.avatar = getData.value.avatar;

    console.log(user.value.avatar)

  }catch (error){
    console.error('提交表单时出错：', error);
  }
}
getUserData();


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
};
</script>

<template>

  <div class="personal-setting-block">

    <!--左邊分區(頭像)-->
    <div class="personal-setting-div-left">

      <div class="user-icon-setting-div">
        <div class="wrapper">
          <div>
            <div class="avatar-div" v-if="true">
              <img :src="user.avatar" class="avatar" alt=""/>
            </div>
            <div class="avatar-div" v-else>
              <img src="../../assets/Picture/presetUserIcon.png" class="avatar" alt=""/>
            </div>

            <div class="upload-button-div">
              <v-btn type="button" @click="changeCropperVisibility" style="width: 160px">
                上傳頭像
              </v-btn>
            </div>

            <div class="delete-button-div">
              <v-btn v-if="user.avatar" type="button" @click="removePhoto" style="width: 160px">
                刪除照片
              </v-btn>
            </div>

          </div>

          <p style="color: red">{{ message }}</p>

          <avatar-cropper
              class="custom-avatar-cropper"
              v-model="showCropper"
              :cropper-options="{
        aspectRatio: 1,
        autoCropArea: 1,
        viewMode: 1,
        movable: false,
        zoomable: true,
      }"
              :mimes="'image/png, image/jpg, image/jpeg'"
              :upload-handler="handleUploaded"
              @changed="onChanged"
              :output-options="{ width: 120, height: 120 }"
              :labels="{ submit: '上傳', cancel: '取消' }"
          />
        </div>
      </div>

    </div>

    <!--右邊分區(文字修改區塊)-->
    <div class="personal-setting-div-right">

      <div class="edit-setting-div">
        <SettingPageInputTextComponent></SettingPageInputTextComponent>
      </div>

    </div>

  </div>


</template>

<style lang="scss" scoped>
.personal-setting-block {
  display: flex;
  width: 100%;
  height: 640px;
  padding: 16px;
  //border: 3px solid red;
}

.personal-setting-div-left {
  float: left;
  width: 30%;
  border-right: 1px solid #ccc;

}

.personal-setting-div-right {
  width: 70%;
  //border: 3px solid blue
}

.wrapper {
  margin: 15px auto;
}

.avatar-div {
  margin-top: 80px;
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
  width: 160px;
  height: 160px;
  border-radius: 50%;
  display: block;
  margin: 20px auto;
}

.empty-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  margin-top: 80px;
  width: 160px;
  height: 160px;
  border-radius: 50%;

  & > p {
    margin: 0;
    font-size: 3rem;
    color: white;
  }
}

.custom-avatar-cropper {
  width: 300px;
  height: 300px;
}

::v-deep(.cropper-view-box) {
  border-radius: 50%;
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

::v-deep(.avatar-cropper
    .avatar-cropper-container
    .avatar-cropper-footer
    .avatar-cropper-btn:hover) {
  background-color: #f47c20;
}

</style>