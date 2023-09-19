<script setup>
import Navbar from "@/components/Navbar.vue";

import {ref} from 'vue';
import axios from 'axios';
import {useUserStore} from "@/store/userStore.js";
import {useRoute} from "vue-router";

const id = ref(0)
const getData = ref([]);

const postTitle = ref('');
const postDescription = ref('');
const tags = ref([]);
const postAgeLimit = ref(0);
const postPublic = ref(0);
const URL = import.meta.env.VITE_API_Post;
const tagsArray = ref([]);
const {token} = useUserStore();

const route = useRoute();
const postId = ref(route.query.postId || ''); //  接收來自router的值以外要讓他成為ref可以更新資料
console.log(postId)
const getPostData = async () => {

  try {
    const response = await axios.get(`${URL}/${postId.value}`,{headers: {'Authorization': token}})
    getData.value = response.data;
    postTitle.value = getData.value.data.postTitle;
    postDescription.value=getData.value.data.postContent;
    postPublic.value= getData.value.data.postPublic;
    postAgeLimit.value=getData.value.data.postAgeLimit;
    tags.value=getData.value.data.tagsByPostId;

    console.log(getData.value)
    console.log(tags.value)
    console.log(response)

    tagsArray.value = tags.value.map(tag => tag.tagName);

    console.log(tagsArray)

  }catch (error){
    console.error('提交表单时出错：', error);
  }
}
getPostData();


const submitForm = async () => {

  const postData = getData.value.data;
  postData.postTitle = postTitle.value;
  postData.postContent = postDescription.value;
  postData.postAgeLimit = postAgeLimit.value;
  postData.postPublic = postPublic.value;
  postData.tagsByPostId = tagsArray.value;

  console.log(postData)

  try {
    const response = await axios.put(`${URL}/update`, postData,{headers: {'Authorization': token}});

    if (response.status === 200) {
      // 重定向到成功页面或其他页面
      // 注意：你需要使用Vue Router的实例来导航，这里假设已经安装并配置了Vue Router
      // import { useRouter } from 'vue-router';
      // const router = useRouter();
      // router.push('/success');
      console.log("回應")
      console.log(response.data)
    }
  } catch (error) {
    console.error('提交表单时出错：', error);
  }
};

</script>

<template>
  <Navbar></Navbar>

  <div class="container">
    <div class="text-div">
      <h3>編輯文章</h3>
    </div>
    <div class="edit-form-block">

      <div class="form-data-block">
        <!--文字輸入區域-->
        <div class="title-description-div">
          <div class="title-description-center">
            <v-sheet class="mx-auto">
              <v-form @submit.prevent>
                <h5 style="text-align: left">標題</h5>
                <v-text-field
                    v-model="postTitle"
                    :rules="postTitleRules"
                    :counter="30"
                    :maxlength="30"
                    label="標題"
                    style="width:600px"/>

                <h5 style="text-align: left">內文</h5>
                <v-textarea
                    v-model="postDescription"
                    :rules="postDescriptionRules"
                    :counter="250"
                    :maxlength="250"
                    label="敘述你的圖片或相關內容"
                    no-resize
                    style="width:600px"/>
              </v-form>
            </v-sheet>
          </div>
        </div>

        <!--勾選及HashTag區域-->
        <div class="checkbox-and-tag-div">
          <div class="checkbox-and-tag-center">

            <div class="checkbox-nfsw">
              <div class="text-div">
                <h5 style="text-align: left; display: block">年齡及閱覽限制</h5>
              </div>
              <div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="NSFWRadio" id="NSFWFalse" value="0" v-model="postAgeLimit" checked>
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
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicTrue" value="0" v-model="postPublic" checked>
                  <label class="form-check-label" for="publicTrue">
                    公開
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicFalse" value="1" v-model="postPublic">
                  <label class="form-check-label" for="publicFalse">
                    不公開
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <h5 style="text-align: left; display: block">Tag</h5>
            <div class="tag-div" style="margin: 8px">
              <n-dynamic-tags v-model:value="tagsArray"
                              max="10"
                              size="large"

              />
            </div>

          </div>
        </div>

        <v-btn @click="submitForm" block class="mt-2" size="60px">送出編輯</v-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>

.edit-form-block {
  width: 100%;
  margin-top: 32px;
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