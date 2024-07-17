import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const genStore = defineStore('genStore', () => {
  const imgUrl = ref('');
  const promote = ref('');
  
  const setImgUrl = (url) => {
    imgUrl.value = url;
  }
  const setPromote = (str) => {
	promote.value = str;
  }

  return { imgUrl, promote, setImgUrl, setPromote }
})
