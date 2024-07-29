<template>
  <div class="chat-page">
	<div class="chat-page-left">
		<img class="chat-dream-pic" :src="imgUrl"/>
		<div class="chat-dream-name">{{ prompt }}</div>
	</div>
	<div class="chat-page-right">
		<div class="chat-page-messages">
			<div v-for="item in msgList">
				<div v-if="item.Role == 'assistant'" class="chat-content chat-assistant">
					<img class="chat-icon" src="../assets/home-illustration 1.png"/>
					<div class="chat-msg">
						{{item.Content}}
					</div>
				</div>	
				<div v-if="item.Role == 'user'" class="chat-content chat-user">
					<div class="chat-msg">
						{{item.Content}}
					</div>
					<img class="chat-icon" src="../assets/home-illustration 2.png"/>
				</div>
			</div>
		</div>>
	</div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { genStore } from '@/stores/genStore';
import { useRoute  } from 'vue-router';
import { ElLoading, messageConfig } from 'element-plus';
import { initMsgs, wrapperCustomMsg, appendMsg } from '@/utils/msg';

let route = useRoute();
let id = '';
console.log(route.params.id);
let imgUrl = ref('');
let prompt = ref('');
let msgList = reactive([]);
initMsgs.map(item => msgList.push(item));
console.log('msgList:', msgList);

const getShare = () => {
	fetch('/api/share-get', {
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ id }),
	})
	  .then((response) => response.json())
	  .then((data) => {
	    console.log('Success:', data);
	    let { img, messages} = data.data;
		imgUrl.value = img;
		if(messages.length > 0) {
			msgList = JSON.parse(messages);
		}
		prompt.value = data.data.prompt;
		console.log('prompt:', prompt);
	  })
	  .catch((error) => {
	    console.error('Error:', error);
	  });
}

onMounted(() => {
	id = route.params.id;
	if(!id) {
		return
	}
	getShare();
})
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
		margin-top: 30px;
		padding: 0 6vw;
		color: white;
		word-wrap:break-word;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.chat-page-messages {
		width: 55vw;
		height: 80vh;
		overflow-y: auto;
		border: solid 1px white;
	}
	.chat-page-send {
		position: relative;
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
	.send-btn {
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
	.chat-content {
		display: flex;
		align-items: center;
	}
	.chat-icon {
		width: 36px;
		height: 36px;
	}
	.chat-msg {
		font-size: 18px;
		flex: 1;
		color: white;
	}
</style>
