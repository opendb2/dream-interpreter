<template>
  <div class="jour-page">
	<PicGallery/>
	<div class="jour-page-bottom">
		<input class="jour-page-input" placeholder="Chat with dreamystery"/>
	</div>
  </div>
</template>

<script setup>
import PicGallery from '@/components/PicGallery.vue'
</script>

<style>
.jour-page {
	
}
.jour-page-bottom {
	display: flex;
	align-items: center;
	justify-content: center;
}
.jour-page-input {
	width: 45vw;
	height: 9vh;
	padding: 0px 30px;
	font-size: 24px;
	line-height: 24px;
	border-radius: 30px;
}
</style>
