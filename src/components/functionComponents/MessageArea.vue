<script setup>

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
              <img :src="item.userIcon" alt="User" width="64" height="64" class="rounded-circle"
                   style="object-fit:cover;"/>
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
</template>

<style scoped></style>