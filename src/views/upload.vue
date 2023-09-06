<script>
import '../assets/js/upload/jquery-1.8.3.min.js'
import '../assets/css/upload/index.css'
import '../assets/css/upload/common.css'
import '../assets/js/upload/imgUp.js'

</script>

<template>
  <div class="img-box full">
    <section class=" img-section">
<!--      <p class="up-p">作品圖片<span class="up-span">最多可以上傳五張圖片</span></p>-->
      <div class="z_photo upimg-div clear" >
        <section class="z_file fl">
          <img src="/src/assets/Picture/upload/plusButton.png" class="add-img">
          <input type="file" name="file" id="file" class="file" value="" accept="image/jpg,image/jpeg,image/png,image/bmp" multiple />
        </section>
      </div>
    </section>
  </div>
  <aside class="mask works-mask">
    <div class="mask-content">
      <p class="del-p ">您確定要刪除作品嗎</p>
      <p class="check-p"><span class="del-com wsdel-ok">確定</span><span class="wsdel-no">取消</span></p>
    </div>
  </aside>
</template>

<style>

</style>