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


  <n-button>naive-ui</n-button>
</template>

<style scoped>
.text-center {
  color: black
}
</style>