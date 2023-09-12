<script setup>
import Navbar from "@/components/Navbar.vue";

import '../assets/js/upload/jquery-1.8.3.min.js'
import '../assets/css/upload/index.css'
import '../assets/css/upload/common.css'


import {onMounted, ref, watch} from "vue";

const postTitle = ref("");
const postDescription = ref("");

const postTitleRules = [
  (value) => {
    if (value && value.length <= 30 && value.trim().length > 0) {
      return true;
    } else if (!value || value.trim().length === 0) {
      return "至少必須輸入一個字元作為標題";
    } else {
      return "字數不能超過 30 個字";
    }
  },
];

const postDescriptionRules = [
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

// tag function並且取得value
const tags = ref([]);
const tagsAsJson = ref(JSON.stringify(tags.value));
watch(tags, (newTags) => {
  console.log(newTags);
  tagsAsJson.value = JSON.stringify(newTags);
});

// json傳入功能
const nsfw = ref(true);
const isPublic = ref(true);

const submitForm = () => {
  const formattedDescription = postDescription.value.replace(/\n/g, '<br/>');
  const postData = {
    title: postTitle.value,
    description: formattedDescription.value,
    nsfw: nsfw.value,
    isPublic: isPublic.value,
    tags: tags.value,
  };

  console.log("自我介紹内容：", formattedDescription);
  console.log('JSON內容： ', postData);
};


function loadLibrary(libraryPath) {
  let newScript = document.createElement('script')
  newScript.setAttribute('src', libraryPath)
  document.head.appendChild(newScript)
}

onMounted(() => {
  loadLibrary("/src/assets/js/upload/imgUp.js")
});


</script>

<template>

  <Navbar></Navbar>

  <div class="container">
    <div class="text-div">
      <h4>新增文章</h4>
    </div>

    <div class="create-form-block">

      <!--上傳圖片區塊-->
      <div class="upload-block">
        <div class="img-box full">
          <section class=" img-section">
            <div class="z_photo upimg-div clear">
              <section class="z_file fl">
                <img src="/src/assets/Picture/upload/plusButton.png" class="add-img">
                <input type="file" name="file" id="file" class="file" value=""
                       accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif" multiple/>
              </section>
            </div>
          </section>
          <!--        <p class="up-p">作品圖片<span class="up-span">最多可以上傳二十張圖片</span></p>-->
        </div>
        <aside class="mask works-mask">
          <div class="mask-content">
            <p class="del-p ">您確定要刪除作品嗎</p>
            <p class="check-p"><span class="del-com wsdel-ok">確定</span><span class="wsdel-no">取消</span></p>
          </div>
        </aside>
      </div>


      <div class="form-data-block">
        <!--文字輸入區域-->
        <div class="title-description-div">
          <div class="title-description-center">
            <v-sheet class="mx-auto">
              <v-form @submit.prevent>
                <h6 style="text-align: left">標題</h6>
                <v-text-field
                    v-model="postTitle"
                    :rules="postTitleRules"
                    :counter="30"
                    :maxlength="30"
                    bg-color="white"
                    label="標題"
                    class="v-text-field-css"
                />

                <h6 style="text-align: left">內文</h6>
                <v-textarea
                    v-model="postDescription"
                    :rules="postDescriptionRules"
                    :counter="250"
                    :maxlength="250"
                    bg-color="white"
                    placeholder
                    label="敘述你的圖片或相關內容"
                    no-resize
                    class="v-text-field-css"
                />
              </v-form>
            </v-sheet>
          </div>
        </div>

        <!--勾選及HashTag區域-->
        <div class="checkbox-and-tag-div">
          <div class="checkbox-and-tag-center">

            <div class="checkbox-nfsw">
              <div class="text-div">
                <h6 style="text-align: left; display: block">年齡及閱覽限制</h6>
              </div>
              <div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="NSFWRadio" id="NSFWFalse" checked>
                  <label class="form-check-label" for="NSFWFalse">
                    無限制
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="NSFWRadio" id="NSFWTrue">
                  <label class="form-check-label" for="NSFWTrue">
                    未成年不宜觀看
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <div class="checkbox-public">
              <div class="text-div">
                <h6 style="text-align: left; display: block">公開範圍</h6>
              </div>
              <div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicTrue" checked>
                  <label class="form-check-label" for="publicTrue">
                    公開
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicFalse">
                  <label class="form-check-label" for="publicFalse">
                    不公開
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <h6 style="text-align: left; display: block">Tag</h6>
            <div class="tag-div" style="margin: 8px">
              <n-dynamic-tags v-model:value="tags"
                              max="10"
                              size="large"
              />
            </div>

          </div>
        </div>

        <v-btn @click="submitForm" block class="mt-2" size="60px">推送貼文</v-btn>
      </div>
    </div>
  </div>

</template>

<style scoped>

.create-form-block {
  width: 100%;

}

.form-data-block {
  display: flex;
  flex-wrap: wrap;
}

.title-description-div {
  width: 50%;
  max-width: 50%;
  float: left;
//border-right: 1px solid #ccc;
}

.title-description-center {
  display: flex;
  text-align: center;
}

.checkbox-and-tag-div {
  width: 50%;
  max-width: 50%;
//border-left: 1px solid #ccc;
}

.checkbox-and-tag-center {
  width: 90%;
  padding-left: 48px;
}

.v-text-field-css {
  width: 560px;
}

@media screen and (max-width: 1400px) {

}

@media screen and (max-width: 1200px) {
  .v-text-field-css {
    width: 360px;
  }
  .upload-block{

  }
}

</style>