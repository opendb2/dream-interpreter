<template>
  <div class="chat-page">
	<div class="chat-page-left">
		<img class="chat-dream-pic" src="../assets/logo.png"/>
		<div class="chat-dream-date">2024-06-30</div>
		<div class="chat-dream-name">a girl with a unicon under the sky</div>
	</div>
	<div class="chat-page-right">
		<div class="chat-page-messages"></div>
		<div class="chat-page-send">
			<input class="chat-send-input" placeholder="Chat with dreamystery"/>
		</div>
	</div>
  </div>
</template>

<script setup>

</script>

<style>
	.chat-page {
		flex: 1;
		display: flex;
	}
	.chat-page-left {
		flex: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.chat-page-right {
		flex: 5;
	}
	.chat-dream-pic {
		width: 22vw;
		height: 26vw;
		border-radius: 50%/50%;
		box-shadow: 0 0 1vh 2vh #351C69;
	}
	.chat-dream-date {
		margin-top: 22px;
		color: white;
		opacity: 60%;
	}
	.chat-dream-name {
		margin-top: 10px;
		padding: 0 6vw;
		color: white;
		word-wrap:break-word;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chat-page-messages {
		width: 55vw;
		height: 60vh;
		border: solid 1px white;
	}
	.chat-page-send {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 132px;
		width: 55vw;
		border: solid 1px white;
		height: 114px;
	}
	.chat-send-input {
		width: 100%;
		height: 60px;
		padding: 0px 30px;
		font-size: 24px;
		line-height: 24px;
		border-radius: 30px;
	}
</style>
