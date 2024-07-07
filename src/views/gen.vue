<template>
  <div class="page-gen">
	  <input class="gen-text" type="text" placeholder="what was your last dream?"/>
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
console.log('gen');
</script>

<style>
.page-gen {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}
.gen-text {
	width: 60vw;
	height: 10vh;
	font-size: 3vh;
	line-height: 3vh;
	border-radius: 5vh;
	padding: 5vh;
}
.illustraion-1 {
	position: absolute;
	top: 20vh;
	left: 13vw;
	width: 7vw;
	height: 7vw;
	background-image: url('../assets/logo.png');
	background-size: cover;
}
.illustraion-2 {
	position: absolute;
	top: 25vh;
	left: 44vw;
	width: 7vw;
	height: 7vw;
	background-image: url('../assets/logo.png');
	background-size: cover;
}
.illustraion-3 {
	position: absolute;
	top: 22vh;
	left: 75vw;
	width: 10vw;
	height: 10vw;
	background-image: url('../assets/logo.png');
	background-size: cover;
}
.illustraion-4 {
	position: absolute;
	top: 55vh;
	left: 6vw;
	width: 6vw;
	height: 6vw;
	background-image: url('../assets/logo.png');
	background-size: cover;
	transform: rotate(-7deg);
}
.illustraion-5 {
	position: absolute;
	top: 80vh;
	left: 15vw;
	width: 7vw;
	height: 7vw;
	background-image: url('../assets/logo.png');
	background-size: cover;
}
.illustraion-6 {
	position: absolute;
	top: 78vh;
	left: 52vw;
	width: 7vw;
	height: 7vw;
	background-image: url('../assets/logo.png');
	background-size: cover;
}
.illustraion-7 {
	position: absolute;
	top: 62vh;
	left: 85vw;
	width: 10vw;
	height: 10vw;
	background-image: url('../assets/logo.png');
	background-size: cover;
}
</style>
