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
console.log(items.value.length)
// 可滑動數量
const maxSlide = ref(Math.min(items.value.length, 5, 1));
const maxSlideT = ref(props.imgUrlList.length);


//
// const itemsToShow = ref(-2);
// const dynamicItemsToShow = computed(() =>{
//   return Math.min(items.length, itemsToShow.value, 5)
// })

const currentSlide = ref(0);

const slideTo = (val) => {
  currentSlide.value = val;
};

</script>

<template>
  <div class="carousel-block">
    <div class="carousel-top">
      <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
        <Slide v-for="(item, index) in items" :key="index">
          <div class="carousel__item">
            <img :src="item.url" @click="currentSlide = index">
          </div>
        </Slide>
      </Carousel>
    </div>
    <div class="carousel-down">
      <Carousel
          id="thumbnails"
          :items-to-show="4"
          :wrap-around="true"
          v-model="currentSlide"
          ref="carousel"
      >
        <Slide v-for="(item, index) in items" :key="index">
          <div class="carousel__item">
            <img :src="item.url" @click="currentSlide = index" style="  padding: 0 32px;">
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>

.carousel-block {
  max-width: 760px;
}

.carousel-top img {
  max-width: 760px;
  max-height: 400px;
  object-fit: contain;
}

.carousel-down {
  max-height: 120px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}

.carousel-down img {
  width: 180px;
  height: 120px;
  object-fit: cover;
}


</style>