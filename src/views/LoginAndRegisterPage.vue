<script setup>
import css from "../assets/css/loginPage.css"
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

// 註冊畫面前台驗證
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

  <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="container">

    <!--註冊表單-->
    <div class="form-container sign-up-container">
      <form action="#">
        <h1>建立帳號</h1>
        <div class="message-input-block" style="margin-left: 72px;">
          <input-text-box v-model="VsignUpNickNameId" label-id="signUpNickNameId" labelText="暱稱" type-id="text" is-required="true" @blur="validateNickNameId"/>
          <div class="error-message-block">
            <span v-if="showNickNameError">暱稱不能為空</span>
          </div>
          <input-text-box v-model="VsignUpAccountId" label-id="signUpAccountId" labelText="E-mail" type-id="text" is-required="true" @blur="validateAccountId"/>
          <div class="error-message-block">
            <span v-if="showAccountIdError">E-mail格式不正確</span>
          </div>
          <input-text-box v-model="VsignUpPasswordId" label-id="signUpPasswordId" labelText="密碼" type-id="password" is-required="true" @blur="validatePassword"/>
          <div class="error-message-block">
            <span v-if="showPasswordError">密碼總長度必須大於6位數</span>
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
        <h3>登入以使用更多服務</h3>
        <div class="message-input-block" style="margin-left: 72px;">
          <input-text-box v-model="VaccountId" label-id="accountId" labelText="E-mail" type-id="email" is-required="true"/>
          <input-text-box v-model="VpasswordId" label-id="passwordId" labelText="密碼" type-id="password" is-required="true"/>
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
          <button class="ghost" id="signUp" @click="showSignUpPanel" >註冊</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>