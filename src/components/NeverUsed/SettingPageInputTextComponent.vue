<script setup>

import {ref, watch, defineProps} from 'vue'
import {useField, useForm} from 'vee-validate'
import {NDatePicker} from "naive-ui";
import axios from "axios";
import {useUserStore} from "@/store/userStore.js";

const selectedCountry = ref(null);
const email = useField('email')
const select = useField('select')

// 選擇國家
const countries = ref(['阿富汗', '阿爾巴尼亞', '阿爾及利亞', '安道爾', '安哥拉', '安提瓜和巴布達', '阿根廷', '亞美尼亞', '澳大利亞', '奧地利', '阿塞拜疆', '巴哈馬', '巴林', '孟加拉', '巴巴多斯', '白俄羅斯', '比利時', '貝里斯', '貝寧', '不丹', '玻利維亞', '波斯尼亞和黑塞哥維那', '博茨瓦納', '巴西', '保加利亞', '布基納法索', '布隆迪', '柬埔寨', '喀麥隆', '加拿大', '佛得角', '中非共和國', '乍得', '智利', '中國', '哥倫比亞', '科摩羅', '剛果（布）', '剛果（金）', '哥斯大黎加', '克羅地亞', '古巴', '賽普勒斯', '捷克共和國', '丹麥', '吉布提', '多明尼加共和國', '東帝汶', '厄瓜多爾', '埃及', '薩爾瓦多', '赤道幾內亞', '厄立特里亞', '愛沙尼亞', '埃塞俄比亞', '斐濟', '芬蘭', '法國', '加蓬', '岡比亞', '喬治亞', '德國', '加納', '希臘', '格林納達', '危地馬拉', '幾內亞', '幾內亞比紹', '圭亞那', '海地', '洪都拉斯', '匈牙利', '冰島', '印度', '印尼', '伊朗', '伊拉克', '愛爾蘭', '以色列', '義大利', '牙買加', '日本', '約旦', '哈薩克', '肯尼亞', '吉里巴斯', '科威特', '吉爾吉斯', '老撾', '拉脫維亞', '黎巴嫩', '萊索托', '利比里亞', '利比亞', '列支敦士登', '立陶宛', '盧森堡', '馬其頓', '馬達加斯加', '馬拉維', '馬來西亞', '馬爾代夫', '馬利', '馬爾他', '茅利塔尼亞', '毛里求斯', '墨西哥', '密克羅尼西亞', '摩爾多瓦', '摩納哥', '蒙古', '黑山', '摩洛哥', '莫桑比克', '緬甸', '納米比亞', '瑙魯', '尼泊爾', '荷蘭', '紐西蘭', '尼加拉瓜', '尼日爾', '尼日利亞', '朝鮮', '挪威', '阿曼', '巴基斯坦', '帛琉', '巴拿馬', '巴布亞新幾內亞', '巴拉圭', '秘魯', '菲律賓', '波蘭', '葡萄牙', '卡塔爾', '羅馬尼亞', '俄羅斯', '盧旺達', '聖克里斯多福及尼維斯', '聖盧西亞', '聖文森特和格林納丁斯', '薩摩亞', '聖馬力諾', '聖多美和普林西比', '沙烏地阿拉伯', '塞內加爾', '塞爾維亞', '塞席爾', '塞拉利昂', '新加坡', '斯洛伐克', '斯洛維尼亞', '所羅門群島', '索馬里', '南非', '韓國', '南蘇丹', '西班牙', '斯里蘭卡', '蘇丹', '蘇里南', '斯威士蘭', '瑞典', '瑞士', '敘利亞', '塔吉克', '坦桑尼亞', '泰國', '東帝汶', '多哥', '湯加', '千里達和多巴哥', '突尼斯', '土耳其', '土庫曼', '圖瓦盧', '烏干達', '烏克蘭', '阿聯酋', '英國', '美國', '烏拉圭', '烏茲別克', '瓦努阿圖', '梵蒂岡', '委內瑞拉', '越南', '也門', '贊比亞', '津巴布韋', '臺灣']
)

// 暱稱編輯部分
const personalNickName = ref('');
const personalNickNameRules = [
  (value) => {
    if (value && value.length <= 20 && value.trim().length > 0) {
      return true;
    } else if (!value || value.trim().length === 0) {
      return "至少必須輸入1個字元作為標題";
    } else {
      return "字數不能超過 20 個字";
    }
  },
];

// email編輯功能

// email的空值
const personalEmail = ref('');

const emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
const personalEmailRules = [
  (value) => {
    if (!value) {
      return '請輸入電子郵件';
    } else if (!emailRule.test(value)) {
      return '請輸入有效的電子郵件';
    } else if (value.length > 150) {
      return '電子郵件的長度不得超過150個字元';
    }
    return true;
  },
];

// 自我介紹編輯功能
const personalDescription = ref('');

const personalDescriptionRules = [
  (value) => {
    if (value && value.length <= 300) {
      return true;
    } else if (value && value.length > 300) {
      return "字數不能超過 300 個字";
    } else {
      return true;
    }
  },
];

const logPersonalDescription = () => {
  // 將自我介紹中輸入/n時的換行符號改成<br/>以便到傳入
  const formattedDescription = personalDescription.value.replace(/\n/g, '<br/>');
  // consolelog顯示目前樣式
  console.log("自我介紹内容：", formattedDescription);
}

// 生日表格監聽
const formattedValue = ref(null);
const timestamp = ref(null);

// 監聽 formattedValue 變化
watch(formattedValue, (newValue) => {
  // 將格式化的值改為時間
  const date = new Date(newValue);
  if (!isNaN(date)) {
    timestamp.value = date.getTime();
  } else {
    timestamp.value = null;
  }
});

const {token} = useUserStore();
const getData = ref([]);
const gender = ref("")
const URL = import.meta.env.VITE_API_USER

const getUserData = async () => {
  try {
    const response = await axios.get(`${URL}/profile`, {
      headers: {'Authorization': token}
    });
    getData.value = response.data.data;
    email.value.value = getData.value.userEmail;
    personalNickName.value = getData.value.userName;
    personalDescription.value = getData.value.intro;
    // selectedCountry.value =
    gender.value = getData.value.gender;

    // 输入的日期时间字符串
    var dateTimeString = getData.value.birthday;
    // TODO 空的生日日期不會留空

// 创建一个日期对象
    var dateTime = new Date(dateTimeString);

// 提取日期部分
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1; // 月份从0开始，需要加1
    var day = dateTime.getDate();

// 将月份和日期格式化为字符串，确保单数的月份和日期前面有零
    var formattedMonth = month < 10 ? "0" + month : month.toString();
    var formattedDay = day < 10 ? "0" + day : day.toString();

// 构建最终的日期字符串
    var formattedDateString = year + "-" + formattedMonth + "-" + formattedDay;

    console.log(formattedDateString);
    formattedValue.value = formattedDateString;

  } catch (error) {
    console.error('提交表单时出错：', error);
  }
}
getUserData();


const updateData = async () => {
  try {
    const changeData = getData.value;
    console.log("aa:" + changeData)
    changeData.userEmail = email.value.value;
    console.log("aa:" + changeData.userEmail)
    changeData.userName = personalNickName.value;
    console.log("aa:" + changeData.userName)
    changeData.intro = personalDescription.value;
    console.log("aa:" + changeData.intro)
    changeData.gender = gender.value;
    console.log("aa:" + changeData.gender)
    changeData.birthday = formattedValue
    console.log(changeData.birthday)

    const response = await axios.put(`${URL}/update`, changeData, {
      headers: {'Authorization': token}
    });
    console.log(response.data.data)
  } catch (error) {
    console.error('提交表单时出错：', error);
  }
}

</script>

<template>

  <div class="edit-personal-data-div">

    <form @submit.prevent="submit" style="width: 80%">

      <h6>電子郵件</h6>
      <div class="email-text-div">
        <v-text-field
            v-model="email.value.value"
            label=""
            :error-messages="email.errorMessage.value"
            class="form-email-text"
            disabled="true"
        >
        </v-text-field>

        <!--email更改按鈕-->
        <v-btn data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="margin-left:16px">更換電子郵件</v-btn>
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">email輸入欄位</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <!--介紹修改表格部分-->
                <v-textarea
                    v-model="email.value.value"
                    :rules="personalEmailRules"
                    :counter="300"
                    :maxlength="300"
                    label="請輸入新的電子郵件"
                    no-resize
                    placeholder
                    style="width:100%"/>
              </div>
              <div class="modal-footer">
                <v-btn type="button" data-bs-dismiss="modal">取消</v-btn>
                <v-btn type="button" @click="submitNewEmailForPersonalSetting">確認修改</v-btn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--暱稱部分-->
      <h6>暱稱</h6>
      <div class="nickname-description-div">
        <div class="nickname-form">
          <v-text-field
              v-model="personalNickName"
              :rules="personalNickNameRules"
              :counter="20"
              :maxlength="20"
              label="暱稱"
              bg-color="white"
              class="form-nickname-text"
          ></v-text-field>
        </div>

        <!--自我介紹部分-->
        <div class="description-form">
          <v-btn type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" style="margin-left:16px">
            自我介紹
          </v-btn>

          <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
               aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">自我介紹輸入欄</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <!--介紹修改表格部分-->
                  <v-textarea
                      v-model="personalDescription"
                      :rules="personalDescriptionRules"
                      :counter="300"
                      :maxlength="300"
                      label="自我介紹"
                      no-resize
                      placeholder
                      style="width:100%"/>
                </div>
                <div class="modal-footer">
                  <v-btn type="button" data-bs-dismiss="modal">取消</v-btn>
                  <v-btn type="button" @click="logPersonalDescription">確認修改</v-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="countries-select-div">
        <h6>選擇您的所在國家</h6>
        <v-autocomplete
            v-model="selectedCountry"
            :items="countries"
            label="選擇您的所在國家"
            bg-color="white"
            class="form-countries-select"
        ></v-autocomplete>
      </div>


      <div class="gender-radio-div">
        <h6>性別</h6>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="M" v-model="gender">
          <label class="form-check-label" for="male">男性</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="F" v-model="gender">
          <label class="form-check-label" for="female">女性</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="unknowGender" value="N"
                 v-model="gender">
          <label class="form-check-label" for="unknowGender">不予透露</label>
        </div>
      </div>

      <h6 style="margin-top: 16px">生日</h6>
      <div class="date-select-div" style="display: flex">
        <div class="date-selector-div" style="width: 240px; align-items: center">
          <n-date-picker
              v-model:formatted-value="formattedValue"
              value-format="yyyy-MM-dd"
              type="date"
              clearable
          />
        </div>
      </div>

      <div class="submit-button-div" style="display: flex; justify-content: center">
        <v-btn @click="updateData" class="me-4" type="submit" style="margin-top: 24px">
          送出修改
        </v-btn>
      </div>

    </form>
  </div>
</template>

<style scoped>

.edit-personal-data-div {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 24px auto;
//border: 2px solid red;
}

.email-text-div {
  display: flex;
  justify-content: center;
  align-items: center;

}

.nickname-description-div {
  display: flex;
  align-items: center;
}

.nickname-form {
  justify-content: center;
  align-items: center;
//border: 2px solid green;
}

.form-nickname-text {
  width: 480px;
}

.form-countries-select {
  width: 480px;
}


</style>