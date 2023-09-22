<script setup>
import "../assets/css/inputTextBox.css"

// 使用vee驗證功能
import {useForm, useField} from 'vee-validate';
import instance from '@/views/api/api.js'

import qs from "querystring";
import axios from "axios";

import {ref, watch} from "vue";

const captchaImg = ref('');
const pre = 'data:image/jpeg;base64,';
const isReisterBtnAble = ref(false);
const UUID = ref('');

// const JavaBaseUrl = ref(import.meta.env.JAVA_API_BASEURL)
const JavaBaseUrl = ref('http://gallexivjava.com:8080')

// 登入註冊頁面切換功能
const isRightPanelActive = ref(false);
const showSignUpPanel = () => {
  isRightPanelActive.value = true;
};
const showSignInPanel = () => {
  isRightPanelActive.value = false;
};

// 重新取得驗證圖片
const getCaptcha = async () => {
  // const response = await axios.get('http://172.18.135.72:8080/captcha')
  const response = await instance.get('/captcha')
  captchaImg.value = response.data.data.base64Img;
  UUID.value = response.data.data.token;
  signUpErrorMsg.value = '';
}
getCaptcha();
setTimeout(() => {
  signUpErrorMsg.value = '驗證碼已過期，請點擊圖片重新取得'
}, 120000);

// 錯誤訊息
const loginErrorMsg = ref('');
const signUpErrorMsg = ref('');

// 註冊驗證功能 TODO 帳號名稱驗證功能
const {handleSubmit} = useForm({
  validationSchema: {
    signUpAccount(value) {
      if (value?.length >= 4) return true
      return '建立帳號至少需要輸入4個字元'
    },
    signUpEmail(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
      return '請輸入有效的電子郵件'
    },
    signUpPwd(value) {
      if (value?.length >= 6) return true
      return '建立密碼至少需要輸入6個字元'
    },
    signUpPwdAgain(value) {
      if (value === signUpPwd.value.value) return true
      return '與第一次輸入比較不匹配'
    },
    signUpVerification(value) {
      if (value?.length >= 5) return true
      return '驗證碼至少有5個字元'
    }
  },
})

const signUpAccount = useField('signUpAccount');
const signUpEmail = useField('signUpEmail');
const signUpPwd = useField('signUpPwd');
const signUpPwdAgain = useField('signUpPwdAgain');
const signUpVerification = useField('signUpVerification');

// 更改json Key名稱區塊
const signUpSubmit = handleSubmit(async values => {

  const modifiedSignUpValues = {
    account: values.signUpAccount,
    email: values.signUpEmail,
    password: values.signUpPwd,
    verification: values.signUpVerification,
    token: UUID.value,
  };
  console.log("註冊資料")
  console.log(modifiedSignUpValues)
  console.log(JSON.stringify(modifiedSignUpValues, null, 2))

  // 註冊送出資料
  try {
    const url = import.meta.env.VITE_API_BASEURL + '/register';
    const response = await axios.post(url, modifiedSignUpValues);

    if (response.data.code === 200) {
      console.log("註冊成功");
      console.log(response.data);
      signUpErrorMsg.value = '註冊成功，請重新登入';
      setTimeout(() => {
        signUpErrorMsg.value = '';
        window.location.href = "/login";
      }, 3000);
    } else {
      getCaptcha();
      if(response.data.code === 400){
        if (response.data.msg === '驗證失敗') {
          alert('驗證碼錯誤，請檢查後再試');
          signUpErrorMsg.value = '驗證碼錯誤，請檢查後再試';
          isReisterBtnAble.value = true;
          setTimeout(() => {
            signUpErrorMsg.value = '';
            isReisterBtnAble.value = false;
          }, 3000);
        }
        if (response.data.msg === '電子郵件或帳號已被註冊') {
          alert('帳號已存在，請更換後再試');
          signUpErrorMsg.value = '帳號已存在，請更換後再試';
          isReisterBtnAble.value = true;
          setTimeout(() => {
            signUpErrorMsg.value = '';
            isReisterBtnAble.value = false;
          }, 3000);
        }
      }
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    signUpErrorMsg.value = '目前無法登入，請稍後在試';
    setTimeout(() => {
      signUpErrorMsg.value = '';
    }, 3000);
  }
})

// 登入驗證功能
const signInAccount = ref('');
const signInPwd = ref('');
const signInVerification = ref('');

const signInAccountRules = [
  (value) => {
    if (value?.length >= 4) return true;
    return '帳號名稱至少應有4個字元';
  },
];

const signInPwdRules = [
  (value) => {
    if (value?.length >= 6) return true;
    return '密碼至少需要輸入6個字元';
  },
]

const signInVerificationRules = [
  (value) => {
    if (value?.length >= 4) return true;
    return '驗證碼至少有4個字元';
  }
]

const signInSubmit = async () => {

  if (signInAccount.value && signInPwd.value && signInVerification.value) {
    try {
      // const signInData = {
      //   name: signInAccount.value,
      //   passwd: signInPwd.value,
      //   code: signInVerification.value,
      //   token: UUID.value,
      // };
      const signInFormData = new FormData();
      signInFormData.append('name', signInAccount.value);
      signInFormData.append('passwd', signInPwd.value);
      signInFormData.append('code', signInVerification.value);
      signInFormData.append('token', UUID.value);

      console.log("登入資料")
      console.log(signInFormData)

      const response = await axios.post('http://localhost:8080/login', signInFormData, {timeout: 3000})
          .then((response) => {
            console.log("登入成功");
            console.log(response.data);
            console.log(response.headers);
            if (response.headers.get("Authorization")) {
              localStorage.setItem("token", response.headers.get("Authorization"));
              localStorage.setItem('username', response.data.data)
              console.log("登入成功");
              window.location.href = "/200";
            }else {
              console.log("登入失敗");
              loginErrorMsg.value = '登入失敗';
            }
          }).catch((error) => {
            loginErrorMsg.value = '無此帳號或密碼';
            console.log(error);
          })

    } catch (error) {
      console.error('發生錯誤：', error);
      setTimeout(() => {
        loginErrorMsg.value = '目前無法登入，請稍後再試';
      }, 3000);
    }
  } else {
    setTimeout(() => {
      loginErrorMsg.value = '任何欄位不得為空!';
    }, 3000);
  }
}

</script>

<template>

  <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="container">

    <!--註冊表單-->
    <div class="form-container sign-up-container">

      <form @submit.prevent="signUpSubmit">
        <h4>建立帳號</h4>

        <div class="message-input-block">
          <div class="signUp-text-field">
            <v-text-field
                v-model="signUpAccount.value.value"
                label="帳號"
                type="text"
                :error-messages="signUpAccount.errorMessage.value"
                bg-color="white"
                :maxlength="20"
            ></v-text-field>
          </div>

          <div class="signUp-text-field">
            <v-text-field
                v-model="signUpEmail.value.value"
                label="Email"
                type="email"
                :error-messages="signUpEmail.errorMessage.value"
                bg-color="white"
                :maxlength="50"
            ></v-text-field>
          </div>

          <div class="signUp-text-field">
            <v-text-field
                v-model="signUpPwd.value.value"
                label="密碼"
                type="password"
                :error-messages="signUpPwd.errorMessage.value"
                bg-color="white"
                :maxlength="20"
            ></v-text-field>
          </div>

          <div class="signUp-text-field">
            <v-text-field
                v-model="signUpPwdAgain.value.value"
                label="再次輸入密碼"
                type="password"
                :error-messages="signUpPwdAgain.errorMessage.value"
                bg-color="white"
                :maxlength="20"
            ></v-text-field>
          </div>

          <div class="verification-div" style="display:flex">
            <div class="verification-input-div">
              <v-text-field
                  v-model="signUpVerification.value.value"
                  label="驗證碼"
                  :error-messages="signUpVerification.errorMessage.value"
                  bg-color="white"
                  :maxlength="8"
              ></v-text-field>
            </div>

            <div class="register-verification-picture-div">
              <img class="captchaImg" :src="captchaImg" @click="getCaptcha"
                   style="position: relative; right: 32px; top:8px" alt="載入失敗">
              <!--              <span>{{UUID}}</span>-->
            </div>
          </div>
          <div class="erromsg-block" style="margin: 8px;border: 0;height: 24px;color: #e51313">
            <span style="font-size: 18px">{{ signUpErrorMsg }}</span>
          </div>
        </div>
        <button @click="signUpSubmit" :disabled="isReisterBtnAble">註冊</button>
      </form>
    </div>

    <!--登入表單-->
    <div class="form-container sign-in-container">
      <form @submit.prevent="signInSubmitForm">
        <h5>登入以使用更多服務</h5>
        <div class="message-input-block">

          <div class="signIn-text-field">
            <v-text-field
                v-model="signInAccount"
                label="帳號"
                type="text"
                :rules="signInAccountRules"
                bg-color="white"
                :maxlength="20"
            ></v-text-field>
          </div>

          <div class="signIn-text-field">
            <v-text-field
                v-model="signInPwd"
                label="密碼"
                type="password"
                :rules="signInPwdRules"
                bg-color="white"
                :maxlength="20"
            ></v-text-field>
          </div>

          <div class="verification-div">
            <div class="verification-input-div">

              <v-text-field
                  v-model="signInVerification"
                  label="驗證碼"
                  type="text"
                  :rules="signInVerificationRules"
                  bg-color="white"
                  :maxlength="8"
              ></v-text-field>

            </div>
            <div class="login-verification-picture-div">
              <img class="captchaImg" :src="captchaImg" @click="getCaptcha"
                   alt="載入失敗">
              <!--              <span>{{UUID}}</span>-->
            </div>
          </div>
        </div>
        <div class="erromsg-block" style="margin: 0;border: 0;height: 24px;color: #e51313">
          <span style="font-size: 18px">{{ loginErrorMsg }}</span>
        </div>
        <a href="#">忘記密碼?</a>
        <span>或是使用其他帳號登入</span>
        <div class="social-container">
          <!--          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>-->
          <a :href="JavaBaseUrl+'/oauth2/authorization/google'" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <button @click="signInSubmit">登入</button>
      </form>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Gallexiv</h1>
          <p>已有帳號嗎?</p>
          <button class="ghost" id="signIn" @click="showSignInPanel">登入</button>
          <router-link to="/">
            <button class="ghost">
              回到Gallexiv首頁
            </button>
          </router-link>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Gallexiv</h1>
          <br>
          <h2>歡迎! 朋友</h2>
          <p>創作&nbsp;&nbsp;與世界分享您的作品</p>
          <button class="ghost" id="signUp" @click="showSignUpPanel">註冊</button>
          <router-link to="/">
            <button class="ghost">
              回到Gallexiv首頁
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
@font-face {
  font-family: 'applegothic';
  src: url('../assets/fonts/applegothic.ttf') format('truetype');
}

.navbar-brand font :hover {
  color: white;
}

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -25px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

button {
  border-radius: 20px;
  border: 1px solid #150fc0;
  background-color: #150fc0;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  margin: auto;


}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
  0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 840px;
  max-width: 100%;
  min-height: 720px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #FF416C;
  background: -webkit-linear-gradient(to right, #938aff, #3935d2);
  background: linear-gradient(to right, #938aff, #3935d2);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.message-input-block {
  margin-top: 8px;
  margin-bottom: 8px;
}

.signUp-text-field {
  width: 320px;
  margin-top: 8px;
  margin-bottom: 8px;
}

.verification-div{
  display: flex;
}

.verification-input-div {
  width: 120px;
  margin-right: 24px;
}

.register-verification-picture-div{
  position: relative;

}

.login-verification-picture-div{

}

</style>