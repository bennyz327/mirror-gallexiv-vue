<template>
</template>
<script>
//加入組件區域變數
import {ref} from "vue";
import axios from "axios";
import "jquery";

// // Use jQuery AJAX to load the navbar and footer
// $(document).ready(function () {
//   $.ajax({
//     url: 'navbar.html', // Path to your navbar.html file
//     success: function (data) {
//       $('#navbar-container').html(data);
//     }
//   });
// });
// // Use jQuery AJAX to load the navbar and footer
// $(document).ready(function () {
//   $.ajax({
//     url: 'footer.html', // Path to your footer.html file
//     success: function (data) {
//       $('#footer-container').html(data);
//     }
//   });
// });


// 獲取圖片資料並插入到容器中
// const apiUrl = 'https://your-backend-api-url';
//
// axios.get(apiUrl)
//     .then(response => {
//       const imageContainer = document.getElementById('imageContainer');
//       response.data.forEach(imageData => {
//         const imageElement = document.createElement('img');
//         imageElement.src = imageData.url; // 假設資料中包含圖片的URL
//         imageContainer.appendChild(imageElement);
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });

//flexslider圖片輪播
// $(document).ready(function () {
//   // The slider being synced must be initialized first
//   $(`#carousel`).flexslider({
//     animation: "slide",
//     controlNav: false,
//     animationLoop: false,
//     slideshow: false,
//     itemWidth: 210,
//     itemMargin: 5,
//     asNavFor: '#slider'
//   });
//
//   $('#slider').flexslider({
//     animation: "slide",
//     controlNav: false,
//     animationLoop: false,
//     slideshow: false,
//     sync: "#carousel"
//   });
// });

export default {
  name: "postShowAllPage",
  components: {
    Vuecarousel
  },
  props: {},
  setup() {
    const picpath = ref("./src/assets/Picture");
    return {
      picpath,
      Vuecarousel,
      data: [
        '<div class="example-slide">Slide 1</div>',
        '<div class="example-slide">Slide 2</div>',
        '<div class="example-slide">Slide 3</div>',
      ]
    };
  },
};

</script>

<style scoped>
.example-slide {
  align-items: center;
  background-color: #666;
  color: #999;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  min-height: 10rem;
}
</style>