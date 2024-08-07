<template>
  <div class="jour-page">
	<PicGallery/>
	<!-- <div class="jour-page-bottom">
		<input class="jour-page-input" placeholder="Chat with dreamystery"/>
	</div> -->
  </div>
</template>

<script setup>
import PicGallery from '@/components/PicGallery.vue'
</script>

<style>
.jour-page {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90vh; /* 确保父容器占满整个视口高度 */
	margin-top: -5vh; /* Adjust this value to move the content upwards */
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