<script setup>
import '@/assets/css/postViewPage.css';
import Navbar from "../components/Navbar.vue";
import PostViewCarousel from "../components/PostViewCarousel.vue";
import InputTextBox from "../components/InputTextBox.vue";
import axios from "axios";
import { ref, onMounted, reactive, computed, nextTick } from 'vue';
import Message from "../components/MessageArea.vue";


// 圖片區假資料
const imgDataReference = ref([
  {
    "pictureId": "0",
    "imgPath": "https://cdn.discordapp.com/attachments/940525773457072169/1143597896827162654/101585724_p1.png",
  },
  {
    "pictureId": "1",
    "imgPath": "https://cdn.discordapp.com/attachments/940525773457072169/1143599997208776757/101317845_p0.png",
  },
  {
    "pictureId": "2",
    "imgPath": "https://cdn.discordapp.com/attachments/940525773457072169/1143601111375286352/RABBIT_108010979_p0.jpg",
  }
]);

// 匯入資料到carousel
const imgDataImportToCarousel = reactive(
  imgDataReference.value.map(item => item.imgPath)
);

// 其他區域假資料

const testData = ref(null);

const fetchData = async () => {
  try {

    const fakeUserData = {
      "postUserName": "Aosora",
      "postDescription": "夏萊的老師有無窮的包容力  還有無限的地下室",
      "postTitle": "Fbi Open UP",
      "userImageURL": "https://i.imgur.com/6rpzbog.gif",
      "postUserImageURL": "https://media.discordapp.net/attachments/782068953899335710/1138768475754598420/83E0E2EE11DE10FD3314E2FE2D1EBDAE.gif",
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


const postId = 1;
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
loadComments();


//新增留言
const comment = {
  "postId": 1,
  "commentText": "",
  "parentCommentId": null
}
const showInsertComment = ref(true);
async function insertCommnet() {
  const URL_COMMENT = import.meta.env.VITE_API_COMMENT;
  try {
    const resInsertComment = await axios.post(`${URL_COMMENT}/insert`, comment)
    console.log(resInsertComment.status)
    comment.commentText = ""//清空input
    console.log('Response from server:', resInsertComment.data);
  } catch (error) {
    console.error('Error sending comment:', error);
  }
  //reload loadComments()
  loadComments();
}

//新增子留言
const insertSubComment = async (commentId, subCommentText) => {
  const URL_COMMENT = import.meta.env.VITE_API_COMMENT;
  try {
    console.log(comment.value);
    const commentDto = {
      postId: comment.postId,
      commentText: subCommentText,
      parentCommentId: commentId,
    }
    const resSubComment = await axios.post(`${URL_COMMENT}/insert`, commentDto)
    console.log(resSubComment.status);
    comment.subCommentText = ""
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
      const resDeleteComment = await axios.delete(`${URL_COMMENT}/delete?commentId=${commentId}`);
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
  const resUpdateComment = await axios.put(`${URL_COMMENT}/update?commentId=${commentId}&commentText=${commentText}`);
  console.log('Saving edited comment:', resUpdateComment.value);
  // 清空初始值
  editingCommentId.value = null;
  originalCommentText.value = '';
  editedCommentText.value = '';
  loadComments();
};
//---------------------------------------------//

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

  <div class="container" v-if="testData">
    <div class="container-postViewPageStyle">

      <!--------------------------------左半部區塊----------------------------------------->
      <div class="container-left-block">
        <!-- Carousel -->
        <div class="carousel-block">
          <PostViewCarousel :imgUrlList="imgDataImportToCarousel"></PostViewCarousel>
        </div>

        <!--------------------------------Carousel 分隔區 / 收藏按鈕區塊----------------------------------------->
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
            <div class="message-user-avatar-block">
              <div class="rounded-circle" style="display:flex">
                <img :src="testData.userImageURL" alt="User" width="64" height="64" class="rounded-circle"
                  style="object-fit:cover;" />
              </div>
            </div>

            <!-- 輸入框區塊 -->
            <form action="">
              <div class="message-input-block">
                <input class="message-input-area" v-model="comment.commentText"
                  style="margin-right: 10px; width: 300px; height: 45px;"><button class="message-input-send-button"
                  type="button" @click="insertCommnet">送出</button><button class="message-input-resert-button"
                  type="reset">取消</button>
              </div>
            </form>
          </div>

          <!-- 底部留言區塊 -->
          <!-- <Message v-if="showInsertComment" /> -->
          <div class="message-show-block" v-if="showInsertComment">
            <div class="single-message-block" v-for="comment in comments" :key="comment.commentId">
              <div class="single-message-div">
                <!-- 留言者頭像 -->
                <img class="single-message-user-icon-div" src="" alt="">
                <!-- userName -->
                <a class="single-message-userName-div" href="">@{{ comment.userinfoByUserId.userName }}</a>

                <!-- userContextTime -->
                <p class="single-message-userContextTime-div">{{ formatTime(comment.commentTime) }}<button
                    class="update-button" type="button" @click="editComment(comment.commentId)"
                    style="margin-left: 10px; box-sizing: border-box; border: 1px solid gainsboro; padding: 2px; border-radius: 5px;">更新</button><button
                    class="delete-button" type="button" @click="deleteComment(comment.commentId)"
                    style="margin-left: 10px; box-sizing: border-box; border: 1px solid gainsboro; padding: 2px; border-radius: 5px;">刪除</button>
                </p>

                <!-- userContext -->
                <div class="single-message-userContext-div">
                  <template v-if="editingCommentId === comment.commentId">
                    <input class="sub-comment-input" v-model="editedCommentText">
                    <button class="sub-comment-send" type="button" @click="updateComment(comment.commentId)">保存</button>
                  </template>
                  <template v-else>
                    <p>{{ comment.commentText }}</p>
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
              <h4 class="ellipsis" id="mainPostPicName">{{ testData.postTitle }}</h4>
            </div>

            <div class="menu-block">
              <i class="fa-solid fa-bars fa-xl" style="color: #d88d4f;"></i>
            </div>

          </div>

          <!--------------------------------圖片名稱  作者內容分隔線----------------------------------------->
          <div class="whole-author-introduce-block">

            <div class="author-introduce-block">

              <!-- 頭像 -->
              <div class="author-icon-block">
                <div class="rounded-circle" style="display:flex">
                  <img :src="testData.postUserImageURL" alt="User" width="64" height="64" class="rounded-circle"
                    style="object-fit:contain;" />
                </div>

                <!-- 名稱 -->
                <div class="author-name-block">
                  <h6 class="ellipsis" id="mainPostUserName">
                    {{ testData.postUserName }}
                  </h6>
                  <br>
                </div>
              </div>

              <!-- 圖片敘述 -->
              <div class="picture-description-block">
                <div class="description-block">
                  <p id="descriptionText" style="display:none">{{ testData.postDescription }}</p>
                  <a href="javascript:"
                    onclick="descriptionText.style.display=descriptionText.style.display==='none'?'':'none'"><i
                      class="fa-solid fa-crop-simple fa-bounce" style="color: #d88d4f;">顯示/隱藏敘述</i></a>
                  <!-- 可容納300字元左右 -->
                </div>
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
.message-show-block {
  margin: 10px;
}

.single-message-block {
  box-sizing: border-box;
  /* border: 1px solid gainsboro; */
  /* margin-bottom: 10px; */
  margin: 7px;
  height: 150px;

}

.single-message-userName-div {
  float: left;
  display: flex;
  text-decoration: none;
  box-sizing: border-box;
  border: 1px solid rgb(157, 157, 157);
  border-radius: 50px;
  color: rgb(96, 96, 96);
  padding: 3px;
  margin-top: 10px;

}

.single-message-userContextTime-div {
  float: left;
  display: flex;
  /* align-items: center; */
  margin-left: 15px;
  box-sizing: border-box;
  color: rgb(130, 130, 130);
  padding: 5px;
  margin-top: 10px;
}

.update-button {
  box-sizing: border-box;
  border: 1px, solid, gainsboro;
}

.sub-comment-input {
  float: left;
  display: flex;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid gainsboro;
}

.sub-comment-send {
  margin: 0, 5px, 0, 5px;
  padding: 3px;
  box-sizing: border-box;
  border: 1px solid gainsboro;
  border-radius: 5px;
}

.sub-comment-reset {
  margin: 0, 5px, 0, 5px;
  padding: 3px;
  box-sizing: border-box;
  border: 1px solid gainsboro;
  border-radius: 5px;
}


.single-message-userContext-div {
  /* width: 600px; */
  clear: both;
  /* border: 1px solid gainsboro; */
  width: 500px;
  height: 40px;
}
</style>