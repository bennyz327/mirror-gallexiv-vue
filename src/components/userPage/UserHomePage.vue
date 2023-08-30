<script setup>
import {computed, reactive, ref} from "vue";

// 傳回物件
const props = defineProps({
  imgUrlList: Array,
})

// 將物件取出
const items = reactive(props.imgUrlList);

const liked = ref([]);
const hovered = ref([]);

const toggleLike = (index) => {
  liked.value[index] = !liked.value[index];
};

const heartClass = computed(() => {
  return (index) => {
    if (liked.value[index] && hovered.value[index]) {
      return 'fa-solid fa-heart fa-bounce fa-lg';
    } else if (!liked.value[index] && hovered.value[index]) {
      return 'fa-regular fa-heart fa-bounce fa-lg';
    } else {
      return liked.value[index] ? 'fa-solid fa-heart fa-lg' : 'fa-regular fa-heart fa-lg';
    }
  };
});

</script>

<template>

  <div v-if="items">

    <div class="galley-middle-block">
      <div class="picture-galley-block">
        <div class="picture-item-div" v-for="(item, index) in items" :key="index">
          <a target="_blank" :href="'/post/' + item.pictureId">
            <img :src="item.imgPath" alt="pic"
                 style="width: 240px; height: 240px; object-fit: cover; border-radius: 8px;"
                 class="picure-div">
          </a>
          <!-- TODO 吃飽太閒寫hover按鈕浮現功能-->
          <div class="picture-item-text-button-div">

            <div class="picture-text-div">
              <p>{{ item.pictureName }}</p>
            </div>

            <div class="picture-item-user-div">

              <div class="picture-item-user-icon-div">
                <img :src="item.userImg" alt="User" width="32" height="32" class="rounded-circle"
                     style="object-fit: cover;border: 1px solid #ccc"/>
              </div>
              <div class="picture-item-user-name-div">
                <p>{{ item.userName }}</p>
              </div>
              <div class="like-button-div">
                <button type="button" class="btn" @click="toggleLike(index)" @mouseenter="hovered[index] = true"
                        @mouseleave="hovered[index] = false">
                  <i :class="heartClass(index)" style="color: #da2b2b;"></i>
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>

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

.galley-middle-block {
  display: flex;
  justify-content: center;
}

.picture-galley-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.picture-item-div {
  border: 1px solid #ccc;
  float: left;
  width: 264px;
  height: 336px;
  margin: 12px;
  border-radius: 16px;
  padding: 8px;
}

.picture-item-div a {
  display: flex;
  justify-content: center;
  align-items: center;
}

.picture-item-div:hover img {
  border: 2px solid #777;
//background-color: #d88d4f; opacity: 80%;
}

.picture-item-text-button-div {
  padding: 8px;

}

.picture-text-div {
//background-color: #F0EEFA; max-width: 264px;
  height: 32px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
//text-decoration: underline;
}

.picture-item-user-div {
  display: flex;
}

.picture-item-user-name-div {
  margin-left: 8px;
  max-width: 240px;
  height: 32px;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.like-button-div{
  position: relative;
  right:-80px;
  top: -8px;
}

.text-center {
  color: black;
}

</style>