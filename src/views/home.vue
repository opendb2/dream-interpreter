<template>
  <div class="home">
	<img class="home-illustration" src="../assets/home-illustration.png"/>
	<div class="home-slogan">I dream of painting</div>
	<div class="home-slogan">and then I paint my dream</div>
	<div class="home-slogan-sub">-Vincent Van Gogh</div>
	<div class="home-btn">Bring my dream to life</div>
  </div>
</template>

<script setup>

</script>

<style>
	.home {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
	}
	.home-illustration {
		margin-top: 5vh;
		width: 35vh;
		height: 35vh;
		border-radius: 50%;
	}
	.home-slogan {
		font-size: 5vh;
		background-image: linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.3));
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.home-slogan-sub {
		margin-top: 28px;
		color: white;
		font-size: 2vh;
		opacity: 0.6;
	}
	.home-btn {
		margin-top: 28px;
		color: white;
		width: 23vw;
		height: 10vh;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2.5vh;
		border-radius: 5vh 50%;
		border: solid 1px white;
	}
</style>
