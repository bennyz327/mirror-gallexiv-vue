<script setup>
import {ref, onMounted, watch} from "vue";

const props = defineProps({
  followerData: Array,
});

const items = ref([]);

const loadFollower = () => {
  try {
    items.value = props.followerData;
  } catch (error) {
    console.log('加载本地 JSON 文件失败：', error);
  }
};

onMounted(() => {
  loadFollower();
});

// 相關追隨按鈕功能(以及發送到後端)
const followed = ref(false);

const toggleUsersFollow = (userId) => {
  const userToToggle = items.value.find(item => item.userId === userId);
  if (userToToggle) {
    userToToggle.followed = !userToToggle.followed;
    sendDataToBackend(userToToggle);
  }
};
const sendDataToBackend = () => {
  // 實現向後端發送數據的邏輯
};

watch(props.followerData, (newVal) => {
  items.value = newVal.map(item => ({
    ...item,
    followed: false,
  }));
});

onMounted(() => {
  if (props.followerData) {
    items.value = props.followerData.map(item => ({
      ...item,
      followed: false,
    }));
  }
});

</script>

<template>

  <div class="follower-block" v-if="followerData">

    <div v-for="(item, index) in items" :key="index">

      <!--單獨追隨者區塊-->

      <!--水平置中區塊-->
      <div class="single-follower-block">

        <div class="single-follower-div">

          <!-- 留言者頭像區塊 -->
          <div class="follower-avatar-icon-div">
            <div class="rounded-circle" style="display:flex">
              <img v-if="item.userIcon" :src="item.userIcon" alt="User" style="border-radius: 50%; width:72px; height: 72px; "/>
              <img v-else src="../../assets/Picture/userIcon.png" alt="User" style="border-radius: 50%; width:72px; height: 72px; "/>
            </div>
          </div>

          <!-- 留言者文字區塊 -->
          <div class="follower-detail-div">

            <div class="follower-name-div">{{ item.userName }}</div>
            <div class="follower-account-div">@{{ item.userAccount }}</div>
            <div class="follower-description-div">{{ item.userDescription }}</div>

          </div>

          <!--追隨按鈕-->
          <div class="users-follow-button-div">
            <button :class="item.followed ? 'btn btn-primary' : 'btn btn-outline-secondary'" type="button"
                    @click="toggleUsersFollow(item.userId)">
              <span v-text="item.followed ? '已追隨' : '追隨'"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="text-center">
    <v-pagination
        v-model="page"
        :length="10"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
    ></v-pagination>
  </div>

</template>

<style scoped>

.follower-block {
//display: flex; //position: relative; //left:160px; justify-content: center; margin-top: 24px;
}

.rounded-circle img{
  width:64px;
  height:64px;
  object-fit: cover;
}

.single-follower-block {
  display: flex;
  justify-content: center;
}

.single-follower-div {
  height: 90px;
  margin: 8px;
//border:3px solid red;
}

.follower-avatar-icon-div {
  position: relative;
  display: inline-block;
  float: left;
  right: -8px;
  top: 8px;
}

.follower-detail-div {
  display: inline-block;
  width: 960px;
}

.follower-name-div {
  display: inline-block;
  padding-top: 8px;
  padding-left: 24px;
}

.follower-account-div {
  display: inline-block;
  padding-top: 8px;
  padding-left: 16px;
  color: #71767B;
}

.follower-description-div {
//display: inline-block; padding-left: 24px; max-width: 800px; overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.users-follow-button-div {
  display: inline-block;
  position: relative;
  right: 24px;
  top: -24px;
}

.users-follow-button-div button {
  width: 120px;
}

@media screen and (max-width: 1300px) {
  .follower-detail-div {
    max-width: 540px;
    overflow: hidden;
    margin-right: 24px;
  }
  .rounded-circle img{
    width: 32px;
    height: 32px;
    object-fit: cover;
  }
}


</style>