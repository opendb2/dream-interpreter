<template>
  <div class="page-gen">
    <div class="gen-text-wrapper">
	  <input v-model="promote" class="gen-text" type="text" placeholder="what was your last dream?"/>
	  <el-button
	      type="primary"
	      class="gen-btn" 
		  @click="go"
	    >
	      Go
	  </el-button>
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

<script setup>a
import { reactive } from "vue" 
import { useRouter } from 'vue-router'
import { ElNotification, ElLoading } from 'element-plus'
import { genStore } from '@/stores/genStore'

const router = useRouter();
let gen = genStore();
let promote = reactive('');

const go = () => {
	console.log('promote:', promote);
	if(!promote) {
		ElNotification({
		    title: 'Warning',
		    message: 'input is empty',
		    type: 'warning',
		  })
		return;
	}
	const loading = ElLoading.service({
	    lock: true,
	    text: 'Loading',
	    background: 'rgba(0, 0, 0, 0.7)',
	  })
    fetch("/api/gen-img", {
	// fetch("/api/test-img", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({promote}),
    }).then((response) => response.json())
      .then((data) => {
		loading.close();
        console.log("Success:", data);
		let { imgUrl } = data.data;
		gen.setImgUrl(imgUrl);
		gen.setPromote(promote);
		router.push('./chat')
      })
      .catch((error) => {
		loading.close();
        console.error("Error:", error);
      });
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
.gen-text-wrapper {
  position: relative;
}
.gen-btn {
    position: absolute;
	border-radius: 16px;
	border: solid 0px;
    width: 32px;
    height: 32px;
    margin-top: 2.5vh;
    right: 10px;
    cursor: pointer;
    transition: transform 0.3s ease, opacity 0.3s ease;
}
</style>
