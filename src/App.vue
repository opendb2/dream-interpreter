<template>
  <div id="app" @click="handlePageClick">
    <NavBar></NavBar>
    <router-view/>
    <!-- 音效按钮 -->
    <div class="sound-button" @click.stop="toggleSound">
      <img :src="isSoundOn ? soundOnIcon : soundOffIcon" alt="Sound Button"/>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/nav.vue';
import soundOnIcon from '@/assets/sound-on-icon.png';
import soundOffIcon from '@/assets/sound-off-icon.png';
import soundFile from '@/assets/sound-file.mp3';

// 控制音效的状态
const isSoundOn = ref(false);
const hasUserInteracted = ref(false);

// 音效文件
const audio = new Audio(soundFile);

// 页面点击事件处理函数
const handlePageClick = () => {
  if (!hasUserInteracted.value) {
    hasUserInteracted.value = true;
    audio.play();
    isSoundOn.value = true;
    audio.loop = true; // 设置音频循环
  }
};

// 切换音效开关
const toggleSound = () => {
  if (isSoundOn.value) {
    audio.pause();
  } else {
    audio.play();
  }
  isSoundOn.value = !isSoundOn.value;
};
</script>

<style>
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.el-loading-mask .el-loading-spinner {
	--el-color-primary: white;
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
/* 音效按钮样式 */
.sound-button {
  position: fixed;
  bottom: 48px; /* 底部边距 */
  right: 64px;  /* 右边距 */
  width: 32px;  /* 按钮宽度 */
  height: 32px; /* 按钮高度 */
  cursor: pointer;
  z-index: 1000; /* 确保按钮在其他元素之上 */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.sound-button:hover {
  opacity: 0.7;
  transform: scale(1.1);
}

.sound-button img {
  width: 100%;
  height: 100%;
}
</style>
