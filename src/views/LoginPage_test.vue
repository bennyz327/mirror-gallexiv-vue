<script setup>
import css from "../assets/css/loginPage.css"
import InputTextBox from "../components/InputTextBox.vue";

import {ref} from 'vue';

defineProps(['errormsg'])
const errormsg = ref('');

// 如果需要回傳Error Message的話，功能尚未完成

</script>

<template>

  <div class="container" id="container">

    <div class="form-container sign-in-container">

      <!--登入表單-->

      <form action="#">
        <h3>登入以使用更多服務</h3>
        <div class="message-input-block" style="margin-left: 72px;">
          <input-text-box label-id="accountId" labelText="E-mail" type-id="text" is-required="true"/>
          <input-text-box label-id="passwordId" labelText="密碼" type-id="password" is-required="true"/>
        </div>
        <div class="erromsg-block" style="margin: 0;border: 0;height: 24px;color: #e51313">
          <span>{{ errormsg }}</span>
        </div>
        <a href="#">忘記密碼?</a>
        <span>或是使用其他帳號登入</span>
        <div class="social-container">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <button @click="login">登入</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-right">
          <h1>Gallexiv</h1>
          <br>
          <h2>歡迎! 朋友</h2>
          <p>創作&nbsp;&nbsp;與世界分享您的作品</p>
          <router-link to="/register" tag="div" style="display: inline-block; margin: 0;border: 0">
            <button class="ghost" id="signUp">註冊</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>