<template>
  <div class="home">
    <img :src="currentImage" class="home-illustration" />
    <div class="home-slogan">{{ currentSlogan }}</div>
    <div class="home-slogan2">{{ currentSlogan2 }}</div>
    <div class="home-slogan-sub">{{ currentSloganSub }}</div>
    <img class="home-btn" src="../assets/home-btn.png" alt="Bring my dream to life" @click="handleButtonClick"/>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import homeIllustration1 from '../assets/home-illustration.png';
import homeIllustration2 from '../assets/home-illustration 2.png';

const slogans = [
  { slogan: 'I dream of painting', slogan2: 'and then I paint my dream', sub: '-Vincent Van Gogh' },
  { slogan: 'Everything we can dream', slogan2: 'can be real', sub: '-Pablo Picasso' }
];

const images = [homeIllustration1, homeIllustration2];

const currentImage = ref(images[0]);
const currentSlogan = ref(slogans[0].slogan);
const currentSlogan2 = ref(slogans[0].slogan2);
const currentSloganSub = ref(slogans[0].sub);

let currentIndex = 0;

const rotateImages = () => {
  currentIndex = (currentIndex + 1) % images.length;
  currentImage.value = images[currentIndex];
  currentSlogan.value = slogans[currentIndex].slogan;
  currentSlogan2.value = slogans[currentIndex].slogan2;
  currentSloganSub.value = slogans[currentIndex].sub;
};

onMounted(() => {
  setInterval(rotateImages, 5000); // 5秒切换一次
});

const router = useRouter();

const handleButtonClick = () => {
  router.push('/gen');
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');

.home {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin-top: -2vh;
}

.home-illustration {
  margin-top: 2.8vh;
  width: 50vh;
  height: 50vh;
  opacity: 0; /* 初始状态设置为透明 */
  animation: fadeInImage 3s ease-in-out forwards; /* 渐现动画 */
}

.home-slogan,
.home-slogan2,
.home-slogan-sub {
  opacity: 0; /* 初始状态设置为透明 */
  animation: fadeInText 2.8s ease-in-out forwards; /* 渐现动画 */
}

.home-slogan {
  font-size: 5vh;
  background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.3));
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Cormorant Upright', serif;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.home-slogan2 {
  font-size: 5vh;
  background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.3));
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Cormorant Upright', serif;
  font-weight: 400;
}

.home-slogan-sub {
  font-size: 2vh;
  color: #ACA7B9;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  margin-top: 1rem;
}

@keyframes fadeInImage {
  to {
    opacity: 1; /* 最终状态设置为完全不透明 */
  }
}

@keyframes fadeInText {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1; /* 最终状态设置为接近完全不透明 */
  }
}

.home-btn {
  margin-top: 48px;
  width: 18vw;
  height: auto;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.home-btn:hover {
  opacity: 0.6;
  transform: scale(1.03);
}
</style>