<script setup>

import {reactive} from "vue";

const props = defineProps({
  messageList: Array,
})
// 將物件取出
const items = reactive(props.messageList);


</script>

<template>
  <div class="follower-block" v-if="items">

      <!--水平置中區塊-->
      <div class="single-follower-block">

        <div class="single-follower-div" v-for="(item, index) in items" :key="index">

          <!-- 留言者頭像區塊 -->
          <div class="follower-avatar-icon-div" style="display: flex">
            <div class="rounded-circle">
              <img :src="item.userIcon" alt="User" width="64" height="64" class="rounded-circle"
                   style="object-fit:cover;"/>
            </div>
            <div class="follower-name-and-account"
                 style="display: flex; height: 64px; line-height: 64px; padding-left: 16px">
              <div class="follower-name-div" style="font-weight:bold; font-size: 18px">{{ item.userName }}</div>
              <div class="follower-account-div" style="padding-left: 8px">@{{ item.userAccount }}</div>
            </div>

            <!--檢舉按鈕-->
            <div class="users-follow-button-div" style="display: flex; padding-left: 16px; justify-items: center; text-align: center; align-items: center">
              <div class="menu-block">
                <v-menu
                    open-on-click
                >
                  <template v-slot:activator="{ props }">
                    <button
                        v-bind="props"
                    >
                      <i class="fa-solid fa-arrow-up-from-bracket fa-xl" style="color: #d88d4f;"></i>
                    </button>
                  </template>
                  <v-btn>檢舉</v-btn>
                  <!--如果是作者本人的話-->
                  <v-btn v-if="!isOwner">編輯</v-btn>
                </v-menu>
              </div>
            </div>
          </div>

          <!-- 留言者文字區塊 -->
          <div class="follower-detail-div">

            <div class="follower-description-div">{{ item.userDescription }}</div>

          </div>

        </div>
      </div>
    </div>

</template>

<style scoped>
.single-follower-div{
  margin-bottom: 24px;
}

.follower-description-div{
  width: 95%;
  padding: 8px;
  border-bottom:1px dotted;
}
</style>