<template>
  <div class="page-gen">
    <div class="gen-text-wrapper">
      <input 
        v-model="promote" 
        class="gen-text" 
        type="text" 
        placeholder="What was your last dream about?" 
        autofocus 
        @keypress="handleKeyPress"
      />
      <img
        :src="buttonImage"
        class="gen-btn"
        @click="go"
        :class="{ 'disabled-btn': !promote }"
        :alt="promote ? 'Go' : 'Button Disabled'"
      />
    </div>
  </div>
  <div class='illustraion-1'></div>
  <div class='illustraion-2'></div>
  <div class='illustraion-3'></div>
  <div class='illustraion-4'></div>
  <div class='illustraion-5'></div>
  <div class='illustraion-6'></div>
  <div class='illustraion-7'></div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification, ElLoading } from 'element-plus';
import { genStore } from '@/stores/genStore';

// 引入图片
import goBtnEnabled from '../assets/go-btn-enabled.png';
import goBtnDisabled from '../assets/go-btn-disabled.png';

const router = useRouter();
let gen = genStore();
const promote = ref('');

const buttonImage = computed(() => {
  return promote.value ? goBtnEnabled : goBtnDisabled;
});

const go = () => {
  console.log('promote:', promote.value);
  if (!promote.value) {
    ElNotification({
      title: 'Warning',
      message: 'Input is empty',
      type: 'warning',
    });
    return;
  }
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  fetch('/api/gen-img', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ promote: promote.value }),
  })
    .then((response) => response.json())
    .then((data) => {
      loading.close();
      console.log('Success:', data);
      let { imgUrl } = data.data;
      gen.setImgUrl(imgUrl);
      gen.setPromote(promote.value);
      router.push('./chat');
    })
    .catch((error) => {
      loading.close();
      console.error('Error:', error);
    });
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // 防止默认的 Enter 键行为（如换行）
    go(); // 调用 go 方法
  }
};
</script>

<style>
.page-gen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.gen-text-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.gen-text {
  width: 60vw;
  height: 10vh;
  font-size: 3vh;
  line-height: 3vh;
  border-radius: 5vh;
  padding: 5vh;
  color: #04003A;         
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}

.gen-text::placeholder {
  color: #6B6986; /* 设置 placeholder 文字颜色 */
  font-weight: 400; /* 设置 placeholder 文字粗细 */
  font-family: 'Inter', sans-serif; /* 确保字体支持粗细设置 */
}

.gen-btn {
  width: 88px;
  height: 88px;
  margin-left: -96px; /* 与输入框有间距 */
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.gen-btn.disabled-btn {
  opacity: 1;
  cursor: not-allowed;
}

.illustraion-1,
.illustraion-2,
.illustraion-3,
.illustraion-4,
.illustraion-5,
.illustraion-6,
.illustraion-7 {
  position: absolute;
  animation: swayAndFade 4s ease-in-out infinite;
}

@keyframes swayAndFade {
  0% {
    transform: rotate(-3deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(3deg) scale(0.92);
    opacity: 0.6;
  }
  100% {
    transform: rotate(-3deg) scale(1);
    opacity: 1;
  }
}

/* 各插画的位置和背景样式 */
.illustraion-1 {
  top: 13vh;
  left: 16vw;
  width: 11vw;
  height: 11vw;
  background-image: url('../assets/illustraion-1.png');
  background-size: cover;
}
.illustraion-2 {
  top: 20vh;
  left: 44vw;
  width: 12vw;
  height: 12vw;
  background-image: url('../assets/illustraion-2.png');
  background-size: cover;
}
.illustraion-3 {
  top: 22vh;
  left: 75vw;
  width: 11vw;
  height: 11vw;
  background-image: url('../assets/illustraion-3.png');
  background-size: cover;
}
.illustraion-4 {
  top: 45vh;
  left: 3vw;
  width: 12vw;
  height: 12vw;
  background-image: url('../assets/illustraion-4.png');
  background-size: cover;
  transform: rotate(-7deg);
}
.illustraion-5 {
  top: 72vh;
  left: 24vw;
  width: 12vw;
  height: 12vw;
  background-image: url('../assets/illustraion-5.png');
  background-size: cover;
}
.illustraion-6 {
  top: 76vh;
  left: 57vw;
  width: 12vw;
  height: 12vw;
  background-image: url('../assets/illustraion-6.png');
  background-size: cover;
}
.illustraion-7 {
  top: 60vh;
  left: 83vw;
  width: 12vw;
  height: 12vw;
  background-image: url('../assets/illustraion-7.png');
  background-size: cover;
}
</style>