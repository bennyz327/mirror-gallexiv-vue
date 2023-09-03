<script setup>
import { ref } from "vue";
import AvatarCropper from "vue-avatar-cropper";

const maxFileSize = 4;
const showCropper = ref(true);
const message = ref("");

const user = ref({
  id: 1,
  avatar: "",
});

const handleUploaded = (data) => {
  const base64str = data.url.substring(data.url.indexOf(",") + 1);
  const decoded = atob(base64str);
  const decodedFileSize = decoded.length / 1024 ** 2;

  if (decodedFileSize > maxFileSize) {
    message.value =
        "這張圖片太大了(超過1MB)請嘗試將它縮小後再上傳";

    setTimeout(() => {
      message.value = "";
    }, 2500);
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
  <div class="wrapper">
    <div>
      <div class="avatar-div" v-if="user.avatar">
      <img :src="user.avatar" class="avatar" alt=""/>
      </div>
      <div class="avatar-div" v-else>
        <img src="../../assets/Picture/presetUserIcon.png" class="avatar" alt=""/>
      </div>

      <div class="upload-button-div">
        <button class="btn btn-outline-secondary" type="button" @click="changeCropperVisibility" style="width: 160px">
          上傳頭像
        </button>
      </div>

      <div class="delete-button-div">
        <button class="btn btn-outline-secondary" v-if="user.avatar" type="button" @click="removePhoto" style="width: 160px">
          刪除照片
        </button>
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
        :output-options="{ width: 96, height: 96 }"
        :labels="{ submit: '上傳', cancel: '取消' }"
    />
  </div>
</template>

<style lang="scss" scoped>

.wrapper {
  margin: 15px auto;
}

.avatar-div{
  margin-top: 80px;
  min-width: 100%;
  min-height: 160px;
}

.upload-button-div{
  text-align: center;
  margin: 40px 0;
}

.delete-button-div{
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

.custom-avatar-cropper{
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