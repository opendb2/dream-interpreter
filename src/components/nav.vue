<template>
	<div class="cmp-nav">
		<div class="cmp-nav-center"><img class="nav-logo" src='../assets/logo.png'/>DreamStory</div>
		<div class="cmp-nav-right">
			<div @click="goTo('/gen')">Create</div>
			<div @click="goTo('/chat')">Chat</div>
			<div @click="goTo('/jour')">My Dreams</div>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router'
	
	const router = useRouter()
	const goTo = (path) => {
		console.log('router:', router, path);
		router.push(path)
	}
</script>

<style>
	.nav-logo {
		width: 48px;
		height: 48px;
	}
	.cmp-nav {
		color: white;
		position: relative;
		/* background-color: #030038; */
		height: 132px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cmp-nav-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cmp-nav-right {
		cursor: pointer;
		position: absolute;
		width: 330px;
		right: 0;
		display: flex;
		justify-content: center;
		div {
			flex: 1;
		}
	}
</style>