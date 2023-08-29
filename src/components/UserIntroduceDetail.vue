<script setup>
import {reactive, ref} from "vue";

const content = "ブクマやコメントして下さる方、誠にありがとうございます！私の描いた絵に対し、稀に「○○に使用させて下さい」と仰ってくれる人が居ます。私的利用であれば（第三者を不快にする用途でない限り）お好きに御利用下さい。とはいえ、やはり無断で利用されるよりも一言もらえた方が嬉しいので、出来る限り御連絡お願い致します。常識の範囲内で私的利用される分にはお断りしませんので、気軽にお声がけ下さい！";
const isHide = ref(true);

function onShow() {
  isHide.value = false;
}

function onHide() {
  isHide.value = true;
}

</script>


<template>

  <div id="introduceBlock">
    <template v-if="isHide">
      <div class="hideIntroduce">
        <p class="summary">{{ content }}</p>
        <div class="showBtn">
          <a href="#" @click.stop.prevent="onShow">展開內容&nbsp;<span class="downArrow"></span></a>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="showIntroduce">
        <p>{{ content }}</p>
        <div class="hideBtn">
          <a href="#" @click.stop.prevent="onHide">收起&nbsp;<span class="upArrow"></span></a>
        </div>
      </div>
    </template>
  </div>

</template>

<style scoped>

.hideIntroduce {
  width: 960px;
  margin: 1.5rem;
  padding: 1.5rem;
  padding-bottom: 0;
  position: relative;
}

.showIntroduce {
  width: 960px;
  margin: 1.5rem;
  padding: 1.5rem;
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
  position: absolute;
  top: 3rem;
  left: 0;
  z-index: 0;
  text-align: center;
  padding-top: 3rem;
}

.hideBtn {
  text-decoration: none;
}

.downArrow {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 1px solid;
  border-bottom: 1px solid;
  transform: rotate(45deg);
  margin-bottom: 3px;
}

.upArrow {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 1px solid;
  border-bottom: 1px solid;
  transform: rotate(45deg);
  margin-top: 3px;
}

</style>