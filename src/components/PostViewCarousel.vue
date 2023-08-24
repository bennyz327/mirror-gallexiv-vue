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
          :items-to-show="3"
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
        'https://cdn.discordapp.com/attachments/528864372202668032/1142080567979020399/image.png',
        'https://cdn.discordapp.com/attachments/528864372202668032/1136925984428392508/image.png',
        'https://cdn.discordapp.com/attachments/528864372202668032/1135057060439011369/2023-07-30_11.50.40.png',
        'https://cdn.discordapp.com/attachments/557253153746321419/1143406386236096594/IMG20230822134828.jpg',

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