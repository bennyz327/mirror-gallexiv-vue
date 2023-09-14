<script setup>
import Navbar from "@/components/Navbar.vue";

import '../assets/js/upload/jquery-1.8.3.min.js'
import '../assets/css/upload/index.css'
import '../assets/css/upload/common.css'
import {useUserStore} from "@/store/userStore.js";


import {onMounted, ref, watch} from "vue";
const {token} = useUserStore()
import axios from "axios";

const postTitle = ref("");
const postContent = ref("");

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

const postContentRules = [
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
const postAgeLimit = ref(0);
const postPublic = ref(0);
const URL = import.meta.env.VITE_API_Post;



const submitForm = async () => {
  const formattedDescription = postContent.value.replace(/\n/g, '<br/>');
  const postData = {
    postTitle: postTitle.value,
    postContent: postContent.value,
    postAgeLimit: postAgeLimit.value,
    postPublic: postPublic.value,
    tagArr: tags.value,
  };
  const pictureData = {
    picturesByPostId: file.value,
  }
  console.log(postData)

  try {
    const response = await axios.post(`${URL}/insert`, postData,{headers: {'Authorization': token}
    });
    if (response.status === 200) {
      // 重定向到成功页面或其他页面
      // 注意：你需要使用Vue Router的实例来导航，这里假设已经安装并配置了Vue Router
      // import { useRouter } from 'vue-router';
      // const router = useRouter();
      // router.push('/success');
    }
    console.log('JSON內容： ', response.data);
    console.log("自我介紹内容：", formattedDescription);
  } catch (error) {
    console.error('提交表单时出错：', error);
  }
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
                    v-model="postContent"
                    :rules="postContentRules"
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
                  <input class="form-check-input" type="radio" name="NSFWRadio" id="NSFWFalse"  value="0" v-model="postAgeLimit" checked>
                  <label class="form-check-label" for="NSFWFalse">
                    無限制
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="NSFWRadio" id="NSFWTrue" value="1" v-model="postAgeLimit">
                  <label class="form-check-label" for="NSFWTrue">
                    未成年不宜觀看
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <div class="checkbox-public">
              <div class="text-div">
                <h5 style="text-align: left; display: block">公開範圍</h5>
              </div>
              <div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicTrue"  value="0" v-model="postPublic" checked>
                  <label class="form-check-label" for="publicTrue">
                    公開
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicFalse" value="0" v-model="postPublic">
                  <label class="form-check-label" for="publicFalse">
                    不公開
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <h5 style="text-align: left; display: block">Tag</h5>
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

</style>