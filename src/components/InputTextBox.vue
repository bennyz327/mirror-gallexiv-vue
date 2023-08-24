<script setup>

</script>

<template>

  <div class="wrapper">
    <div class="input-data">
      <input type="text" required=""/>
      <div class="underline"></div>
      <label>Message</label>
    </div>
  </div>

</template>

<style scoped>

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  //background: linear-gradient(-135deg, #c850c0, #4158d0);
}

.wrapper {
  width: 440px;
  background-color: #fff;
  padding: 30px;

}

.wrapper .input-data{
  width: 100%;
  height: 40px;
  position: relative;
}

.wrapper .input-data input {
  width: 100%;
  height: 100%;
  border: none;
  border-bottom: 2px solid silver;
  font-size: 17px;
}

.input-data input:focus ~ label,
.input-data input:valid ~ label{
  transform: translateY(-20px);
  font-size: 15px;
  color: #4158d0;
}

.wrapper .input-data label {
  position: absolute;
  bottom: 10px;
  left: 0;
  color: grey;
  pointer-events: none;
  transition: all 0.3s ease;
}

.wrapper .input-data .underline {
  position: absolute;
  bottom: 0px;
  height: 2px;
  width: 100%;
}

.input data .underline:before {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background: #4158d0;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.input-data input:focus ~ .underline:before,
input-data input-valid ~ .underline:before {
  transform: scaleX(1);
}

</style>