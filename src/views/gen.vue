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
	top: 13vh;
	left: 16vw;
	width: 11vw;
	height: 11vw;
	background-image: url('../assets/illustraion-1.png');
	background-size: cover;
}
.illustraion-2 {
	position: absolute;
	top: 20vh;
	left: 44vw;
	width: 12vw;
	height: 12vw;
	background-image: url('../assets/illustraion-2.png');
	background-size: cover;
}
.illustraion-3 {
	position: absolute;
	top: 22vh;
	left: 75vw;
	width: 12vw;
	height: 12vw;
	background-image: url('../assets/illustraion-3.png');
	background-size: cover;
}
.illustraion-4 {
	position: absolute;
	top: 45vh;
	left: 2vw;
	width: 12vw;
	height: 12vw;
	background-image: url('../assets/illustraion-4.png');
	background-size: cover;
	transform: rotate(-7deg);
}
.illustraion-5 {
	position: absolute;
	top: 72vh;
	left: 24vw;
	width: 12vw;
	height: 12vw;
	background-image: url('../assets/illustraion-5.png');
	background-size: cover;
}
.illustraion-6 {
	position: absolute;
	top: 76vh;
	left: 57vw;
	width: 12vw;
	height: 12vw;
	background-image: url('../assets/illustraion-6.png');
	background-size: cover;
}
.illustraion-7 {
	position: absolute;
	top: 60vh;
	left: 83vw;
	width: 12vw;
	height: 12vw;
	background-image: url('../assets/illustraion-7.png');
	background-size: cover;
}
</style>
