<script setup>
import {ref, reactive, computed, onUpdated} from 'vue'
import {Carousel, Slide} from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

// 傳回物件
const props = defineProps({
  imgUrlList: Array,
})

// 將物件(圖片陣列:僅有url不包含任何key)
const items = ref(props.imgUrlList);

const currentSlide = ref(0);

// const itemsVal = ref(props.items.length);

function prev() {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
}

function next() {
  if (currentSlide.value < props.imgUrlList.length - 1) {
    currentSlide.value++;
  }
}

const slideTo = (val) => {
  currentSlide.value = val;
};


</script>

<template>

  <div class="whole-carousel-div">
    <Carousel ref="carousel" v-model="currentSlide">
      <Slide v-for="(item,index) in items" :key="index">
        <div class="carousel__item">
          <div class="carousel-img-div">
            <img :src="item.url" @click="currentSlide = index" class="carousel-img">
          </div>
        </div>
      </Slide>
    </Carousel>

    <div class="preview-click-button-div">
      <div class="button-and-val-div">
        <v-btn @click="prev">Prev</v-btn>
        <div class="val-block">
          <div class="val-div" v-for="(item,index) in items" :key="index" :class="{ 'active': index === currentSlide }">
            {{ index }}
          </div>
        </div>
        <v-btn @click="next">Next</v-btn>
      </div>

      <div class="carousel-down">
        <Carousel
            id="thumbnails"
            :items-to-show="3"
            :wrap-around="true"
            slideWidth="120"
            v-model="currentSlide"
            ref="carousel"
        >
          <Slide v-for="(item,index) in items" :key="index">
            <div class="carousel__item" @click="slideTo(index - 1)">
              <img :src="item.url" @click="currentSlide = index" class="preview-carousel-img">
            </div>
          </Slide>
        </Carousel>
      </div>
    </div>
  </div>

</template>

<style scoped>

.whole-carousel-div{
  max-width: 720px;
}

.carousel-img-div {
  max-width: 720px;
  max-height: 400px;
}

.carousel-img {
  width: 720px;
  max-width: 720px;
  height: 400px;
  object-fit: contain;
}

.button-and-val-div {
  display: flex;
  justify-content: space-between; /* 水平分散排列 */
  margin: 16px 0;
}

.val-block {
  display: flex;
  text-align: center;
  align-items: center;

}

.val-div {
  margin: 0 2px;
  width: 24px;
  height: 24px;
}

.carousel-down {
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}

.preview-carousel-img {
  width: 180px;
  height: 120px;
  object-fit: contain;
}

.active {
  color: red; /* 设置所需的颜色 */
}

</style>