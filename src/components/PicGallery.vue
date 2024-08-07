<template>
  <div class="cmp-pic-gallery">
    <div class="pic-gallery-list">
      <div v-if="!loading" class="pic-gallery-backward" @click="backward"></div>
      <div v-for="(item, index) in showList" :class="['gallery-pic-wrapper', 'pic-'+index]" :key="index">
        <img @click="() => {$emit('pic-selected'); router.push(`./share/${curId()}`)}" :class="['gallery-pic', 'pic-'+index]" :src="item.img" v-show="!!item.img" />
      </div>
      <div v-if="!loading" class="pic-gallery-forward" @click="forward"></div>
      <el-loading v-if="loading" lock text="Loading" background="rgba(0, 0, 0, 0.7)"></el-loading>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { defaultPic } from '@/utils/pic';
import { ElNotification, ElLoading } from 'element-plus';
import { useRouter } from 'vue-router';

const defaultImgList = [defaultPic, defaultPic, defaultPic, defaultPic, defaultPic];
const resList = reactive([]);
const cur = ref(0);
const loading = ref(true);
const router = useRouter();

const showList = computed(() => {
  if (cur.value == 0) {
    return [{}, {}].concat(resList.slice(0, 3));
  }
  if (cur.value == 1) {
    return [{}].concat(resList.slice(0, 4));
  }
  console.log(resList);
  let curList = [].concat(resList.slice(cur.value - 2, cur.value + 3));
  // 不足 5 张图片，用空白补全
  if (curList.length < 5) {
    for (let i = curList.length; i < 5; i++) {
      curList.push({});
    }
  }
  return curList;
});

const curId = () => {
  return resList[cur.value].id;
}

const backward = () => {
  if (cur.value == 0) {
    ElNotification({
      title: '',
      message: 'It is the first dream!',
      type: 'success',
    });
    return;
  }
  cur.value -= 1;
}

const forward = () => {
  if (cur.value >= resList.length - 1) {
    ElNotification({
      title: '',
      message: 'It is the last dream!',
      type: 'success',
    });
    return;
  }
  cur.value += 1;
}

onMounted(() => {
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  
  fetch('/api/share-list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.data.list.map(item => resList.push(item));
      loading.value = false;
      loadingInstance.close();
    })
    .catch((error) => {
      console.error('Error:', error);
      loadingInstance.close();
    });
});
</script>

<style>
.cmp-pic-gallery {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pic-gallery-list {
  display: flex;
  justify-content: space-between; /* 使用 space-between 确保左右间距一致 */
  align-items: center;
  width: 100%; /* 根据需要调整宽度 */
  position: relative;
}
.gallery-pic-wrapper {
  height: 50vh;
  width: 30vh;
  margin: 0 1.3vw; /* 使用相对单位，确保响应式间距 */
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gallery-pic {
  height: 105%;
  width: 105%;
  border-radius: 64px; /* Smooth iOS-like rounded corners */
  box-shadow: 0 0 2vh 2vh rgba(53, 28, 105, 0.6);
}
.pic-0 {
  scale: 80%;
  opacity: 80%;
}
.pic-4 {
  scale: 80%;
  opacity: 80%;
}
.pic-1 {
  scale: 90%;
  opacity: 90%;
}
.pic-3 {
  scale: 90%;
  opacity: 90%;
}
.pic-gallery-forward, .pic-gallery-backward {
  position: absolute;
  top: 50%;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  opacity: 0.9; /* 设置初始透明度 */
  transition: transform 0.3s ease, opacity 0.3s ease; /* 添加过渡效果 */
}
.pic-gallery-forward {
  right: 12px;
  background-image: url('../assets/next.png');
}
.pic-gallery-backward {
  left: 12px;
  background-image: url('../assets/previous.png');
}
.pic-gallery-forward:hover, .pic-gallery-backward:hover {
  transform: scale(1.1); /* hover 时放大 */
  opacity: 0.6; /* hover 时变暗 */
}
</style>