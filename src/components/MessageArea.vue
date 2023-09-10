<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
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
onMounted(loadComments);

//inpu sbuComment 並顯示
async function insertSubComment(parentComment) {
  const subComment = {
    "postId": 1,
    commentText: replyText.value,
    parentCommentId: parentComment.commentId,
  };
  const URL_COMMENT = import.meta.env.VITE_API_COMMENT;
  try {
    const resInsertSubComment = await axios.post(`${URL_COMMENT}/insert`, subComment);
    console.log(resInsertSubComment.status);
    if (resInsertSubComment.status === 200) {
      // 确保 parentComment.subComments 存在并且是数组
      if (!parentComment.subComments) {
        parentComment.subComments = [];
      }
      // 添加新的子留言到 parentComment.subComments
      parentComment.subComments.push(resInsertSubComment.data);
    }
    replyText.value = "";
    console.log('Response from server:', resInsertSubComment.data);
  } catch (error) {
    console.error('Error sending comment:', error);
  }
}


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
  <div class="message-show-block">
    <div class="single-message-block" v-for="comment in comments" :key="comment.commentId">
      <div class="single-message-div">
        <!-- 留言者頭像 -->
        <img class="single-message-user-icon-div" src="" alt="">
        <!-- userName -->
        <a class="single-message-userName-div" href="">@{{ comment.userinfoByUserId.userName }}</a>

        <!-- userContextTime -->
        <p class="single-message-userContextTime-div">{{ formatTime(comment.commentTime) }}</p>
        <!-- userContext -->
        <div class="single-message-userContext-div">
          <p>{{ comment.commentText }}</p>
          <form action="" class="reply-form">
            <div class="">
              <input class="sub-comment-input" v-model="comment.replyText">
              <button class="sub-comment-send" type="button" @click="insertSubComment(comment)">送出</button>
              <button class="sub-comment-reset" type="reset">取消</button>
            </div>
          </form>
        </div>

        <br>

        <!-- 子留言 input -->


        <!-- 子留言內容 -->
        <div class="single-message-block sub-comment" v-for="subComment in comment.subComments"
          :key="subComment.commentId">
          <a class="single-message-userName-div" href="">@{{ subComment.userinfoByUserId.userName }}</a>
          <p class="single-message-userContextTime-div">{{ formatTime(subComment.commentTime) }}</p>
          <div class="single-message-userContext-div">
            <p>{{ subComment.commentText }}</p>
            <!-- 这里也需要使用 subComment.subReplyText -->
            <input class="sub-comment-input" v-model="subComment.subReplyText">
            <button class="sub-comment-send" type="button" @click="insertSubComment(subComment)">送出</button>
            <button class="sub-comment-reset" type="reset">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
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