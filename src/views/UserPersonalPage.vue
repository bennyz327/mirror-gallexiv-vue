<script setup>
import Navbar from "../components/Navbar.vue";
import UserHomePage from "../components/userPage/UserHomePage.vue";
import css from "../assets/css/userPersonalPage.css"
import {onMounted, ref} from "vue";
import TagFunction from "../components/TagFunction.vue";
import jsonFile from "../assets/tag.json"

// 其他區域假資料

const testData = ref(null);
const json = ref(jsonFile)

const fetchData = async () => {
  try {

    const fakeUserData = {
      "backgroundPictureSrc": "https://cdn.discordapp.com/attachments/620257710537179147/1133097816588292158/99331431_p0.jpg",
      "postUserImageURL": "https://i.imgur.com/6rpzbog.gif",
      "userName": "Benny",
      "followerNums": "87",
      "introduceDetail": "ブクマやコメントして下さる方、誠にありがとうございます！\n" +
          "\n" +
          "私の描いた絵に対し、稀に「○○に使用させて下さい」と仰ってくれる人が居ます。私的利用であれば（第三者を不快にする用途でない限り）お好きに御利用下さい。\n" +
          "\n" +
          "とはいえ、やはり無断で利用されるよりも一言もらえた方が嬉しいので、出来る限り御連絡お願い致します。\n" +
          "常識の範囲内で私的利用される分にはお断りしませんので、気軽にお声がけ下さい！",
      "facebookLink": "https://www.facebook.com/benny.chou.73",
      "twitterLink": "https://twitter.com/home?lang=zh-tw",
      "youtubeLink": "https://www.youtube.com/",
    };


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

            <!--Home Menu頁面-->
            <div class="menu-home-page-block">

              <div class="menu-home-page-tag-div">
                <TagFunction :tagjson="json"></TagFunction>
              </div>

              <div class="menu-home-page-picture-div">
                <UserHomePage></UserHomePage>
              </div>

            </div>

          </div>

          <!--專屬內容呈現頁面-->
          <div class="tab-pane fade" id="nav-fans" role="tabpanel" aria-labelledby="nav-fans-tab">2</div>


          <!--追蹤者呈現頁面-->
          <div class="tab-pane fade" id="nav-followers" role="tabpanel" aria-labelledby="nav-followers-tab">3</div>
          <!--可訂閱呈現頁面-->
          <div class="tab-pane fade" id="nav-subscribe" role="tabpanel" aria-labelledby="nav-subscribe-tab">4</div>
        </div>

      </div>


    </div>
  </div>
</template>

<style scoped>

</style>