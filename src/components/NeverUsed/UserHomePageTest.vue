<script setup>
import {reactive} from "vue";

// 傳回物件
const props = defineProps({
  imgUrlList: Array,
})

// 將物件(圖片陣列:僅有url不包含任何key)
const items = reactive(props.imgUrlList);

</script>

<template>

  <div v-if="items">
    <v-row>
      <v-col
          v-for="(item, index) in items"
          :key="item.pictureId"
          class="d-flex child-flex"
          cols="3"
      >
        <v-img
            :src="item"
            :lazy-src="item"
            aspect-ratio="1"
            cover
            class="bg-grey-lighten-2"
        >
          <!-- 預載畫面 -->
          <template v-slot:placeholder>
            <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
            >
              <v-progress-circular
                  indeterminate
                  color="grey-lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>

        </v-img>
      </v-col>
    </v-row>

    <br>

    <div class="text-center">
      <v-pagination
          v-model="page"
          :length="10"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>

</template>

<style scoped>
.text-center {
  color: black
}
</style>