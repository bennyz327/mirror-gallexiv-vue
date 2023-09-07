<script setup>
import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';
import {useField, useForm} from 'vee-validate';
import {onMounted} from "vue";

const facebooklink = useField('facebooklink')
const youtubelink = useField('youtubelink')
const twitterlink = useField('twitterlink')
const otherlink = useField('otherlink')

function loadLibrary(libraryPath) {
  let newScript = document.createElement('script')
  newScript.setAttribute('src', libraryPath)
  document.head.appendChild(newScript)
}
onMounted(() => {
  loadLibrary("/src/assets/js/uploadSinglePicture");
});


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
            :counter="20"
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
            :counter="20"
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
            v-model="youtubelink.value.value"
            :counter="20"
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
            :counter="20"
            :error-messages="errors"
            label="其他連結"
            class="form-otherlink-text"
            @input="validateOtherLink"
        ></v-text-field>
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
            <label class="form-check-label" for="enable">顯示</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="NFSWDisable" value="option2">
            <label class="form-check-label" for="disable">隱藏</label>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center"><hr style="width: 80%"></div>

      <div class="global-search-text-div" style="margin: 16px">
        <h4>個人頁面背景圖片</h4>
      </div>

      <div class="background-picture-upload-div">
        <div class="upload-box">
          <input type="file" accept="image/png,image/jpeg,image/jpg" class="upload-input"/>
          <div class="upload-action"></div>
          <div class="preview-box" style="object-fit: cover"></div>
        </div>
      </div>

      <div class="submit-button-div" style="display: flex; justify-content: center;">
        <v-btn class="me-4" type="submit">
          送出修改
        </v-btn>
      </div>
    </div>


  </div>
</template>

<style scoped>
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

.upload-box {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 50px auto;
  overflow: hidden;
  border: 1px dashed #ccc;
  text-align: center;
  &::after {
    display: inline-block;
    margin-top: -8px;
    content: "+";
    line-height: 200px;
    font-size: 90px;
    color: #ccc;
  }

  .preview-box img{
    object-fit: contain;
  }

  [type="file"] {
    display: none;
  }

  .upload-action {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .preview-box {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    img {
      min-width: 100%;
      width: 100%;
      min-height: 100%;
    }
  }
}

.hide {
  display: none;
}
</style>