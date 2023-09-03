<script setup>
import SettingPageInputTextComponent from "@/components/userSettingPage/SettingPageInputTextComponent.vue";
import userIconUploadAndEditFunction from "@/components/functionComponents/UserIconUploadAndEditFunction.vue";
</script>

<template>

  <div class="personal-setting-block">

    <!--左邊分區(頭像)-->
    <div class="personal-setting-div-left">

      <div class="user-icon-setting-div">
        <user-icon-upload-and-edit-function></user-icon-upload-and-edit-function>
      </div>

    </div>

    <!--右邊分區(文字修改區塊)-->
    <div class="personal-setting-div-right">

      <div class="edit-setting-div">
        <SettingPageInputTextComponent></SettingPageInputTextComponent>
      </div>

    </div>

  </div>


</template>

<style scoped>
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

</style>