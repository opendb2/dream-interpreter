<template>
  <div class="home">
	<img class="home-illustration" src="../assets/home-illustration.png"/>
	<div class="home-slogan">I dream of painting</div>
	<div class="home-slogan">and then I paint my dream</div>
	<div class="home-slogan-sub">-Vincent Van Gogh</div>
	<img class="home-btn" src="../assets/home-btn.png" alt="Bring my dream to life" @click="handleButtonClick"/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

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
	}
	.home-slogan {
		font-size: 5vh;
		background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.3));
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-family: 'Cormorant Upright', serif;
		font-weight: 500;
	}
	.home-slogan-sub {
		margin-top: 16px;
		color: white;
		font-size: 2vh;
		opacity: 0.6;
		font-family: 'Inter', sans-serif;
		font-weight: 300;
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
