<script setup>
import axios from "axios";
import Navbar from "../components/Navbar.vue";
import PostViewCarousel from "../components/functionComponents/PostViewCarousel.vue";
import DescriptionArea from "@/components/functionComponents/CollapseFunction.vue";
import { useUserStore } from "@/store/userStore.js";
import { ref, onMounted, reactive, computed } from 'vue';
//import MessageArea from "@/components/functionComponents/MessageArea.vue";
const { token } = useUserStore();
const postId = 1;

// 圖片資料
const imgDataReference = ref([]);
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/test/p?postId=${postId}`);
    console.log("urls:", response.data);
    const imageUrls = response.data;
    for (const imageUrl of imageUrls) {
      imgDataReference.value.push({ url: imageUrl, type: 'image/png' });
    }
  } catch (error) {
    console.error('Error fetching images:', error);
  }
});
// 匯入資料到carousel
const imgDataImportToCarousel = reactive(
  imgDataReference.value
);

//留言區假資料
// import messageAreaJsonFile from "@/assets/messageArea.json";
// const jsonDataImportMessageAreaVue = ref(messageAreaJsonFile);

const replyText = ref("");

//依 postId 找到 userName, commentTest, commentTime
const comments = ref([]);
const URL_COMMENT = import.meta.env.VITE_API_COMMENT;
const loadComments = async () => {
  try {
    const response = await axios.get(`${URL_COMMENT}/findByPostId?postId=${postId}`);
    console.log(response.data);
    comments.value = response.data.data; // 假設返回的數據在 response.data 的 data 屬性中
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}
onMounted(() => {
  loadComments();
});


// 其他區域資料
const postData = ref(null);
const URL_POST = import.meta.env.VITE_API_Post;
const fackData = {
  "userImageURL": "https://i.imgur.com/6rpzbog.gif",
  "postUserImageURL": "https://media.discordapp.net/attachments/782068953899335710/1138768475754598420/83E0E2EE11DE10FD3314E2FE2D1EBDAE.gif",
};
const loadPost = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/posts/post?postId=${postId}`);
    console.log(response.data);
    postData.value = response.data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
onMounted(() => {
  loadPost();
});

//新增留言
const comment = {
  postId,
  commentText: "",
  parentCommentId: null
}
async function insertCommnet() {
  const URL_COMMENT = import.meta.env.VITE_API_COMMENT;
  try {
    const resInsertComment = await axios.post(`${URL_COMMENT}/insert`, comment, { headers: { 'Authorization': token } })
    console.log(resInsertComment.status)
    comment.commentText = ""//清空input
    console.log('Response from server:', resInsertComment.data);
  } catch (error) {
    console.error('Error sending comment:', error);
  }
  loadComments();

}

//新增子留言
const insertSubComment = async (commentId, subCommentText) => {
  const URL_COMMENT = import.meta.env.VITE_API_COMMENT;
  try {
    console.log(comment.value);
    const subComment = {
      postId: comment.postId,
      commentText: subCommentText,
      parentCommentId: commentId,
    }
    const resSubComment = await axios.post(`${URL_COMMENT}/insert`, subComment, { headers: { 'Authorization': token } })
    console.log(resSubComment.status);
    subComment.commentText = ""
    console.log('Response from server:', resSubComment.data);
  } catch (error) {
    console.error('Error sending comment:', error);
  }
  loadComments();
}

//刪除留言
const deleteComment = async (commentId) => {
  if (window.confirm("真的要刪除嗎?")) {
    console.log("delect ID：", commentId)
    const URL_COMMENT = import.meta.env.VITE_API_COMMENT;
    try {
      const resDeleteComment = await axios.delete(`${URL_COMMENT}/delete?commentId=${commentId}`, { headers: { 'Authorization': token } });
      console.log(resDeleteComment.status)
      console.log('Response from server:', resDeleteComment.data);
    } catch (error) {
      console.error('Error sending comment:', error);
    }
  }
  loadComments();
}

//------------更新留言-----------------//
//取得初始值
const editingCommentId = ref(null); // 取得要編輯的 commentId
const originalCommentText = ref(''); // 取得原本的 commentText 
const editedCommentText = ref(''); // 取得編輯過的 commentId
// 點擊‘更新’後進入編輯
const editComment = (commentId) => {
  console.log("token:", token);
  editingCommentId.value = commentId;
  originalCommentText.value = comments.value.find(c => c.commentId === commentId).commentText;//確認 commentId 一致
  editedCommentText.value = originalCommentText.value; // 將原本的 commentText 設為初始值
};
// 將編輯後的 commentText 傳到後端
const updateComment = async (commentId) => {
  console.log("commentId: ", commentId);
  const commentText = editedCommentText.value;// 取得新commentText
  console.log("commentText: ", commentText);
  const URL_COMMENT = import.meta.env.VITE_API_COMMENT;
  console.log("URL_COMMENT:", URL_COMMENT);
  console.log("token:", token);
  const resUpdateComment = await axios.put(`http://localhost:8080/comments/update?commentId=${commentId}&commentText=${commentText}`, { headers: { 'Authorization': token } });
  console.log("token:", token);
  console.log('Saving edited comment:', resUpdateComment.data);
  // 清空初始值
  editingCommentId.value = null;
  originalCommentText.value = '';
  editedCommentText.value = '';
  loadComments();
};
//---------------------------------------------//

// 按鈕功能
const liked = ref(false);
const collected = ref(false);
const hovered = ref(false);

const toggleLike = () => {
  liked.value = !liked.value;
  sendDataToBackend(userData.value.postData);
};

const toggleCollect = () => {
  collected.value = !collected.value;
  sendDataToBackend(userData.value.postData);
};

const heartClass = computed(() => {
  if (liked.value && hovered.value) {
    return 'fa-solid fa-heart fa-bounce fa-lg';
  } else if (!liked.value && hovered.value) {
    return 'fa-regular fa-heart fa-bounce fa-lg';
  } else {
    return liked.value ? 'fa-solid fa-heart fa-lg' : 'fa-regular fa-heart fa-lg';
  }
});

// 留言區塊限制
const messageInput = ref("");
const messageInputRules = [
  (value) => {
    if (value && value.length <= 120 && value.trim().length > 0) {
      return true;
    } else if (!value || value.trim().length === 0) {
      return "至少必須輸入1個字元";
    } else {
      return "字數不能超過 120 個字";
    }
  },
];

//格式化 commentTime
function formatTime(times) {
  const now = new Date();
  const commentTime = new Date(times);
  const diffInSeconds = now - commentTime;

  if (diffInSeconds < (60 * 1000)) {
    const timeDifferent = Math.floor(diffInSeconds / 1000)
    return `${timeDifferent}秒前`;
  } else if (diffInSeconds < (60 * 60 * 1000)) {
    const timeDifferent = Math.floor(diffInSeconds / (60 * 1000))
    return `${timeDifferent}分鐘前`;
  } else if (diffInSeconds < (24 * 60 * 60 * 1000)) {
    const timeDifferent = Math.floor(diffInSeconds / (60 * 60 * 1000))
    return `${timeDifferent}小時前`;
  } else if (diffInSeconds < (30 * 24 * 60 * 60 * 1000)) {
    const timeDifferent = Math.floor(diffInSeconds / (24 * 60 * 60 * 1000))
    return `${timeDifferent}天前`;
  } else if (diffInSeconds < (365 * 24 * 60 * 60 * 1000)) {
    const timeDifferent = Math.floor(diffInSeconds / (30 * 24 * 60 * 60 * 1000))
    return `${timeDifferent}個月前`;
  } else {
    const timeDifferent = Math.floor(diffInSeconds / (365 * 24 * 60 * 60 * 1000))
    return `${timeDifferent}年前`;
  }
}


</script>

<template>
  <!-- Navbar -->

  <Navbar></Navbar>

  <div class="container-sm" v-if="postData">
    <div class="container-postViewPageStyle">

      <!--------------------------------左半部區塊----------------------------------------->
      <div class="container-left-block">
        <!-- Carousel -->
        <div class="carousel-block">
          <PostViewCarousel :imgUrlList="imgDataImportToCarousel"></PostViewCarousel>
        </div>

        <!--------------------------------Carousel 分隔區 / 收藏按鈕區塊----------------------------------------->
        <div></div>

        <div class="message-block">

          <!--愛心及收藏功能-->
          <div class="like-and-collect-block">
            <div class="like-button-block" style="margin-right: 5px">
              <button type="button" class="btn" @click="toggleLike" @mouseenter="hovered = true"
                @mouseleave="hovered = false">
                <i :class="heartClass" style="color: #da2b2b;"></i>
              </button>
            </div>

            <div class="favorite-button-block">
              <button :class="collected ? 'btn btn-primary' : 'btn btn-outline-secondary'" type="button"
                @click="toggleCollect">
                <span v-text="collected ? '已收藏' : '收藏'"></span>
              </button>
            </div>
          </div>

          <!--------------------------------留言功能區塊----------------------------------------->
          <div class="post-message-block">
            <!-- 留言者頭像區塊 -->
            <div class="message-user-avatar-block" style="align-items: center">
              <div class="rounded-circle" style="display:flex">
                <img :src="fackData.userImageURL" alt="User" width="64" height="64" class="rounded-circle"
                  style="object-fit:cover;" />
              </div>
            </div>

            <!-- 輸入框區塊 -->
            <div class="message-input-block">
              <v-text-field v-model="comment.commentText" :rules="messageInputRules" :counter="120" :maxlength="120"
                label="留言" bg-color="white" style="margin-bottom: 16px;"></v-text-field>
              <button class="btn btn-outline-info me-2" style="width: 80px; margin-bottom: 32px; margin-left: 16px"
                type="button" @click="insertCommnet">送出</button>
            </div>

          </div>

          <!-- 底部留言區塊 -->
          <div class="message-show-block">
            <div class="follower-block" v-if="comments">

              <!--水平置中區塊-->
              <div class="single-follower-block">

                <div class="single-follower-div" v-for="comment in comments" :key="comment.commentId">

                  <!-- 留言者頭像區塊 -->
                  <div class="follower-avatar-icon-div" style="display: flex">
                    <div class="rounded-circle">
                      <img src="" alt="User" width="64" height="64" class="rounded-circle" style="object-fit:cover;" />
                    </div>
                    <div class="follower-name-and-account"
                      style="display: flex; height: 64px; line-height: 64px; padding-left: 16px">
                      <div class="follower-name-div" style="font-weight:bold; font-size: 18px">
                        {{ comment.userinfoByUserId.userName }}
                      </div>



                      <!-- <div class="follower-account-div" style="padding-left: 8px">@{{ comment.userinfoByUserId.account }}
                      </div> -->
                    </div>
                    <div class="single-message-userContextTime-div">{{
                      formatTime(comment.commentTime) }}
                    </div>
                    <div>
                      <button class="update-button" type="button" @click="editComment(comment.commentId)"
                        style="margin-left: 10px; border: 1px solid gainsboro; margin-top: 19px; border-radius: 5px; padding: 1px;">更新</button>
                    </div>
                    <div>
                      <button class="delete-button" type="button" @click="deleteComment(comment.commentId)"
                        style="margin-left: 10px; border: 1px solid gainsboro; margin-top: 19px; border-radius: 5px; padding: 1px;">刪除</button>

                    </div>

                    <!--檢舉按鈕-->
                    <!-- <div class="users-follow-button-div"
                      style="display: flex; padding-left: 16px; justify-items: center; text-align: center; align-items: center">
                      <div class="menu-block">
                        <v-menu open-on-click>
                          <template v-slot:activator="{ props }">
                            <button v-bind="props">
                              <i class="fa-solid fa-arrow-up-from-bracket fa-xl" style="color: #d88d4f;"></i>
                            </button>
                          </template>
                          <v-btn>檢舉</v-btn> -->
                    <!--如果是作者本人的話-->
                    <!-- <v-btn v-if="!isOwner">編輯</v-btn>
                        </v-menu>
                      </div>
                    </div> -->
                  </div>

                  <!-- 留言者文字區塊 -->
                  <div class="follower-detail-div">
                    <div class="single-message-userContext-div">
                      <template v-if="editingCommentId === comment.commentId">
                        <input class="sub-comment-input" v-model="editedCommentText">
                        <button class="sub-comment-send" type="button"
                          @click="updateComment(comment.commentId)">保存</button>
                      </template>
                      <template v-else>
                        <div class="follower-description-div">{{ comment.commentText }}</div>
                      </template>
                      <form action="" class="reply-form">
                        <div class="">
                          <input class="sub-comment-input" v-model="comment.subCommentText">
                          <button class="sub-comment-send" type="button"
                            @click="insertSubComment(comment.commentId, comment.subCommentText)">送出</button>
                          <button class="sub-comment-reset" type="reset">取消</button>
                        </div>
                      </form>
                    </div>

                    <!-- <div class="follower-description-div">{{ comment.commentText }}</div> -->

                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!--------------------------------右半部區塊----------------------------------------->
      <div class="container-right-block">

        <div class="whole-picture-name-block">

          <!-- 標題名稱 -->
          <div class="picture-name-block">

            <div class="picture-name-div">
              <h4 class="ellipsis" id="mainPostPicName">{{ postData.postTitle }}</h4>
            </div>

            <!--Menu按鈕區塊-->
            <div class="menu-block">
              <v-menu open-on-click>
                <template v-slot:activator="{ props }">
                  <button v-bind="props">
                    <i class="fa-solid fa-bars fa-xl" style="color: #d88d4f;"></i>
                  </button>
                </template>
                <v-btn>聯絡作者</v-btn>
                <v-btn>檢舉</v-btn>

                <!--如果是作者本人的話-->
                <v-btn v-if="!isOwner"><router-link to="/post/edit"
                    style="text-decoration:none;color:black;">編輯作品</router-link></v-btn>
              </v-menu>
            </div>

          </div>

          <!--------------------------------圖片名稱  作者內容分隔線----------------------------------------->
          <div class="whole-author-introduce-block">

            <div class="author-introduce-block">

              <!-- 頭像 -->
              <div class="author-icon-div">
                <div class="rounded-circle" style="display:flex">
                  <img :src="fackData.postUserImageURL" alt="User" width="64" height="64" class="rounded-circle"
                    style="object-fit:contain;" />
                </div>

                <!-- 名稱 -->
                <div class="author-name-div">
                  <h6 class="ellipsis" id="mainPostUserName">
                    {{ postData.userinfoByUserId.userName }}
                  </h6>
                  <br>
                </div>
              </div>

              <div class="picture-date-div">
                <p>上傳日期：{{ postData.postTime }}</p>
              </div>

              <!-- 圖片敘述 -->
              <div class="picture-description-div" style="display: flex;justify-content: center">
                <DescriptionArea :descriptionText="postData.postContent"></DescriptionArea>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!--------------------------------底部區塊----------------------------------------->

      <div class="container-button-block">

      </div>

    </div>

  </div>

  <!-- 作者相關圖片超連結 (擱置)-->

  <!--        <div class="author-picture-relative-block">-->
  <!--        </div>-->
</template>

<style scoped>
.container-postViewPageStyle {
  display: flex;
  overflow: hidden;
}

.container-left-block {
  float: left;
  width: auto;
  margin-right: 16px;
}

.carousel-block {
  position: relative;
  right: -1px;
}

.post-message-block {
  display: flex;
  align-items: center;
}

.message-block {
  position: relative;
}

.like-and-collect-block {
  display: flex;
  margin-top: 16px;
  padding: 40px 0;
  float: right;
}

.favorite-button-block button {
  width: 120px;
}

.message-user-avatar-block {
  display: inline-block;
}

.message-input-block {
  display: flex;
  width: 60%;
  align-items: center;
  margin-left: 16px;
  margin-top: 48px;
}

.container-right-block {
  float: right;
  width: 480px;
  border-radius: 16px;
  margin: 8px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}

.container-button-block {
  float: none;
  height: 80px;
}

.menu-block :hover {
  background-color: #F8F9FA;
}

.picture-name-block {
  display: flex;
  width: 480px;
  text-overflow: ellipsis;
  align-items: center;
  padding: 16px;
}

.picture-name-div {
  width: 424px;
  max-width: 416px;
}

.author-introduce-block {
  display: flex;
  padding-left: 8px;
  /*align-items: center;*/
  flex-direction: column;
}

.author-icon-div {
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
}

.author-name-div {
  display: flex;
  width: 420px;
  height: 80px;
  line-height: 80px;
  text-overflow: ellipsis;
  padding: 8px;
}

.picture-date-div {
  display: flex;
  float: right;
  text-align: left;
  margin-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
}

.picture-description-div {
  display: flex;
  float: right;
  text-align: left;
  height: 440px;
}

.ellipsis {
  margin: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

a.link-color-avoid {
  text-decoration: none;
  color: black;

}

.single-follower-div {
  margin-bottom: 24px;
}

.follower-description-div {
  width: 95%;
  padding: 8px;
  border-bottom: 1px dotted;
}

.single-message-userContextTime-div {
  display: flex;
  align-items: center;

  margin-left: 15px;

  color: rgb(130, 130, 130);
  /* padding: 5px; */
  /* margin-top: 10px; */
}

.update-button {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px, solid, gainsboro;
  color: rgb(130, 130, 130);
}

.delete-button {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px, solid, gainsboro;
  color: rgb(130, 130, 130);
}
</style>