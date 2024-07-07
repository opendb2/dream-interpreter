<template>
  <NavBar></NavBar>
  <router-view/>
</template>

<script setup>
import NavBar from '@/components/nav.vue'
</script>

<style>
html {
	height: 100%;
}
body {
	margin: 0;
	height: 100%;
}
#app {
  height: 100%;
  background-color: #030038;
  background-image: url('../src/assets/home-bg.png');
  background-size: cover;
  margin: 0;
  display: flex;
  flex-direction: column;
}
</style>
