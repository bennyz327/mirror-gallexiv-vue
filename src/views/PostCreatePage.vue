<script setup>
import Navbar from "@/components/Navbar.vue";

import $ from 'jquery';

import '../assets/js/upload/jquery-1.8.3.min.js'
import '../assets/css/upload/index.css'
import '../assets/css/upload/common.css'


import {onMounted, ref, watch} from "vue";

const postTitle = ref("");
const postDescription = ref("");
//先用MAP處理刪除操作
const newImgMap= new Map();

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

// json傳入功能
const nsfw = ref(true);
const isPublic = ref(true);


$(function(){
  var delParent;
  var defaults = {
    fileType         : ["jpg","png","bmp","jpeg"],   // 上傳圖片類型
    fileSize         : 1024 * 1024 * 10                  // 上傳圖片大小 10MB
  };

  // 	點選圖片的外框時
  $(".file").change(function(){
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
    console.log("totoalNum: "+totalNum)

    if(fileList.length > 20 || totalNum > 20 ){
      alert("上傳圖片不可超過20張");
    }
    else if(numUp <= 20){
      fileList = validateUp(fileList);

      console.log("總數量")
      console.log(totalNum)
      console.log("本次點選上傳數量")
      console.log(fileList.length)

      for(var i = 0;i<fileList.length;i++){
        var imgUrl = window.URL.createObjectURL(fileList[i]);

        console.log("單圖片網址")
        console.log(imgUrl)

        newImgMap.set(numUp+i, imgUrl);
        var $section = $("<section class='up-section fl loading'>");
        imgContainer.append($section);
        var $span = $("<span class='up-span'>");
        $span.appendTo($section);

        var $img0 = $("<img class='close-upimg'>").on("click",function(event){
          event.preventDefault();
          event.stopPropagation();
          $(".works-mask").show();
          delParent = $(this).parent();
        });
        $img0.attr("src","/src/assets/Picture/upload/deleteButton.png").appendTo($section);
        const $img = $("<img class='up-img up-opcity'>");

        console.log(i)
        console.log("本次存入後物件狀態")
        console.log(newImgMap)

        $img.attr("arrId",numUp+i);
        $img.attr("src",imgUrl);
        $img.appendTo($section);
        var $p = $("<p class='img-name-p'>");
        $p.html(fileList[i].name).appendTo($section);
        var $input = $("<input id='taglocation' name='taglocation' value='' type='hidden'>");
        $input.appendTo($section);
        var $input2 = $("<input id='tags' name='tags' value='' type='hidden'/>");
        $input2.appendTo($section);
      }
    }
    setTimeout(function(){
      $(".up-section").removeClass("loading");
      $(".up-img").removeClass("up-opcity");
    },450);
    numUp = imgContainer.find(".up-section").length;
    if(numUp > 20){
      $(this).parent().hide();
    }
  });



  $(".z_photo").delegate(".close-upimg","click",function(){
    $(".works-mask").show();
    delParent = $(this).parent();
  });

  $(".wsdel-ok").click(function(){
    $(".works-mask").hide();
    var numUp = delParent.siblings().length;
    if(numUp < 20){
      delParent.parent().find(".z_file").show();
    }
    delParent.remove();

    //先找到父元件arrId屬性的值，根據此值移除map中的正確資料
    var arrId = delParent.find(".up-img").attr("arrId");
    console.log("要移除key為 "+arrId+" 的圖片");
    newImgMap.delete(parseInt(arrId));

  });

  $(".wsdel-no").click(function(){
    $(".works-mask").hide();
  });

  function validateUp(files){
    var arrFiles = [];//替換文件陣列
    for(var i = 0, file; file = files[i]; i++){
      //名稱上傳的後綴名稱
      var newStr = file.name.split("").reverse().join("");
      if(newStr.split(".")[0] != null){
        var type = newStr.split(".")[0].split("").reverse().join("");
        console.log(type+"===type===");
        if(jQuery.inArray(type, defaults.fileType) > -1){
          // 類型符合才可上傳
          if (file.size >= defaults.fileSize) {
            alert(file.size);
            alert('檔案名稱: "'+ file.name +'"的項目太大');
          } else {
            // 判斷所有文件
            arrFiles.push(file);
          }
        }else{
          alert('檔案名稱: "'+ file.name +'"上傳類型不符合');
        }
      }else{
        alert('檔案名稱: "'+ file.name +'"類型無法識別');
      }
    }
    return arrFiles;
  }
})

const submitForm = (newImgMap) => {
  //map轉成字串陣列
  const imgArr = Array.from(newImgMap.values());

  const formattedDescription = postDescription.value.replace(/\n/g, '<br/>');
  const postData = {
    title: postTitle.value,
    description: formattedDescription.value,
    nsfw: nsfw.value,
    isPublic: isPublic.value,
    tags: tags.value,
    images: imgArr,
  };

  console.log('hi')

  console.log(imgArr);

  console.log('JSON內容： ', postData);
};


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
                       accept="image/jpg,image/jpeg,image/png,image/bmp,image/gif" multiple/>
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
                <v-text-field
                    v-model="postTitle"
                    :rules="postTitleRules"
                    :counter="30"
                    :maxlength="30"
                    bg-color="white"
                    label="標題"
                    class="v-text-field-css"
                />

                <h6 style="text-align: left">內文</h6>
                <v-textarea
                    v-model="postDescription"
                    :rules="postDescriptionRules"
                    :counter="250"
                    :maxlength="250"
                    bg-color="white"
                    placeholder
                    label="敘述你的圖片或相關內容"
                    no-resize
                    class="v-text-field-css"
                />
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
              <div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="NSFWRadio" id="NSFWFalse" checked>
                  <label class="form-check-label" for="NSFWFalse">
                    無限制
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="NSFWRadio" id="NSFWTrue">
                  <label class="form-check-label" for="NSFWTrue">
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
              <div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicTrue" checked>
                  <label class="form-check-label" for="publicTrue">
                    公開
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="publicRadio" id="publicFalse">
                  <label class="form-check-label" for="publicFalse">
                    不公開
                  </label>
                </div>
              </div>
            </div>

            <hr>

            <h6 style="text-align: left; display: block">Tag</h6>
            <div class="tag-div" style="margin: 8px">
              <n-dynamic-tags v-model:value="tags"
                              max="10"
                              size="large"
              />
            </div>

          </div>
        </div>

        <v-btn @click="submitForm(newImgMap)" block class="mt-2" size="60px">推送貼文</v-btn>
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
//border-right: 1px solid #ccc;
}

.title-description-center {
  display: flex;
  text-align: center;
}

.checkbox-and-tag-div {
  width: 50%;
  max-width: 50%;
//border-left: 1px solid #ccc;
}

.checkbox-and-tag-center {
  width: 90%;
  padding-left: 48px;
}

.v-text-field-css {
  width: 560px;
}

@media screen and (max-width: 1400px) {

}

@media screen and (max-width: 1200px) {
  .v-text-field-css {
    width: 360px;
  }
  .upload-block{

  }
}

</style>