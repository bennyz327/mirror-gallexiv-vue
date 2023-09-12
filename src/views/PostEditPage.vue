<script setup>
import Navbar from "@/components/Navbar.vue";

import {ref} from 'vue';
import axios from 'axios';

const postTitle = ref('');
const postDescription = ref('');
const tags = ref([]);
const URL = import.meta.env.VITE_API_Post;


const submitForm = async () => {
  const postData = {
    postId:1,
    userId:1,
    postTitle: postTitle.value,
    postContent: postDescription.value,
    tagArr: tags.value

    // 其他需要发送的数据字段
  };
  console.log(postData)

  try {
    const response = await axios.put(`${URL}/update`, postData);

    if (response.status === 200) {
      // 重定向到成功页面或其他页面
      // 注意：你需要使用Vue Router的实例来导航，这里假设已经安装并配置了Vue Router
      // import { useRouter } from 'vue-router';
      // const router = useRouter();
      // router.push('/success');
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
                <h5 style="text-align: left; display: block">公開範圍</h5>
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

            <h5 style="text-align: left; display: block">Tag</h5>
            <div class="tag-div" style="margin: 8px">
              <n-dynamic-tags v-model:value="tags"
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