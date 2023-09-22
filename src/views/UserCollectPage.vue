<script setup>
import {ref, computed, onMounted, reactive} from 'vue';
import axios from 'axios';
import Navbar from "../components/Navbar.vue";
import {useUserStore} from "@/store/userStore.js";
const {isLogin,token,name} = useUserStore()

let decodeName = eval("'"+name+"'")
import PostPictureView from "@/components/PostPictureView.vue";


// const json = ref(jsonFile)
const json = ref([])

// HomePage 假資料
// const imgDataImportHomePage = ref(imgJsonFile);
const URL =  import.meta.env.VITE_API_Post
const PostDetail = reactive({});

const loadAllPost = async () => {
  try{
    const response = await axios.get(`${URL}?s=2`,{
      headers: {
        'Authorization': token
      }
    })
    console.log(response.data.data)
    PostDetail.value = response.data.data;
    PostDetail.value.forEach((item) => {
      // console.log(imgUrlList.value)
      console.log("進迴圈"+item)
      loadblobUrl(item);
    });

  }catch (error){
    console.error('加载本地 JSON 文件失败：', error);
  }
};

loadAllPost();

//拿出使用者狀態
onMounted(() => {
  console.log(useUserStore())
})

// 圖片功能
const loadblobUrl = async (item) => {
  if (!item || !item.picturesByPostId || item.picturesByPostId.length === 0) {
    return;
  }
  const IMGURL = import.meta.env.VITE_API_PICTURE
  const a = item.picturesByPostId[0].pictureId;
  try {
    const blob = await load(`${IMGURL}/test/${a}`);
    item.blobUrl = window.URL.createObjectURL(blob);
  } catch (error) {
    console.error('Failed to load image:', error);
  }
};

//  圖片加載
const load = async (src) => {
  const config = { url: src, method: 'get', responseType: 'blob',headers:{ 'Authorization': token } };
  const response = await axios.request(config);
  return response.data; // the blob
};

// 此頁面需要作者收藏過的所有貼文

</script>

<template>
<Navbar></Navbar>

  <div class="container">
  <h3>收藏</h3>

    <div class="collect-post-div">
    <PostPictureView :imgUrlList="PostDetail"></PostPictureView>
    </div>

  </div>
</template>

<style scoped>

</style>