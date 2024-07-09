<script setup>
	import { reactive } from 'vue'
	const imgList = ['https://pic.52112.com/180128/Unicorns/Afb0IIfm0u.jpg','https://pic.52112.com/180128/Unicorns/Afb0IIfm0u.jpg','https://pic.52112.com/180128/Unicorns/Afb0IIfm0u.jpg','https://pic.52112.com/180128/Unicorns/Afb0IIfm0u.jpg','https://pic.52112.com/180128/Unicorns/Afb0IIfm0u.jpg']
	let curList = reactive([])
	const cur = 0
	curList = [].concat(imgList);
	console.log('curList:', curList);
</script>

<template>
	<div class="cmp-pic-gallery">
		<div class="pic-gallery-list">
			<div class="pic-gallery-forward"></div>
			<img :class="['gallery-pic', 'pic-'+index]" v-for="(src, index) in curList" :src="src" v-show="!!src" />
			<div class="pic-gallery-backward"></div>
		</div>
	</div>
</template>

<style>
	.cmp-pic-gallery {
		height: 100%;
	}
	.pic-gallery-list {
		display: flex;
		justify-content: center;
		position: relative;
	}
	.gallery-pic {
		height: 50vh;
		width: 30vh;
		margin: 20px;
		border-radius: 3vh;
		box-shadow: 0 0 1vh 1vh #351C69;
	}
	.pic-0 {
		scale: 60%;
		opacity: 80%;
	}
	.pic-4 {
		scale: 60%;
		opacity: 80%;
	}
	.pic-1 {
		scale: 80%;
		opacity: 90%;
	}
	.pic-3 {
		scale: 80%;
		opacity: 90%;
	}
	.pic-gallery-forward {
		position: absolute;
		left: 8%;
		top: 48%;
		width: 50px;
		height: 50px;
		border-radius: 30px;
		background-color: white;
	}
	.pic-gallery-backward {
		position: absolute;
		right: 8%;
		top: 48%;
		width: 50px;
		height: 50px;
		border-radius: 30px;
		background-color: white;
	}
</style>