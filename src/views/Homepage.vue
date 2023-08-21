<script setup>

</script>

<template>

  <!-- 整個頁面的容器大小 -->

  <div class="container">

    <!-- 熱門Tag的title-->

    <div class="text-center">

      <h3>熱門標籤</h3>

    </div>

    <!-- Tag 區塊 -->

    <div class="tag-div">

      <ul class="list-group d-flex flex-row">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          A list item
          <span class="badge bg-primary rounded-pill">14</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          A second list item
          <span class="badge bg-primary rounded-pill">2</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          A third list item
          <span class="badge bg-primary rounded-pill">1</span>
        </li>
      </ul>

    </div>

    <!-- 呈現圖片內容 -->

    <div class="album py-5 bg-light">

      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        <div class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 縮圖"
                 preserveAspectRatio="xMidYMid slice" focusable="false">
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text x="50%" y="50%" fill="#eceeef"
                    dy=".3em">縮圖
              </text>
            </svg>
            <div class="card-body">
              <p class="card-text">標題列</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn- btn-outline-secondary">
                    &hearts;
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">收藏</button>
                </div>
                <small class="text-muted">9 分鐘</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>


.text-center {
  background-color: #F8F9FA;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
}

.tag-div li {
  height: 72px;
  margin: 16px;
}

.tag-div span {
  margin: 8px;
}

</style>