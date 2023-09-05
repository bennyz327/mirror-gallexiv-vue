<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
const postId = 1;

//依 postId 找到 userName, commentTest, commentTime
const comments = ref([]);
const URL = import.meta.env.VITE_API_COMMENT;
const loadComments = async () => {
  try {
    const response = await axios.get(`${URL}/findByPostId?postId=${postId}`);
    console.log(response.data);
    comments.value = response.data.data; // 假設返回的數據在 response.data 的 data 屬性中
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}
onMounted(loadComments);

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
  <!-- 将留言显示的逻辑移动到这里 -->
  <div class="message-show-block">
    <div class="single-message-block" v-for="comment in comments" :key="comment.commentId">
      <div class="single-message-div">
        <!-- 留言者頭像 -->
        <div class="single-message-user-icon-div"></div>
        <!-- userName -->
        <div class="single-message-userName-div">
          <a href="">@{{ comment.userinfoByUserId.userName }}</a>
        </div>
        <!-- userContextTime -->
        <div class="single-message-userContextTime-div">{{ formatTime(comment.commentTime) }}</div>
        <!-- userContext -->
        <div class="single-message-userContext-div">
          <!-- <span v-if="comment.commentByParentCommentId">
            @{{ comment.commentByParentCommentId.userinfoByUserId.userName }}
          </span> -->
          {{ comment.commentText }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.single-message-userName-div {
  float: left;
  display: flex;
}

.single-message-userContextTime-div {
  float: right;
  display: flex;
  align-items: center;
}

.single-message-userContext-div {
  clear: both;
}
</style>