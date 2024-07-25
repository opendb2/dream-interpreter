<template>
  <div class="chat-page">
	<div class="chat-page-left">
		<img class="chat-dream-pic" :src="imgUrl"/>
		<div class="chat-dream-date">
			{{ new Date().getFullYear() }} {{"-"}} {{ new Date().getMonth()+1 }} {{"-"}} {{ new Date().getDate() }}
		</div>
		<div class="chat-dream-name">{{ promote }}</div>
		<div>
			<el-button
			    type="primary"
			    class="" 
					  @click="save"
			  >
			    save
			</el-button>
			<el-button
			    type="primary"
			    class="" 
					  @click="share"
			  >
			    share
			</el-button>
		</div>
	</div>
	<div class="chat-page-right">
		<div class="chat-page-messages">
			<div v-for="item in msgList">
				<div v-if="item.role == 'assistant'" class="chat-content chat-assistant">
					<img class="chat-icon" src="../assets/home-illustration 1.png"/>
					<div class="chat-msg">
						{{item.content}}
					</div>
				</div>	
				<div v-if="item.role == 'user'" class="chat-content chat-user">
					<div class="chat-msg">
						{{item.content}}
					</div>
					<img class="chat-icon" src="../assets/home-illustration 2.png"/>
				</div>
			</div>
		</div>
		<div class="chat-page-send">
			<input class="chat-send-input" v-model="chatContent" placeholder="Chat with dreamystery"/>
			<el-button
			    type="primary"
			    class="send-btn" 
					  @click="send"
			  >
			    Send
			</el-button>
		</div>
	</div>
	 <el-dialog
	    v-model="shareDialog.show"
	    title="Tips"
	    width="500"
	    :before-close="handleClose"
	  >
		<div>u can send following address to ur friends:</div>
	    <span>{{shareDialog.shareUrl}}</span>
	  </el-dialog>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter  } from 'vue-router';
import { genStore } from '@/stores/genStore';
import { ElLoading, ElNotification } from 'element-plus';
import { initMsgs, wrapperCustomMsg, wrapperAssistantMsg, appendMsg } from '@/utils/msg';

let router = useRouter();
let { imgUrl, promote } = genStore();
let msgList = reactive([]);
let chatContent = reactive('');
let dreamId = reactive(-1);
let shareDialog = reactive({show: false, shareUrl: ''})
initMsgs.map(item => msgList.push(item));
console.log('msgList:', msgList);
console.log(router.getRoutes());
const send = () => {
	msgList.push(appendMsg(wrapperCustomMsg(chatContent)));
	console.log('send:msgList:', msgList);
	chatContent = "";
	const loading = ElLoading.service({
		lock: true,
		text: 'Loading',
		background: 'rgba(0, 0, 0, 0.7)',
	  });
	fetch("/api/gen-gpt-chat", {
	  method: "POST", // or 'PUT'
	  headers: {
	    "Content-Type": "application/json",
	  },
	  body: JSON.stringify({messages: msgList}),
	}).then((response) => response.json())
	  .then((data) => {
		loading.close();
	    console.log("Success:", data);
		let { suggest } = data.data;
		msgList.push(appendMsg(wrapperAssistantMsg(suggest)));
	  })
	  .catch((error) => {
		loading.close();
	    console.error("Error:", error);
	  });
}
const share = () => {
	if(dreamId < 0) {
		ElNotification({
		    title: 'Warning',
		    message: 'pls save dream before u share',
		    type: 'warning',
		})
		return;
	}
	const loading = ElLoading.service({
		lock: true,
		text: 'Loading',
		background: 'rgba(0, 0, 0, 0.7)',
	  });
	fetch("/api/share", {
	  method: "POST", // or 'PUT'
	  headers: {
	    "Content-Type": "application/json",
	  },
	  body: JSON.stringify({dream_id: dreamId, prompt: promote, img: imgUrl, messages: msgList, suggest: ''}),
	}).then((response) => response.json())
	  .then((data) => {
		loading.close();
	    console.log("Success:", data);
		let { id } = data.data;
		shareDialog.shareUrl = `${location.host}/share/${id}`;
		shareDialog.show = true;
	  })
	  .catch((error) => {
	    console.error("Error:", error);
	  });
}
const save = () => {
	const loading = ElLoading.service({
		lock: true,
		text: 'Loading',
		background: 'rgba(0, 0, 0, 0.7)',
	  });
	fetch("/api/dream-update", {
	  method: "POST", // or 'PUT'
	  headers: {
	    "Content-Type": "application/json",
	  },
	  body: JSON.stringify({prompt: promote, img: imgUrl, messages: msgList, suggest: ''}),
	}).then((response) => response.json())
	  .then((data) => {
		loading.close();
	    console.log("Success:", data);
		let { id } = data.data;
		dreamId = id;
		ElNotification({
		    title: 'Success',
		    message: 'Dream save success',
		    type: 'success',
		})
	  })
	  .catch((error) => {
		loading.close();
	    console.error("Error:", error);
	  });
}
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
