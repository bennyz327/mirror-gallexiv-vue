<script setup>

</script>

<template>
  <div class="container-backend">
    <div class="container-left-block">

    </div>
    <div class="container-right-block">
      <div class="search-bar">

      </div>
      <div class="data-table-div"></div>
    </div>
  </div>
</template>

<style scoped>
.container-backend {
  display: flex;
}

.container-left-block {
  width: 20%;
  height: 480px;
  margin-left: 24px;
  margin-top: 24px;
  border: 1px solid red;
}

.container-right-block {
  width: 80%;
  height: 480px;
  margin-left: 24px;
  margin-top: 24px;
  border: 1px solid blue;
}

.search-bar{
  width: 100%;
  height: 80px;
  border: 1px solid green;
}

.data-table-div{
  width: 100%;
  padding: 8px;
  height: 400px;
  border: 1px solid yellow;
}
</style>