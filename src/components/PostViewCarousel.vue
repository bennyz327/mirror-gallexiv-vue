<script setup>
import {ref, reactive} from 'vue'
import {Carousel, Slide} from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'
const currentSlide = ref(0);

// 傳回物件
const props = defineProps({
  imgUrlList: Array,
})

// 將物件(圖片陣列:僅有url不包含任何key)
const items = reactive(props.imgUrlList);

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
            <img :src="item" class="slideImgs card-img-top" @click="currentSlide = index">
          </div>
        </Slide>
      </Carousel>
    </div>
    <div class="carousel-down">
      <Carousel
          id="thumbnails"
          :items-to-show="5"
          :wrap-around="true"
          v-model="currentSlide"
          ref="carousel"
      >
        <Slide v-for="(item, index) in items" :key="index">
          <div class="carousel__item">
            <img :src="item" class="slideImgs card-img-top" @click="currentSlide = index">
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<style scoped>

.carousel-block {
  max-width: 800px;
}
.carousel-down {
  max-height: 196px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}

.carousel-top img {
  max-height: 400px;
}

.carousel-down img {
  max-height: 120px;
}

</style>