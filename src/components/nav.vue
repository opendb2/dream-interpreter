<template>
	<div class="cmp-nav">
		<div class="cmp-nav-center">
		    <img class="nav-logo" src='../assets/nav-logo.png' alt="Logo" @click="goTo('/')"/>
	</div>
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
		width: 232px;
		height: 44px;
		cursor: pointer;
	}
	.cmp-nav {
		color: white;
		position: relative;
		/* background-color: #030038; */
		height: 126px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cmp-nav-center {
		flex: 1;
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
			text-align: center;
		}
	}
</style>