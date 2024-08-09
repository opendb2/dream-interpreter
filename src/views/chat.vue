<template>
  <div class="chat-page">
    <div class="chat-page-left">
      <img v-if="imgUrl" class="chat-dream-pic" :src="imgUrl"/>
      <div v-if="imgUrl" class="chat-dream-date">
        {{ new Date().getFullYear() }} - {{ new Date().getMonth() + 1 }} - {{ new Date().getDate() }}
      </div>
      <div class="chat-dream-name">{{ promote }}</div>
      <div v-if="imgUrl" class="button-container">
        <img src="../assets/save-button.png" class="custom-button" @click="save" />
        <img src="../assets/share-button.png" class="custom-button" @click="share" />
      </div>
    </div>
    <div class="chat-page-right">
      <div class="chat-page-messages">
        <div v-for="item in msgList" :key="item.id">
          <div v-if="item.role == 'assistant'" class="chat-content chat-assistant">
            <img class="chat-icon" src="../assets/chatbot.png" />
            <div class="chat-msg">{{ item.content }}</div>
			<div class="chat-icon"></div>
          </div>
          <div v-if="item.role == 'user'" class="chat-content chat-user">
			<div class="chat-icon"></div>  
            <div class="chat-msg">{{ item.content }}</div>
			<img class="chat-icon" src="../assets/user.png" />
          </div>
        </div>
      </div>
      <div class="chat-page-send">
        <input 
          class="chat-send-input" 
          v-model="chatContent" 
          placeholder="Chat with dreamystery" 
          @keyup.enter="send"
        />
        <img
          class="send-icon"
          :class="{ 'send-icon-disabled': !chatContent }"
          @click="send"
          src="../assets/send-icon.png"
        />
      </div>
      <div class="powered-by">
        Powered by ChatGPT. It can make mistakes.
      </div>
    </div>
    <el-dialog v-model="shareDialog.show" title="Tips" width="500" :before-close="handleClose">
      <div>u can send following address to ur friends:</div>
      <span>{{ shareDialog.shareUrl }}</span>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { genStore } from '@/stores/genStore';
import { ElLoading, ElNotification } from 'element-plus';
import { initMsgs, wrapperCustomMsg, wrapperAssistantMsg } from '@/utils/msg';

let router = useRouter();
let { imgUrl, promote } = genStore();
let msgList = reactive([]);
let chatContent = reactive('');
let dreamId = reactive(-1);
let shareDialog = reactive({ show: false, shareUrl: '' });

initMsgs.map((item) => msgList.push(item));

// 添加默认聊天内容 prompt
const defaultGreeting = `👋 Hi, I’m your dream assistant. Experience the magic of Dreamystery right now! Feel free to ask me anything about your dream "${promote}"`;
msgList.push(wrapperAssistantMsg(defaultGreeting));

console.log('msgList:', msgList);
console.log(router.getRoutes());

const send = () => {
  if (!chatContent) return; // 防止发送空消息
  msgList.push(wrapperCustomMsg(chatContent));
  console.log('send:msgList:', msgList);
  chatContent = '';
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  fetch('/api/gen-gpt-chat', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages: msgList }),
  })
    .then((response) => response.json())
    .then((data) => {
      loading.close();
      console.log('Success:', data);
      let { suggest } = data.data;
      msgList.push(wrapperAssistantMsg(suggest));
    })
    .catch((error) => {
      loading.close();
      console.error('Error:', error);
    });
};

const share = () => {
  if (dreamId < 0) {
    ElNotification({
      title: 'Warning',
      message: 'Please save the dream before you share',
      type: 'warning',
    });
    return;
  }
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  fetch('/api/share', {
    method: 'POST', // or 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dream_id: dreamId, prompt: promote, img: imgUrl, messages: msgList, suggest: '' }),
  })
    .then((response) => response.json())
    .then((data) => {
      loading.close();
      console.log('Success:', data);
      let { id } = data.data;
      shareDialog.shareUrl = `${location.host}/share/${id}`;
      shareDialog.show = true;
    })
    .catch((error) => {
      loading.close();
      console.error('Error:', error);
    });
};

const save = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  fetch('/api/dream-update', {
    method: 'POST', // or 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: promote, img: imgUrl, messages: msgList, suggest: '' }),
  })
    .then((response) => response.json())
    .then((data) => {
      loading.close();
      console.log('Success:', data);
      let { id } = data.data;
      dreamId = id;
      ElNotification({
        title: 'Success',
        message: 'Dream saved successfully',
        type: 'success',
      });
    })
    .catch((error) => {
      loading.close();
      console.error('Error:', error);
    });
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 确保占满整个视口 */
}
.cmp-nav {
  height: 118px; /* 调整导航栏高度 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-page {
  display: flex;
  height: 88vh; /* 设置固定高度 */
}
.chat-page.centered {
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
}
.chat-page-left {
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px; /* 增加内边距 */
  border-radius: 20px; /* 增加圆角边框 */
}
.chat-dream-pic {
  width: 22vw;
  height: 32vw;
  border-radius: 50%;
  box-shadow: 0 16px 24px rgba(53, 28, 105, 0.6), 0 16px 32px rgba(53, 28, 105, 0.9);
}
.button-container {
  margin-top: 24px; /* 增加按钮顶部间距 */
  display: flex;
  gap: 14px; /* 增加按钮之间的间距 */
}
.custom-button {
  width: 104px; /* 设置按钮图片宽度 */
  height: 48px; /* 设置按钮图片高度 */
  cursor: pointer; /* 添加鼠标指针效果 */
}
.custom-button:hover {
  transform: scale(1.05); /* 放大按钮 */
  transition: transform 0.3s ease, opacity 0.3s ease; /* 添加平滑过渡效果 */
  opacity: 0.6; /* 设置透明度 */
}
.chat-dream-date {
  margin-top: 22px;
  color: #A29FA8; /* 更改日期颜色 */
  font-size: 16px; /* 更改日期字体大小 */
  font-weight: normal; /* 更改日期字体粗细 */
  opacity: 80%;
}
.chat-dream-name {
  margin-top: 10px;
  padding: 0 2vw;
  color: #FFFFFF; /* 更改名称颜色 */
  font-size: 24px; /* 更改名称字体大小 */
  font-weight: bold; /* 更改名称字体粗细 */
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center; /* 更改名称对齐方式 */
}
.chat-page-right {
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px; /* 仅设置上方 padding */
  padding-bottom: 48px; /* 仅设置下方 padding */
  padding-left: 20px; /* 增加左边距 */
  padding-right: 80px; /* 增加右边距 */
}
.chat-page-right-full {
  flex: 1; /* 占据整个宽度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 10px; /* 仅设置上方 padding */
  padding-bottom: 60px; /* 仅设置下方 padding */
  padding-left: 20px; /* 增加左边距 */
  padding-right: 80px; /* 增加右边距 */
}
.chat-page-right-full .chat-page-messages {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.chat-page-right-full .chat-page-send {
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat-page-messages,
.chat-page-send {
  width: 100%; /* 设置宽度为父容器的100% */
  border-radius: 20px; /* 圆角边框 */
  padding: 20px; /* 内部填充 */
}
.chat-page-send {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 使输入框和按钮之间的间距保持一致 */
  position: relative; /* 使子元素绝对定位 */
}
.chat-send-input {
  flex: 1; /* 使输入框填满剩余空间 */
  height: 120px;
  padding: 0 12px; /* 调整左右填充 */
  font-size: 24px;
  line-height: 32px;
  border-radius: 30px;
  border: none; /* 移除边框 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); /* 添加阴影 */
  padding-right: 50px; /* 为发送图标留出空间 */
}
.send-icon {
  position: absolute;
  right: 24px; /* 调整图标位置 */
  cursor: pointer;
  transition: opacity 0.3s ease;
  height: 50px; /* 设置图标高度 */
  width: 50px; /* 设置图标宽度 */
  opacity: 1; /* 默认透明度 */
}
.send-icon-disabled {
  opacity: 1; /* 未输入内容时的透明度 */
}
.send-icon:not(.send-icon-disabled) {
  opacity: 1; /* 有输入内容时透明度改为 100% */
}
.chat-content {
  display: flex;
  align-items: center;
  margin-bottom: 24px; /* 每条消息之间的间距 */
}
.chat-content.chat-user {
  justify-content: flex-end; /* 用户消息靠右对齐 */
}
.chat-content.chat-assistant {
  justify-content: flex-start; /* 助手消息靠左对齐 */
}
.chat-icon {
  width: 36px;
  height: 36px;
  margin: 0 16px; /* 头像与消息内容之间的间距 */
}
.chat-msg {
  display: inline-block; /* 消息体宽度根据文本内容变化 */
  max-width: 100%; /* 设置消息框的最大宽度 */
  font-size: 18px;
  flex: 1;
  flex-grow: 1;
  color: white;
  padding: 20px 28px; /* 上下16px，左右28px */
  border-radius: 48px; /* 圆角边框 */
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.6); /* 外部和内部阴影 */
  border: 1.5px solid rgba(255, 255, 255, 0.3); /* 设置白色边框并调整透明度为 30% */
  word-wrap: break-word; /* 使长词在必要时换行 */
  text-shadow: 0px 0px 32px rgba(121, 159, 255, 0.6); /* 添加文字阴影 */
}
.powered-by {
  text-align: center;
  color: #88868E;
  font-size: 14px;
  margin-top: 0px;
}
</style>