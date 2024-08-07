<template>
  <div class="cmp-nav">
    <div class="cmp-nav-center">
      <img class="nav-logo" src='../assets/nav-logo.png' alt="Logo" @click="goTo('/')"/>
    </div>
    <div class="cmp-nav-right">
      <div :class="{ 'active': isActive('/gen') }" @click="goTo('/gen')">Draw</div>
      <div :class="{ 'active': isActive('/chat') }" @click="goTo('/chat')">Chat</div>
      <div :class="{ 'active': isActive('/jour') }" @click="goTo('/jour')">Gallery</div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const goTo = (path) => {
  console.log('router:', router, path);
  router.push(path);
};

const isActive = (path) => {
  return route.path === path;
};
</script>

<style>
.nav-logo {
  width: 232px;
  height: 44px;
  cursor: pointer;
}
.cmp-nav {
  color: white;
  position: relative;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cmp-nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cmp-nav-right {
  cursor: pointer;
  position: absolute;
  width: 260px;
  right: 0;
  display: flex;
  justify-content: flex-end;
  margin-right: 40px;
}
.cmp-nav-right div {
  flex: 1;
  text-align: center;
  margin: 0 24px;
  transition: opacity 0.3s;
  opacity: 1; /* Default opacity */
  font-size: 18px; /* Adjust the font size here */
}
.cmp-nav-right div:hover,
.cmp-nav-right div.active {
  opacity: 0.5; /* Hover and active opacity */
}
</style>