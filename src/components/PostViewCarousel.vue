<template>
  <div class="carousel-block">
    <div class="carousel-top">
      <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
        <Slide v-for="(item, index) in items.imageUrlList" :key="index">
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
        <Slide v-for="(item, index) in items.imageUrlList" :key="index">
          <div class="carousel__item">
            <img :src="item" class="slideImgs card-img-top" @click="currentSlide = index">
          </div>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import {Carousel, Slide} from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Gallery',
  components: {
    Carousel,
    Slide,
  },
  data: () => ({
    currentSlide: 0,
    items: reactive({
      imageUrlList: [
        'https://cdn.discordapp.com/attachments/940525773457072169/1143597896827162654/101585724_p1.png',
        'https://cdn.discordapp.com/attachments/940525773457072169/1143599997208776757/101317845_p0.png',
        'https://cdn.discordapp.com/attachments/940525773457072169/1143601111375286352/RABBIT_108010979_p0.jpg',
        'https://cdn.discordapp.com/attachments/940525773457072169/1143599096771391530/102395047_p4.png',

      ],
    }),
  }),
  methods: {
    slideTo(val) {
      this.currentSlide = val
    },
  },
})
</script>


<style scoped>

.carousel-block {
  max-width: 800px;
}
.carousel-down {
  max-height: 196px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 1);
}

.carousel-top img {
  max-height: 480px;
}

.carousel-down img {
  max-height: 120px;
}

</style>