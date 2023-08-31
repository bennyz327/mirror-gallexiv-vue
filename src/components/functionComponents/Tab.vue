<script setup>
import { ref, onMounted } from 'vue';

// Elements
const $nav = ref(null);
const $links = ref(null);
const $bar = ref(null);
const $activeLink = ref(null);

// Bar state
const bar = ref({
  width: 0,
  pos: 0,
});

// Set initial bar position
const setBarPos = () => {
  $bar.value.style.left = `${bar.value.pos}px`;
  $bar.value.style.width = `${bar.value.width}px`;
};

// Mouse enter event handler
const handleMouseEnter = (e) => {
  const _tar = e.target;
  const _tarPos = _tar.offsetLeft;
  const _tarWidth = _tar.offsetWidth;

  // Update bar width and position
  bar.value.width = _tarWidth;
  bar.value.pos = _tarPos;

  // Update bar position with animation
  setBarPos();
};

// Initialize when component is mounted
onMounted(() => {
  $nav.value = document.getElementById('nav');
  $links.value = $nav.value.querySelectorAll('a');
  $bar.value = document.getElementById('nav-bar');
  $activeLink.value = $nav.value.querySelector('a.active');

  // Initialize bar position
  bar.value.width = $activeLink.value ? $activeLink.value.offsetWidth : $links.value[0].offsetWidth;
  bar.value.pos = $activeLink.value ? $activeLink.value.offsetLeft : $links.value[0].offsetLeft;
  setBarPos();

  // Attach mouseenter event listener to links
  $links.value.forEach((link) => {
    link.addEventListener('mouseenter', handleMouseEnter);
  });
});
</script>

<template>
  <div>
    <div id="nav">
      <a class="active">Home</a>
      <a>Blog</a>
      <a>About</a>
      <a>Services</a>
      <a>Contact Us</a>
      <div id="nav-bar"></div>
    </div>
  </div>
</template>

<style scoped>
body {
  margin-top: 40px;
  text-align: center;
}

nav {
  display: inline-block;
  text-align: center;
  position: relative;

  #nav-bar {
    position: absolute;
    top: 100%;
    left: 0;
    height: 4px;
    background: dodgerblue;
  }

  a {
    display: inline-block;
    cursor: pointer;
    padding: 10px 15px;
    position: relative;

    &.active {
      position: relative;

      &:after {
       @extend #nav-bar;
       content: "";
       right: 0;
       z-index: -1;
      }
    }
  }
}
</style>