<script setup>

import Navbar from "../components/Navbar.vue";
import PersonalSettingPage from "../components/userSettingPage/PersonalSettingPage.vue";
import PersonalHomeAndSearchSettingPage from "../components/userSettingPage/PersonalLinkandSearchSetting.vue";
import PersonalSubscriptionPage from "../components/userSettingPage/PersonalSubscriptionPage.vue";
import {ref} from "vue";

// 訂閱設定假資料
import settingSubscribeJsonFile from "@/assets/settingSubscribe.json";
const jsonDataImportSubscriptionPage = ref(settingSubscribeJsonFile);

</script>

<template>

  <Navbar></Navbar>

  <div class="container">

    <div class="page-title-div">
      <h3>設定頁面</h3>
    </div>

    <!--主頁面div 使其置中-->
    <div class="whole-setting-block">

      <!--預留標籤外層區塊-->
      <div class="setting-nav-block">

        <!--標籤區塊-->
        <div class="setting-top-nav-div">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button class="nav-link active" id="nav-personal-setting-tab" data-bs-toggle="tab"
                      data-bs-target="#nav-personal-setting"
                      type="button" role="tab" aria-controls="nav-personal-setting" aria-selected="true">個人資料設定
              </button>
              <button class="nav-link" id="nav-home-and-search-setting-tab" data-bs-toggle="tab"
                      data-bs-target="#nav-home-and-search-setting" type="button"
                      role="tab" aria-controls="nav-profile" aria-selected="false">主頁設定
              </button>
              <button class="nav-link" id="nav-subscription-setting-tab" data-bs-toggle="tab" data-bs-target="#nav-subscription-setting"
                      type="button" role="tab" aria-controls="nav-profile" aria-selected="false">訂閱相關
              </button>
              <button class="nav-link" id="nav-reserve-div-tab" data-bs-toggle="tab" data-bs-target="#nav-reserve-div"
                      type="button" role="tab" aria-controls="nav-contact" aria-selected="false">保留區塊
              </button>
            </div>
          </nav>
        </div>

        <!--個人設定區塊-->
        <div class="tab-content" id="nav-tabContent">

          <div class="tab-pane fade show active" id="nav-personal-setting" role="tabpanel"
               aria-labelledby="nav-personal-setting-tab">
            <PersonalSettingPage></PersonalSettingPage>
          </div>

          <!--搜尋及主頁設定區塊-->
          <div class="tab-pane fade" id="nav-home-and-search-setting" role="tabpanel"
               aria-labelledby="nav-home-and-search-setting-tab">
            <PersonalHomeAndSearchSettingPage></PersonalHomeAndSearchSettingPage>
          </div>

          <!--訂閱相關區塊-->
          <div class="tab-pane fade" id="nav-subscription-setting" role="tabpanel" aria-labelledby="nav-subscription-setting-tab">
            <PersonalSubscriptionPage :subscribeList="jsonDataImportSubscriptionPage"></PersonalSubscriptionPage>
          </div>


          <!--保留區塊-->
          <div class="tab-pane fade" id="nav-reserve-div" role="tabpanel" aria-labelledby="nav-reserve-div-tab">

          </div>
        </div>
      </div>


    </div>


  </div>
</template>

<style scoped>
.page-title-div {
//text-decoration:underline #d88d4f;
}

.whole-setting-block {
  width: 100%;
  max-height: 680px;
}

.tab-content{
  height: 680px;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: #ccc;
}

.nav-tabs .nav-link {
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 48px;
}

.nav-tabs {
  display: flex;
  justify-content: center;
  align-items: center;

}

.nav-tabs .nav-link.active {
  color: #d88d4f;
}
</style>