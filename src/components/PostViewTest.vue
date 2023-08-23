<template>
  <div class="container mt-3">
    <Carousel :items-to-show="itemToShow" :wrap-around="wrapAround" :autoplay="autoplay"
              :pauseAutoplayOnHover="pauseAutoplayOnHover">
      <Slide v-for="(item, index) in items.imageUrlList" :key="index">
        <div class="card">
          <img class="carousel__item slideImgs card-img-top" :src="item">
          <div class="card-body">
            <p class="card-text">{{ texts.textList[index] }}</p>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue'
import { Navigation, Slide, Pagination, Carousel } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const itemToShow = 2 //輪播顯示數量
const wrapAround = true //循環模式
const autoplay = 5000 //自動循環時間(單位:毫秒)
const pauseAutoplayOnHover = true //游標懸浮暫停自動循環
const items = reactive(
    {
      imageUrlList: ["https://cdn.discordapp.com/attachments/528864372202668032/1142080567979020399/image.png",
        "https://cdn.discordapp.com/attachments/528864372202668032/1136925984428392508/image.png",
        "https://cdn.discordapp.com/attachments/528864372202668032/1135057060439011369/2023-07-30_11.50.40.png",
      ]
    },
)
const texts = reactive({
  textList: [1, 2, 3]
})

</script>
<style>

.slideImgs {
  max-width: 300px;
  max-height: 200px;
}
</style>


