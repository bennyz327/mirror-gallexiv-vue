<template>
</template>

<script setup>
//往後端傳送一個請求
const response = await fetch('http://localhost:8080/userInfos');
//將後端傳回的資料轉成json格式
const data = await response.json();
//將資料印出來
console.log(data);
</script>