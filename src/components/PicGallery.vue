<script setup>
	import { ref, reactive, computed } from 'vue';
	import { defaultPic } from '@/utils/pic';
	import { ElNotification } from 'element-plus';
	import { useRouter } from 'vue-router';
	
	const defaultImgList = [defaultPic, defaultPic, defaultPic, defaultPic, defaultPic];
	const resList = reactive([]);
	const cur = ref(0);
	const router = useRouter();
	
	var showList = computed(() => {
		if(cur.value == 0) {
			return [{}, {}].concat(resList.slice(0, 3));
		}
		if(cur.value == 1) {
			return [{}].concat(resList.slice(0, 4));
		}
		console.log(resList);
		let curList = [].concat(resList.slice(cur.value-2, cur.value+3));
		// 不足 5 张图片，用空白补全
		if(curList.length < 5) {
			for(let i = curList.length; i<5; i++) {
				curList.push({});
			}
		}
		return curList;
	});
	
	const curId = () => {
		return resList[cur.value].id;
	}
	
	const backward = () => {
		if(cur.value == 0) {
			ElNotification({
			    title: '',
			    message: 'It is the first dream!',
			    type: 'success',
			})
			return 
		}
		cur.value -= 1;
	}
	
	const forward = () => {
		if(cur.value >= resList.length - 1) {
			ElNotification({
			    title: '',
			    message: 'It is the last dream!',
			    type: 'success',
			})
			return 
		}
		cur.value += 1;
	}
	
	fetch('/api/share-list', {
	  method: 'GET',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	})
	  .then((response) => response.json())
	  .then((data) => {
		data.data.list.map(item => resList.push(item));
	  })
	  .catch((error) => {
	    console.error('Error:', error);
	  });
</script>

<template>
	<div class="cmp-pic-gallery">
		<div class="pic-gallery-list">
			<div class="pic-gallery-forward" @click="backward"></div>
			<div v-for="(item, index) in showList" :class="['gallery-pic-wrapper', 'pic-'+index]">
				<img @click="() => {$emit('pic-selected'); router.push(`./share/${curId()}`)}" :class="['gallery-pic', 'pic-'+index]"  :src="item.img" v-show="!!item.img" />
			</div>
			<div class="pic-gallery-backward" @click="forward"></div>
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
	.gallery-pic-wrapper {
		height: 50vh;
		width: 30vh;
		margin: 20px;
		box-shadow: none;
	}
	.gallery-pic {
		height: 50vh;
		width: 30vh;
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