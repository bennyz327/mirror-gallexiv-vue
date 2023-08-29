<script setup>
import css from "../assets/css/userPersonalPage.css"

import Navbar from "../components/Navbar.vue";
import UserHomePage from "../components/userPage/UserHomePage.vue";
import UserSubscriptionPage from "../components/userPage/UserSubscriptionPage.vue";
import UserSubscribePicturePage from "../components/userPage/UserSubscribePage.vue";
import TagFunction from "../components/TagFunction.vue";
import FollowerPage from "../components/userPage/UserFollowerPage.vue"

import userHomePageJsonFile from "../assets/userHomePage.json"
import tagHomepageJsonFile from "../assets/tag.json"
import tagSubscribePageJsonFile from "../assets/tagSub.json"
import imgJsonFile from "../assets/imgList.json"
import subscriptionJsonFile from "../assets/subscriptionList.json"
import subscribePictureJsonFile from "../assets/imgListForSubscription.json"
import followerJsonFile from "../assets/followerList.json"

import {onMounted, reactive, ref} from "vue";

// 追隨按鈕功能(以及發送到後端)
const followed = ref(false);

const toggleFollow = () => {
  followed.value = !followed.value;
  sendDataToBackend(userData.value.postData);
}


// HomePageTag 假資料
const tagHomePageJson = ref(tagHomepageJsonFile)

// SubscribePageTag 假資料
const jsonDataImportTagPage = ref(tagSubscribePageJsonFile)

// UserPage 假資料
const testData = ref(null);
const fetchData = async () => {
  try {
    const fakeUserData = userHomePageJsonFile[0];

    setTimeout(() => {
      testData.value = fakeUserData;
    }, 1000);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

onMounted(() => {
  fetchData();
});

// HomePage 假資料
const imgDataReference = ref(imgJsonFile);

const imgDataImportToHomePage = reactive(
    imgDataReference.value.map(item => item.imgPath)
)

// SubscribePicturePage 假資料
const imgDataSubscribeReference = ref(subscribePictureJsonFile);

const jsonDataImportSubscribePage = reactive(
    imgDataSubscribeReference.value.map(item => item.imgPath)
)

// SubscriptionPage 假資料
const jsonDataImportSubscriptionPage = ref(subscriptionJsonFile);

// FolllowerPage 假資料

const jsonDataImportFollowerPage = ref(followerJsonFile);

</script>

<template>

  <Navbar></Navbar>

  <div class="container" v-if="testData">
    <div class="container-userpage-style">

      <!--使用者個人欄位-->
      <div class="user-block">

        <!--個人背景圖片-->
        <div class="background-div">
          <img :src="testData.backgroundPictureSrc" class="background-picture-src">
        </div>

        <!--個人介紹大區塊(height=300px)-->
        <div class="user-introduce-block">

          <!--個人介紹區塊(頭像以及名稱)-->
          <div class="user-name-follower-div">

            <!--個人頭像區塊-->
            <div class="user-icon-src-div">
              <div class="rounded-circle" style="display:flex">
                <img :src="testData.postUserImageURL" alt="User" width="176" height="176" class="rounded-circle"
                     style="object-fit: cover;"/>
              </div>
            </div>

            <!--文字介紹區塊-->
            <div class="user-name-div">
              <h3>{{ testData.userName }}</h3>
              <h6 class="account-text">@{{testData.userAccount}}</h6>
            </div>
            <div class="user-follower-number-div">
              <h5>{{ testData.followerNums }} 個追蹤者</h5>
              <!--TODO 外部連結部分內容(網址判斷圖示)-->
              <div class="user-hyperlink-div">
                <div class="facebook-icon-div">
                  <a :href="testData.facebookLink" target="_blank"><i class="fa-brands fa-facebook fa-2xl"
                                                                      style="color: #2369e1;"></i></a>
                </div>
                <div class="twitter-icon-div">
                  <a :href="testData.twitterLink" target="_blank"><i class="fa-brands fa-twitter fa-2xl"
                                                                     style="color: #1a6eff;"></i></a>
                </div>
                <div class="youtube-icon-div">
                  <a :href="testData.youtubeLink" target="_blank"><i class="fa-brands fa-youtube fa-2xl"
                                                                     style="color: #fa0000;"></i></a>
                </div>
                <div class="other-icon-div">
                  <a :href="testData.youtubeLink" target="_blank"><i class="fa-solid fa-link fa-2xl"
                                                                     style="color: #d88d4f; font-size: 32px;"></i></a>
                </div>
              </div>

            </div>
          </div>

          <!--自我介紹內容-->
          <div class="user-introduce-detail-div">
            <p class="user-introduce-detail-text">{{ testData.introduceDetail }}</p>
          </div>

          <!--追隨按鈕-->
          <div class="follow-button-div">
            <button :class="followed ? 'btn btn-primary' : 'btn btn-outline-secondary'" type="button"
                    @click="toggleFollow">
              <span v-text="followed ? '已追隨' : '追隨'"></span>
            </button>
          </div>

        </div>
      </div>

      <!--切換menu選項-->
      <div class="menu-bar-block">

        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home"
                    type="button" role="tab" aria-controls="nav-home" aria-selected="true">首頁
            </button>
            <button class="nav-link" id="nav-fans-tab" data-bs-toggle="tab" data-bs-target="#nav-fans" type="button"
                    role="tab" aria-controls="nav-profile" aria-selected="false">專屬內容
            </button>
            <button class="nav-link" id="nav-followers-tab" data-bs-toggle="tab" data-bs-target="#nav-followers"
                    type="button" role="tab" aria-controls="nav-profile" aria-selected="false">追蹤者
            </button>
            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-subscribe"
                    type="button" role="tab" aria-controls="nav-contact" aria-selected="false">可訂閱項目
            </button>
          </div>
        </nav>

        <!--首頁呈現頁面-->
        <div class="tab-content" id="nav-tabContent">

          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

            <!--Home Menu頁面區塊-->
            <div class="menu-home-page-block">

              <div class="menu-home-page-tag-div">
                <TagFunction :tagjson="tagHomePageJson"></TagFunction>
              </div>

              <div class="menu-home-page-picture-div">
                <UserHomePage :imgUrlList="imgDataImportToHomePage"></UserHomePage>
              </div>

            </div>
          </div>

          <!--專屬內容呈現頁面-->
          <div class="tab-pane fade" id="nav-fans" role="tabpanel" aria-labelledby="nav-fans-tab">

            <!--專屬內容頁面區塊-->
            <div class="menu-subscribe-img-page-block">

              <div class="menu-subscribe-img-page-tag-div">
                <TagFunction :tagjson="jsonDataImportTagPage"></TagFunction>
              </div>

              <div class="menu-subscribe-img-page-picture-div">
                <UserSubscribePicturePage :imgUrlList="jsonDataImportSubscribePage"></UserSubscribePicturePage>
              </div>

            </div>
          </div>

          <!--追蹤者呈現頁面-->
          <div class="tab-pane fade" id="nav-followers" role="tabpanel" aria-labelledby="nav-followers-tab">
            <FollowerPage :followerData="jsonDataImportFollowerPage"></FollowerPage>
          </div>


          <!--可訂閱呈現頁面-->
          <div class="tab-pane fade" id="nav-subscribe" role="tabpanel" aria-labelledby="nav-subscribe-tab">

            <!--可訂閱頁面區塊-->
            <div class="subscription-block">
              <UserSubscriptionPage :subscription-list="jsonDataImportSubscriptionPage"></UserSubscriptionPage>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>