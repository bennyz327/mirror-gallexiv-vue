<script setup>

import {ref, watch} from "vue";
import AvatarCropper from "vue-avatar-cropper";
import axios from "axios";
import {useUserStore} from "@/store/userStore.js";
import {NDatePicker} from "naive-ui";
import {useField} from "vee-validate";
import router from "@/router/router.js";

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
const URLtoAuth = import.meta.env.VITE_API_AUTH

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

const email = useField('email')
const select = useField('select')

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

// 生日表格監聽
const formattedValue = ref(null);
const timestamp = ref(null);
const gender = ref("")

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

const avatar = ref();
const isVerification = ref("尚未驗證");
const checkVerificationStatus = ref();

const getUserData = async () => {
  try {
    const response = await axios.get(`${URL}/profile`, {
      headers: {'Authorization': token}
    });
    getData.value = response.data.data;
    email.value.value = getData.value.userEmail;
    personalEmail.value = getData.value.userEmail
    personalNickName.value = getData.value.userName;

    // 驗證狀態替換
    if (getData.value.email_verified = 1) {
      isVerification.value = "已完成驗證";
      checkVerificationStatus.value = true;
    } else {
      isVerification.value = "尚未驗證";
      checkVerificationStatus.value = false;
    }

    let hi = getData.value.intro;
    hi = hi.replaceAll('<br/>', '\n');
    personalDescription.value = hi;
    user.value.avatar = getData.value.avatar;
    console.log(avatar.value)
    gender.value = getData.value.gender;
    // 输入的日期时间字符串
    var dateTimeString = getData.value.birthday;

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
  const c = confirm('你確定要修改嗎?')
  try {
    if (c) {
      const formattedDescription = personalDescription.value.replace(/\n/g, '<br/>');
      const changeData = getData.value;
      console.log("aa:" + changeData)
      changeData.avatar = user.value.avatar
      console.log("aa:" + changeData.avatar)
      changeData.userEmail = email.value.value;
      console.log("aa:" + changeData.userEmail)
      changeData.userName = personalNickName.value;
      console.log("aa:" + changeData.userName)
      changeData.intro = formattedDescription;
      console.log("aa:" + changeData.intro)
      changeData.gender = gender.value;
      console.log("aa:" + changeData.gender)
      changeData.birthday = formattedValue
      console.log(changeData.birthday)

      const response = await axios.put(`${URL}/update`, changeData, {
        headers: {'Authorization': token}
      });
      console.log(response.data.data)

    }
    router.push({name: 'SettingPage'})

  } catch (error) {
    console.error('提交表单时出错：', error);
  }
}

// email驗證功能
const emailVerification = ref('');
const isWaiting = ref(false);
const countDown = ref(30);
const verificationStatus = ref("取得驗證碼");

// 倒數計時功能
const startCountdown = () => {
  countDown.value = 30;
  const interval = setInterval(() => {
    countDown.value--;
    verificationStatus.value = `在 ${countDown.value} 秒後可重新發送`;
    if (countDown.value <= 0) {
      clearInterval(interval);
      verificationStatus.value = "重新取得驗證碼";
    }
  }, 1000);
};

// 取得信箱驗證碼
const getEmailVerificationAgain = async () => {

  if (isWaiting.value) {
    return; // 如果正在等待，不執行重複請求
  }

  try {
    isWaiting.value = true; // 進入等待狀態

    const emailData = email.value.value;
    console.log(emailData)
    console.log("發送請求前")
    // 發送 POST 請求到後台 API
    const response = await axios.post(`${URLtoAuth}/startVerifyMail`, null, {
      headers: {'Authorization': token}
    });
    console.log(response)
    console.log("發送請求後")
    // 設置計時器，在 30 秒後將等待狀態設置為 false
    setTimeout(() => {
      isWaiting.value = false;
    }, 10000); // 30 秒
  } catch (error) {
    console.error('提交 email 時出錯：', error);
    isWaiting.value = false; // 在錯誤情況下也要確保解除等待狀態

  }
  startCountdown();
};

// 送出驗證碼
const submitEmailVerification = async () => {

  try {
    const emailInput = emailVerification.value;
    const requestData = {
      code: emailInput,
    };
    console.log(emailInput)
    console.log("發送請求前")
    // 發送 POST 請求到後台 API
    const response = await axios.post(`${URLtoAuth}/verifyMail`, requestData, {
      headers: {'Authorization': token}
    });
    console.log(response)
    console.log(response.data.code)
    console.log("發送請求後")
    if (response.data.code === 200) {
      const dataRespone = response.data.code.value
      alert("驗證成功!")
      isVerification.value = ("已完成驗證");
    } else if (response.data.code === 400) {
      alert("驗證失敗!請重新輸入");
    }
  } catch (error) {
    console.error('提交驗證碼時出錯：', error);
  }
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
        <div class="edit-personal-data-div">

          <form @submit.prevent="submit" style="width: 80%">
            <div class="email-status-div">
              <h6>電子郵件</h6>
              <h6>驗證狀態：{{ isVerification }}</h6>
            </div>
            <div class="email-text-div">
              <v-text-field
                  v-model="email.value.value"
                  label=""
                  :error-messages="email.errorMessage.value"
                  class="form-email-text"
                  disabled="true">
              </v-text-field>
              <!--email更改按鈕-->
              <v-btn data-bs-toggle="modal" data-bs-target="#staticBackdrop" style="margin-left:16px">電子郵件相關
              </v-btn>
              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                   tabindex="-1"
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
                          v-model="personalEmail"
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
                      <v-btn type="button" @click="submitNewEmailForPersonalSetting" data-bs-dismiss="modal">確認修改
                      </v-btn>
                    </div>
                    <div class="modal-body">
                      <div class="verification-email-div">
                        <div style="margin-left: 24px">電子郵件驗證狀態：{{ isVerification }}</div>
                      </div>
                      <div class="modal-body">
                        <v-text-field
                            v-model="emailVerification"
                            label="輸入驗證碼"
                            bg-color="white"
                            :disabled=checkVerificationStatus
                        ></v-text-field>
                        <div class="modal-footer">
                          <v-btn @click="getEmailVerificationAgain" :disabled=checkVerificationStatus>
                            {{ verificationStatus }}
                          </v-btn>
                          <v-btn @click="submitEmailVerification" :disabled=checkVerificationStatus>送出</v-btn>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="nickname-and-gender-for-divide" style="display: flex">
              <div class="nickname-and-description-flex" style="display: flex; width: 50%">
                <!--暱稱部分-->
                <div class="nickname-description-div">
                  <div class="nickname-form">
                    <div>
                      <h6>暱稱</h6>

                    </div>
                    <v-text-field
                        v-model="personalNickName"
                        :rules="personalNickNameRules"
                        :counter="20"
                        :maxlength="20"
                        label="暱稱"
                        bg-color="white"
                        class="form-nickname-text"
                        style="width: 320px;"
                    ></v-text-field>
                  </div>

                  <!--自我介紹部分-->
                  <div class="description-form">
                    <div>
                      <h6>自我介紹</h6>
                    </div>
                    <v-textarea
                        v-model="personalDescription"
                        :rules="personalDescriptionRules"
                        :counter="300"
                        :maxlength="300"
                        label="自我介紹"
                        no-resize
                        bg-color="white"
                        placeholder
                        style="width: 320px;"/>
                  </div>
                </div>
              </div>

              <div class="gender-birth-div" style="width: 50%">
                <div class="gender-radio-div">
                  <h6>性別</h6>
                  <div class="gender-radio-center" style="display: flex; justify-content: center">
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="M"
                             v-model="gender">
                      <label class="form-check-label" for="male">男性</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="F"
                             v-model="gender">
                      <label class="form-check-label" for="female">女性</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="inlineRadioOptions" id="unknowGender" value="N"
                             v-model="gender">
                      <label class="form-check-label" for="unknowGender">不予透露</label>
                    </div>
                  </div>
                </div>

                <h6 style="margin-top: 48px">生日</h6>
                <div class="date-select-div" style="display: flex">
                  <div class="date-selector-div" style="width: 360px; align-items: center">
                    <n-date-picker
                        v-model:formatted-value="formattedValue"
                        value-format="yyyy-MM-dd"
                        type="date"
                        clearable
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="submit-button-div" style="display: flex; justify-content: center">
              <v-btn @click="updateData" class="me-4" type="submit" style="margin-top: 24px">
                送出修改
              </v-btn>
            </div>

          </form>
        </div>
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

.edit-personal-data-div {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 24px auto;
  //border: 2px solid red;
}

.email-status-div{
  display: flex;
  justify-content: space-between;
}

.email-text-div {
  display: flex;
  justify-content: center;
  align-items: center;

}

.verification-email-div {
  display: flex;
  height: 120px;
  align-items: center;
  justify-content: center;
}

.nickname-form {
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  //border: 2px solid green;
}

.form-nickname-text {
  width: 480px;
}

</style>