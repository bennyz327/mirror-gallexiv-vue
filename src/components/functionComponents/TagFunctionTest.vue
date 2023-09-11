<script setup>

</script>

<template>

  <div class="side-block">
    <button @click="isClicked">
    <h4>熱門標籤</h4>
    </button>
  </div>
  <div>
    <div class="d-flex flex-row">
      <div class="d-flex justify-content-between align-items-center"
           style="margin: 16px; background-color:#ffffff ">
        <router-link :to="'/tags/' + tag.tagId" class="text-decoration-none" v-for="(tag, index) in paginatedTags"
                     :key="index">
          <button style="color: #0c4128;margin-left: 8px;">
            #{{ tag.tagName }}
          </button>
        </router-link>
      </div>
    </div>
  </div>



</template>

<style scoped>

.side-block {
  width: 40px;
  text-align: center;
  position: fixed;
  float: left;
  //border: 2px solid red;
  box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
}
</style>