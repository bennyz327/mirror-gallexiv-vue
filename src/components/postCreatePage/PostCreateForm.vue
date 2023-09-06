<script setup>
import {ref, watch} from "vue";

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

</script>

<template>

  <div class="form-data-block">

    <!--文字輸入區域-->
    <div class="title-description-div">
      <div class="title-description-center">
        <v-sheet class="mx-auto">
          <v-form @submit.prevent>
            <h5 style="text-align: left">文章標題</h5>
            <v-text-field
                v-model="postTitle"
                :rules="postTitleRules"
                :counter="30"
                :maxlength="30"
                label="文章標題"
                style="width:600px"/>

            <h5 style="text-align: left">文章敘述</h5>
            <v-textarea
                v-model="postDescription"
                :rules="postDescriptionRules"
                :counter="250"
                :maxlength="250"
                label="文章敘述"
                no-resize
                style="width:600px"/>

            <v-btn type="submit" block class="mt-3">Submit</v-btn>
          </v-form>
        </v-sheet>
      </div>
    </div>

    <!--勾選及HashTag區域-->
    <div class="checkbox-and-tag-div">
      <div class="checkbox-and-tag-center">

        <div class="checkbox-nfsw">
          <h5 style="text-align: left; display: block">年齡及閱覽限制</h5>
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
          <h5 style="text-align: left; display: block">公開範圍</h5>
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

  </div>
</template>

<style scoped>
.form-data-block {
  display: flex;
  flex-wrap: wrap;
}

.title-description-div {
  flex: 1;
  width: 50%;
  max-width: 50%;
  float: left;
}

.title-description-center {
  display: flex;
  text-align: center;
}

.checkbox-and-tag-div {
  flex: 1;
  width: 50%;
  max-width: 50%;
}

.checkbox-and-tag-center {

}
</style>