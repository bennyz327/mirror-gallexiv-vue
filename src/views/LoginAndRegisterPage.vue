<script setup>
// import css from "../assets/css/loginPage.css"
import navbar from "../components/Navbar.vue";
import InputTextBox from "../components/InputTextBox.vue";

import {ref, watch} from "vue";

const VaccountId = ref('');
const VpasswordId = ref('');
const VsignUpNickNameId = ref('');
const VsignUpAccountId = ref('');
const VsignUpPasswordId = ref('');
const loginErrorMsg = ref('');
const signUpErrorMsg = ref('');


// 登入註冊頁面切換功能
const isRightPanelActive = ref(false);
const showSignUpPanel = () => {
  isRightPanelActive.value = true;
};
const showSignInPanel = () => {
  isRightPanelActive.value = false;
};

// 登入導向功能

const loginButton = async () => {
  try {
    const response = await fetch('http://localhost:8080/loginprocess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: VaccountId.value,
        passwordId: VpasswordId.value,
      }),
    });

    if (response.ok) {
      // 請求正確時的處理(導向畫面)
    } else {
      // 請求失敗之處理
      loginErrorMsg.value = '登入失敗，請檢查您的帳號密碼是否正確';
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    // 例外錯誤
    loginErrorMsg.value = '發生了一些錯誤，請稍後在嘗試';
  }
};

//TODO 註冊畫面前台驗證(未完成)
const showNickNameError = ref(false);
const showAccountIdError = ref(false);
const showPasswordError = ref(false);


// 註冊導向功能
const signUpButton = async () => {
  try {
    const response = await fetch('http://localhost:8080/rigisterrequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickName: VsignUpNickNameId.value,
        accountId: VsignUpAccountId.value,
        password: VsignUpPasswordId.value,
      }),
    });

    if (response.ok) {
      // 若註冊成功的話應該要怎麼做
    } else {
      // 註冊失敗處理
      signUpErrorMsg.value = '註冊失敗，請稍後再試';
    }
  } catch (error) {
    console.error('發生錯誤：', error);
    // 例外處理
    signUpErrorMsg.value = '發生了一個錯誤，請稍後再試';
  }
};


</script>

<template>

  <div class="navbar-block">
    <v-btn block class="navbar-brand" a href="/">
      回到Gallexiv首頁
    </v-btn>
  </div>

  <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="container">

    <!--註冊表單-->
    <div class="form-container sign-up-container">

      <form action="#">
        <h4>建立帳號</h4>
        <div class="message-input-block" style="margin-left: 72px;">
          <input-text-box v-model="VsignUpNickNameId" label-id="signUpNickNameId" labelText="帳號名稱" type-id="text"
                          is-required="true" @blur="validateNickNameId"/>
          <div class="error-message-block">
            <span v-if="showNickNameError">暱稱不能為空</span>
          </div>
          <input-text-box v-model="VsignUpAccountId" label-id="signUpAccountId" labelText="E-mail" type-id="text"
                          is-required="true" @blur="validateAccountId"/>
          <div class="error-message-block">
            <span v-if="showAccountIdError">E-mail格式不正確</span>
          </div>
          <input-text-box v-model="VsignUpPasswordId" label-id="signUpPasswordId" labelText="密碼" type-id="password"
                          is-required="true" @blur="validatePassword"/>
          <div class="error-message-block">
            <span v-if="showPasswordError">密碼總長度必須大於6位數</span>
          </div>
          <div class="verification-div" style="display: flex">
            <div class="verification-input-div" >
              <input-text-box v-model="VsignUpPasswordId" label-id="signUpPasswordId" labelText="密碼" type-id="password"
                              is-required="true" @blur="validatePassword" style="width: 180px"/>
            </div>
            <div class="verification-picture-div">
<!--              <img src="../assets/Picture/dessert.jpg" style="height: 64px">-->
            </div>
          </div>
        </div>
        <div class="erromsg-block" style="margin-bottom: 16px;border: 0;height: 24px;color: #e51313">
          <span>{{ singUpErrormsg }}</span>
        </div>
        <button @click="signUpButton">註冊</button>
      </form>
    </div>

    <!--登入表單-->
    <div class="form-container sign-in-container">
      <form action="#">
        <h5>登入以使用更多服務</h5>
        <div class="message-input-block" style="margin-left: 72px;">
          <input-text-box v-model="VaccountId" label-id="accountId" labelText="E-mail" type-id="email"
                          is-required="true"/>
          <input-text-box v-model="VpasswordId" label-id="passwordId" labelText="密碼" type-id="password"
                          is-required="true"/>
        </div>
        <div class="erromsg-block" style="margin: 0;border: 0;height: 24px;color: #e51313">
          <span>{{ loginErrorMsg }}</span>
        </div>
        <a href="#">忘記密碼?</a>
        <span>或是使用其他帳號登入</span>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <button @click="loginButton">登入</button>
      </form>
    </div>

    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Gallexiv</h1>
          <p>已有帳號嗎?</p>
          <button class="ghost" id="signIn" @click="showSignInPanel">登入</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Gallexiv</h1>
          <br>
          <h2>歡迎! 朋友</h2>
          <p>創作&nbsp;&nbsp;與世界分享您的作品</p>
          <button class="ghost" id="signUp" @click="showSignUpPanel">註冊</button>
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

.navbar-brand {
  position: relative;
  border-radius: 8px;
  bottom: -8px;
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
  margin: -20px 0 50px;
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
  width: 720px;
  max-width: 100%;
  min-height:540px;
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

.error-message-block {
  width: 420px;
  padding-left: 33px;
  padding-right: 33px;
  text-align: left;
  height: 24px;
  color: #e51313;
}



</style>