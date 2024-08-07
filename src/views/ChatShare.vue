<template>
  <div class="chat-page">
	<div class="chat-page-left">
		<img class="chat-dream-pic" :src="imgUrl"/>
		<div class="chat-dream-name">{{ prompt }}</div>
	</div>
	<div class="chat-page-right">
		<div class="chat-page-messages">
			<div v-for="item in msgList">
				<div v-if="item.role == 'assistant'" class="chat-content chat-assistant">
					<img class="chat-icon" src="../assets/chatbot.png"/>
					<div class="chat-msg">
						{{item.content}}
					</div>
				</div>	
				<div v-if="item.role == 'user'" class="chat-content chat-user">
					<div class="chat-msg">
						{{item.content}}
					</div>
				</div>
			</div>
		</div>
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
		height: 27vw;
		border-radius: 50%/50%;
		box-shadow: 0 12px 24px rgba(53, 28, 105, 0.6), 0 16px 32px rgba(53, 28, 105, 0.9);
	}
	.chat-dream-date {
		margin-top: 22px;
		color: white;
		opacity: 60%;
	}
	.chat-dream-name {
		margin-top: 30px;
		padding: 0 5vw;
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
	}
	.chat-page-send {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 132px;
		width: 55vw;
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
		width: 64px;
		height: 64px;
	}
	.chat-msg {
		display: inline-block; /* 消息体宽度根据文本内容变化 */
		max-width: 100%; /* 设置消息框的最大宽度 */
		font-size: 18px;
		flex: 1;
		color: white;
		padding: 20px 28px; /* 上下16px，左右28px */
		border-radius: 48px; /* 圆角边框 */
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), /* 外部阴影 */
            inset 0 0 12px rgba(255, 255, 255, 0.2); /* 内部白色阴影 */
		border: 1.5px solid rgba(255, 255, 255, 0.3); /* 设置白色边框并调整透明度为 30% */
		word-wrap: break-word; /* 使长词在必要时换行 */
		text-shadow: 0px 0px 32px rgba(121, 159, 255, 0.6); /* 添加文字阴影 */
	}
	.chat-user {
		justify-content: flex-end;
	}
</style>