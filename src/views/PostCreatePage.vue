<script setup>
import Navbar from "@/components/Navbar.vue";

import $ from 'jquery';

import '../assets/js/upload/jquery-1.8.3.min.js'
import '../assets/css/upload/index.css'
import '../assets/css/upload/common.css'


import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useUserStore } from "@/store/userStore.js";
import router from "@/router/router.js";

const { token } = useUserStore();
const postTitle = ref("");
const postDescription = ref("");
const nsfwValue = ref(0);
const isPublic = ref(0);

//先用MAP處理刪除操作
const newImgMap = new Map();
const fileArrMap = new Map();

//貼文Title限制
const postTitleRules = [
  (value) => {
    if (value && value.length <= 30 && value.trim().length > 0) {
      return true;
    } else if (!value || value.trim().length === 0) {
      return "至少必須輸入一個字元作為標題";
    } else {
      return "字數不能超過 30 個字";
    }
  },
];

//貼文description限制
const postDescriptionRules = [
  (value) => {
    if (value && value.length <= 250) {
      return true;
    } else if (value && value.length > 250) {
      return "字數不能超過 250 個字";
    } else {
      return true;
    }
  },
];

// tag function並且取得value
const tags = ref([]);
const tagsAsJson = ref(JSON.stringify(tags.value));
watch(tags, (newTags) => {
  console.log(newTags);
  tagsAsJson.value = JSON.stringify(newTags);
});


$(function () {
  var delParent;
  var defaults = {
    fileType: ["jpg", "png", "bmp", "jpeg"],   // 上傳圖片類型
    fileSize: 1024 * 1024 * 10                  // 上傳圖片大小 10MB
  };

  // 	點選圖片的外框時
  $(".file").change(function () {
    var idFile = $(this).attr("id");
    var file = document.getElementById(idFile);
    var imgContainer = $(this).parents(".z_photo"); //存放圖片的父元素
    var fileList = file.files; //獲取圖片檔案
    var input = $(this).parent(); //獲取文本框

    //遍歷
    var numUp = imgContainer.find(".up-section").length;
    var totalNum = numUp + fileList.length;  //總數量

    console.log("存圖片物件狀態")
    console.log(newImgMap)
    console.log("totoalNum: " + totalNum)

    if (fileList.length > 20 || totalNum > 20) {
      alert("上傳圖片不可超過20張");
    } else if (numUp <= 20) {
      fileList = validateUp(fileList);

      console.log("總數量")
      console.log(totalNum)
      console.log("本次點選上傳數量")
      console.log(fileList.length)

      for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(fileList[i]);

        console.log("單圖片網址")
        console.log(imgUrl)

        newImgMap.set(numUp + i, imgUrl);
        fileArrMap.set(numUp + i, fileList[i]);

        var $section = $("<section class='up-section fl loading'>");
        imgContainer.append($section);
        var $span = $("<span class='up-span'>");
        $span.appendTo($section);

        var $img0 = $("<img class='close-upimg'>").on("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
          $(".works-mask").show();
          delParent = $(this).parent();
        });
        $img0.attr("src", "/src/assets/Picture/upload/deleteButton.png").appendTo($section);
        const $img = $("<img class='up-img up-opcity'>");

        console.log(i)
        console.log("本次存入後物件狀態")
        console.log(newImgMap)

        $img.attr("arrId", numUp + i);
        $img.attr("src", imgUrl);
        $img.appendTo($section);
        var $p = $("<p class='img-name-p'>");
        $p.html(fileList[i].name).appendTo($section);
        var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
        $input.appendTo($section);
        var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
        $input2.appendTo($section);
      }
    }
    setTimeout(function () {
      $(".up-section").removeClass("loading");
      $(".up-img").removeClass("up-opcity");
    }, 450);
    numUp = imgContainer.find(".up-section").length;
    if (numUp > 20) {
      $(this).parent().hide();
    }
    //input内容清空讓相同圖片可繼續上傳
    file.value = "";
  });


  $(".z_photo").delegate(".close-upimg", "click", function () {
    $(".works-mask").show();
    delParent = $(this).parent();
  });

  $(".wsdel-ok").click(function () {
    $(".works-mask").hide();
    var numUp = delParent.siblings().length;
    if (numUp < 20) {
      delParent.parent().find(".z_file").show();
    }
    delParent.remove();

    //先找到父元件arrId屬性的值，根據此值移除map中的正確資料
    var arrId = delParent.find(".up-img").attr("arrId");
    console.log("要移除key為 " + arrId + " 的圖片");
    newImgMap.delete(parseInt(arrId));
    fileArrMap.delete(parseInt(arrId));

  });

  $(".wsdel-no").click(function () {
    $(".works-mask").hide();
  });

  function validateUp(files) {
    var arrFiles = [];//替換文件陣列
    for (var i = 0, file; file = files[i]; i++) {
      //名稱上傳的後綴名稱
      var newStr = file.name.split("").reverse().join("");
      if (newStr.split(".")[0] != null) {
        var type = newStr.split(".")[0].split("").reverse().join("");
        console.log(type + "===type===");
        if (jQuery.inArray(type, defaults.fileType) > -1) {
          // 類型符合才可上傳
          if (file.size >= defaults.fileSize) {
            // alert(file.size);
            alert('檔案名稱: "' + file.name + '"的項目太大');
          } else {
            // 判斷所有文件
            arrFiles.push(file);
          }
        } else {
          alert('檔案名稱: "' + file.name + '"上傳類型不符合');
        }
      } else {
        alert('檔案名稱: "' + file.name + '"類型無法識別');
      }
    }
    return arrFiles;
  }
})

const PLANURL = import.meta.env.VITE_API_PLAN;
const planData = ref();
const selectedPlan = ref();
const getPlanData = async () => {
  try {
    const response = await axios.get(`${PLANURL}/personalPlan?state=1`, { headers: { 'Authorization': token } })
    planData.value = response.data.data;
    console.log(planData.value)
  } catch (error) {
    console.error('提交表单时出错：', error);
  }
}
getPlanData();

const submitForm = (newImgMap, fileMap) => {

  //map轉成字串陣列，只是看看，沒有用到
  const imgArr = Array.from(newImgMap.values());

  if (fileMap.size < 1) {
    alert('請選擇上傳圖片')
    return;
  }

  console.log("圖片Map物件");
  console.log(fileMap);
  console.log(typeof fileMap);

  const fileArray = Array.from(fileMap.values());
  console.log("檔案Array")
  console.log(fileArray)
  console.log(typeof fileArray)

  //這行是?
  // const formattedDescription = postDescription.value.replace(/\n/g, '<br/>');

  const postData = {
    title: postTitle.value,
    description: postDescription.value,
    nsfw: nsfwValue.value,
    isPublic: isPublic.value,
    tags: tags.value.toString(),
    planId: selectedPlan.value,
  };

  const formData = new FormData();
  console.log(postData)
  console.log('送formData');

  //放入所有圖片和JSON資料
  fileArray.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('other', new Blob([JSON.stringify(postData)], { type: 'application/json' }))

  //送出
  axios.post('http://localhost:8080/post/upload', formData, {
    headers: {
      'Authorization': token,
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res) => {
      router.push({name: '200'});
      console.log(res);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};


// function loadLibrary(libraryPath) {
//   let newScript = document.createElement('script')
//   newScript.setAttribute('src', libraryPath)
//   document.head.appendChild(newScript)
// }
//
// onMounted(() => {
//   loadLibrary("/src/assets/js/upload/imgUp.js")
// });

</script>

<template>
  <Navbar></Navbar>

  <div class="container">
    <div class="text-div">
      <h4>新增文章</h4>
    </div>

    <div class="create-form-block">

      <!--上傳圖片區塊-->
      <div class="upload-block">
        <div class="img-box full">
          <section class=" img-section">
            <div class="z_photo upimg-div clear">
              <section class="z_file fl">
                <img src="/src/assets/Picture/upload/plusButton.png" class="add-img">
                <input type="file" name="file" id="file" class="file" value=""
                  accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif" multiple />
              </section>
            </div>
          </section>
          <!--        <p class="up-p">作品圖片<span class="up-span">最多可以上傳二十張圖片</span></p>-->
        </div>
        <aside class="mask works-mask">
          <div class="mask-content">
            <p class="del-p ">您確定要刪除作品嗎</p>
            <p class="check-p"><span class="del-com wsdel-ok">確定</span><span class="wsdel-no">取消</span></p>
          </div>
        </aside>
      </div>


      <div class="form-data-block">
        <!--文字輸入區域-->
        <div class="title-description-div">
          <div class="title-description-center">
            <v-sheet class="mx-auto">
              <v-form @submit.prevent>
                <h6 style="text-align: left">標題</h6>
                <v-text-field v-model="postTitle" :rules="postTitleRules" :counter="30" :maxlength="30" bg-color="white"
                  label="標題" class="v-text-field-css" />

                <h6 style="text-align: left">內文</h6>
                <v-textarea v-model="postDescription" :rules="postDescriptionRules" :counter="250" :maxlength="250"
                  bg-color="white" placeholder label="敘述你的圖片或相關內容" no-resize class="v-text-field-css" />
              </v-form>
            </v-sheet>
          </div>
        </div>

        <!--勾選及HashTag區域-->
        <div class="checkbox-and-tag-div">
          <div class="checkbox-and-tag-center">

            <div class="checkbox-nfsw">
              <div class="text-div">
                <h6 style="text-align: left; display: block">年齡及閱覽限制</h6>
              </div>
              <div style="margin-top: 8px">
                <div class="form-check-inline">
                  <input class="form-check-input" type="radio" name="NSFWRadio" id="NSFWFalse" value="0"
                    v-model="nsfwValue">
                  <label class="form-check-label" for="NSFWFalse" style="margin-left: 8px">
                    無限制
                  </label>
                </div>
                <div class="form-check-inline">
                  <input class="form-check-input" type="radio" name="NSFWRadio" value="1" id="NSFWTrue"
                    v-model="nsfwValue">
                  <label class="form-check-label" for="NSFWTrue" style="margin-left: 8px">
                    未成年不宜觀看
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <div class="checkbox-public">
              <div class="text-div">
                <h6 style="text-align: left; display: block">公開範圍</h6>
              </div>
              <div style="margin-top: 8px">
                <div class="form-check-inline">
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicTrue" value="0"
                    v-model="isPublic">
                  <label class="form-check-label" for="publicTrue" style="margin-left: 8px">
                    公開
                  </label>
                </div>
                <div class="form-check-inline">
                  <input class="form-check-input" type="radio" name="publicRadio" value="1" id="publicFalse"
                    v-model="isPublic">
                  <label class="form-check-label" for="publicFalse" style="margin-left: 8px">
                    不公開
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <div class="checkbox-plan-need">
              <div class="text-div">
                <h6 style="text-align: left; display: block">訂閱需求限制</h6>
              </div>
              <div style="margin-top: 8px">
                <div class="form-check-inline" style="width: 200px">
                  <input class="form-check-input" type="radio" name="planRadio" value="null" id="planNone"
                    v-model="selectedPlan" checked>
                  <label class="form-check-label" for="planNone" style="margin-left: 8px">
                    無限制
                  </label>
                </div>
                <div class="form-check-inline" style="width: 200px" v-for="(item, index) in planData" :key="index">
                  <input class="form-check-input" type="radio" name="planRadio" :id="'planTier' + (index + 1)"
                    :value="(index + 1)" v-model="selectedPlan">
                  <label class="form-check-label" :for="'planTier' + (index + 1)" style="margin-left: 8px">
                    Tier{{ index + 1 }} (NT$ {{ item.planPrice }})
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <h6 style="text-align: left; display: block">Tag</h6>
            <div class="tag-div" style="margin: 8px">
              <n-dynamic-tags v-model:value="tags" max="10" size="large" />
            </div>

          </div>
        </div>
      </div>

      <div class="submit-button-div" style="display: flex; justify-content: center;">
        <v-btn @click="submitForm(newImgMap, fileArrMap)"
          style="width: 1200px; height: 80px; background-color:beige; font-size: 24px ">推送貼文
        </v-btn>
      </div>

    </div>
  </div>
</template>

<style scoped>
.create-form-block {
  width: 100%;

}

.form-data-block {
  display: flex;
  flex-wrap: wrap;
}

.title-description-div {
  width: 50%;
  max-width: 50%;
  float: left;
  /* border-right: 1px solid #ccc; */
}

.title-description-center {
  display: flex;
  text-align: center;
}

.checkbox-and-tag-div {
  width: 50%;
  max-width: 50%;
  /* border-left: 1px solid #ccc; */
}

.checkbox-and-tag-center {
  width: 90%;
  padding-left: 48px;
}

.v-text-field-css {
  width: 560px;
}

@media screen and (max-width: 1400px) {}

@media screen and (max-width: 1200px) {
  .v-text-field-css {
    width: 360px;
  }
}
</style>