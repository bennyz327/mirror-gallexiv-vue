<script setup>
import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
import {useField, useForm} from 'vee-validate';
import {onMounted, onUpdated, ref} from "vue";
import AvatarCropper from "vue-avatar-cropper";
import axios from "axios";
import {useUserStore} from "@/store/userStore.js";

const facebooklink = useField('facebooklink')
const youtubelink = useField('youtubelink')
const twitterlink = useField('twitterlink')
const otherlink = useField('otherlink')
const {token} = useUserStore();
const isGetData = ref('no');

const props = defineProps({
  userPersonalLinkList: Object
})

onUpdated(() => {
  if (isGetData.value === 'no' && props.userPersonalLinkList.length > 0) {
    console.log(props.userPersonalLinkList)
    props.userPersonalLinkList.forEach((item) => {
      console.log(item);
      if (item.linkSite === "facebook") {
        facebooklink.value.value = item.linkSource;
        console.log(facebooklink.value.value)
      } else if (item.linkSite === "youtube") {
        youtubelink.value.value = item.linkSource
      } else if (item.linkSite === "twitter") {
        twitterlink.value.value = item.linkSource
      } else if (item.linkSite === "other") {
        otherlink.value.value = item.linkSource
      }
    })
    isGetData.value = 'yes';
  }
  // console.log(facebooklink.value.value)
})


const maxFileSize = 4;
const showCropper = ref(true);
const message = ref("");

const user = ref({
  id: 1,
  backgroundPicture: "",
});

const handleUploaded = (data) => {
  const base64str = data.url.substring(data.url.indexOf(",") + 1);
  const decoded = atob(base64str);
  const decodedFileSize = decoded.length / 1024 ** 2;

  if (decodedFileSize > maxFileSize) {
    message.value =
        "這張圖片太大了(超過4MB)請嘗試將它縮小後再上傳";

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

const updateLink = () => {
  const confirmRs = confirm('確定要更新資料嗎?');
  if (confirmRs) {
    console.log(facebooklink.value.value)
    console.log(youtubelink.value.value)
    console.log(twitterlink.value.value)
    console.log(otherlink.value.value)
    console.log('準備更新資料')
    const LinkMap = {
      facebook: facebooklink.value.value,
      youtube: youtubelink.value.value,
      twitter: twitterlink.value.value,
      other: otherlink.value.value
    }

    const url = import.meta.env.VITE_API_USER + '/updateLinks'
    axios.put(url, LinkMap, {headers: {'Authorization': token}})
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
  }

}

</script>

<template>
  <div class="link-and-search-block">

    <div class="person-page-link-setting-block">
      <div class="global-search-text-div" style="margin: 24px">
        <h4>個人外部連結設定</h4>
      </div>

      <div style="height: 24px"></div>

      <div class="link-setting-div">
        <div class="link-setting">
          <h6>FaceBook連結</h6>
        </div>
        <v-text-field
            v-model="facebooklink.value.value"
            :counter="300"
            :error-messages="errors"
            label="Facebook連結"
            class="form-facebooklink-text"
            @input="validateFacebookLink"
        ></v-text-field>
      </div>
      <div class="link-setting-div">
        <div class="link-setting">
          <h6>Youtube連結</h6>
        </div>
        <v-text-field
            v-model="youtubelink.value.value"
            :counter="300"
            :error-messages="errors"
            label="YouTube連結"
            class="form-youtubelink-text"
            @input="validateYouTubeLink"
        ></v-text-field>
      </div>
      <div class="link-setting-div">
        <div class="link-setting">
          <h6>Twitter連結</h6>
        </div>
        <v-text-field
            v-model="twitterlink.value.value"
            :counter="300"
            :error-messages="errors"
            label="Twitter連結"
            class="form-twitterlink-text"
            @input="validateTwitterLink"
        ></v-text-field>
      </div>
      <div class="link-setting-div">
        <div class="link-setting">
          <h6>其他連結</h6>
        </div>
        <v-text-field
            v-model="otherlink.value.value"
            :counter="300"
            :error-messages="errors"
            label="其他連結"
            class="form-otherlink-text"
            @input="validateOtherLink"
        ></v-text-field>
      </div>

      <div class="submit-button-div" style="display: flex; justify-content: center; margin-top: 16px">
        <v-btn class="me-4" type="submit" @click="updateLink">
          送出修改
        </v-btn>
      </div>

    </div>


    <div class="global-search-setting-block">

      <div class="global-search-text-div" style="margin: 16px">
        <h4>搜尋選項</h4>
      </div>

      <div style="height: 24px"></div>

      <div class="global-search-radio-div" style="display: flex; margin: 16px; justify-content: center">
        <div class="global-search-text-div">
          <h6>NFSW類型的作品</h6>
        </div>
        <div class="global-search-radio" style="margin-left: 16px">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="NFSWEnable" value="option1"
                   checked="true">
            <label class="form-check-label" for="NFSWEnable">顯示</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="NFSWDisable" value="option2">
            <label class="form-check-label" for="NFSWDisable">隱藏</label>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center">
        <hr style="width: 80%">
      </div>

      <div class="wrapper">
        <div>
          <div class="avatar-div" v-if="user.avatar">
            <img :src="user.avatar" class="avatar" alt=""/>
          </div>
          <div class="avatar-div" v-else>
            <img src="../../assets/Picture/presetBackgroundIcon.jpg" class="avatar" alt=""/>
          </div>

          <div class="upload-and-delete-button-div" style="display: flex; justify-content: center">
            <div class="upload-button-div">
              <v-btn type="button" @click="changeCropperVisibility" style="width: 160px">
                上傳背景
              </v-btn>
            </div>

            <div class="delete-button-div">
              <v-btn v-if="user.avatar" type="button" @click="removePhoto" style="width: 160px">
                刪除背景
              </v-btn>
            </div>
          </div>
        </div>

        <div style="display: flex; justify-content: center">
          <p style="color: red">{{ message }}</p>
        </div>

        <avatar-cropper
            class="custom-avatar-cropper"
            v-model="showCropper"
            :cropper-options="{
        aspectRatio: 1.7,
        autoCropArea: 1,
        viewMode: 1,
        movable: false,
        zoomable: true,
      }"
            :mimes="'image/png, image/jpg, image/jpeg'"
            :upload-handler="handleUploaded"
            @changed="onChanged"
            :output-options="{}"
            :labels="{ submit: '上傳', cancel: '取消' }"
        />
      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>
.link-and-search-block {
  display: flex;
  padding: 16px;
  height: 640px;
}

.global-search-setting-block {
  width: 40%;
  max-width: 40%;
  margin: 8px;
  //border: 2px solid red;
}

.person-page-link-setting-block {
  width: 60%;
  max-width: 60%;
  margin: 8px;
  float: left;
  border-right: 1px solid #ccc;
  //border: 2px solid blue;
}

.link-setting-div {
  margin-left: 24px;
  width: 90%;
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
  margin-top: 80px;
  width: 200px;
  height: 200px;
  //border-radius: 50%;

  & > p {
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

::v-deep(.avatar-cropper
    .avatar-cropper-container
    .avatar-cropper-footer
    .avatar-cropper-btn:hover) {
  background-color: #f47c20;
}

</style>