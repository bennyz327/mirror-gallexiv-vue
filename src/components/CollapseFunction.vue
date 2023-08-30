<script setup>
import {nextTick, reactive, ref} from "vue";

const props = defineProps({
  descriptionText: Text
});

const content = reactive(props.descriptionText);

const isHide = ref(true);
const hideIntroduceRef = ref(null);

function onShow() {
  isHide.value = false;
}

function onHide() {
  isHide.value = true;
}
</script>

<template>

  <div id="introduceBlock" v-if="content">
    <template v-if="isHide">
      <div class="hideIntroduce" :class="{ 'show': !isHide }" :ref="hideIntroduceRef">
        <p class="summary">{{ content }}</p>
        <div class="showBtn">
          <a href="#" @click.stop.prevent="onShow">展開內容</a>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="showIntroduce">
        <p>{{ content }}</p>
        <div class="hideBtn">
          <a href="#" @click.stop.prevent="onHide">收起</a>
        </div>
      </div>
    </template>
  </div>


<!--  //&nbsp;<span class="downArrow"></span>-->
<!--箭頭符號-->

</template>

<style scoped>

.hideIntroduce {
  height: 120px;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.hideIntroduce.show {
  max-height: 720px;
  transition: max-height 0.3s ease;
}

.hideIntroduce {
//height: 2000px; //width: 960px; //margin: 1.5rem; //padding: 1.5rem; //padding-bottom: 0; //position: relative;
}

.showIntroduce {
//width: 960px; //margin: 1.5rem; //padding: 1.5rem;
}

.summary {
  overflow: hidden;
  text-overflow: clip;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

#introduceBlock p {
  text-decoration: none;
}

.showBtn {
  width: 100%;
  height: 3rem;
  z-index: 0;
  text-align: center;
  padding-top: 3rem;
//top: 3rem; left: 0;
}

.hideBtn {
  display: flex;
  width: 100%;
  height: 3rem;
  text-align: center;
  justify-content: center;
}

.hideBtn a {
  color: #d88d4f;
  display: flex;
//text-decoration: none;
}

.showBtn a {
  color: #d88d4f;
  position: relative;
  bottom: 64px;
//text-decoration: none;
}

.downArrow {
  //display: block;
  //width: 8px;
  //height: 8px;
  //border-right: 1px solid;
  //border-bottom: 1px solid;
  //transform: rotate(45deg);
  //margin-bottom: 3px;
  //color: #d88d4f;
}


.upArrow {
  /*display: block;*/
  /*width: 8px;*/
  /*height: 8px;*/
  /*border-right: 1px solid;*/
  //border-bottom: 1px solid;
  //transform: rotate(225deg);
  //margin-top: 3px;
}

</style>