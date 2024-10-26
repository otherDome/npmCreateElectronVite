<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';
let message = ref('');
const addHttp = () => {
  axios.get('http://127.0.0.1:3000/api/test')
    .then((response: any) => {
      // 请求成功，打印响应数据
      console.log('res: ', response.data);
      message.value = '调用成功'
    })
    .catch((error: any) => {
      // 请求失败，打印错误信息
      console.error('Error during fetching user data:', error);
    });
}
const sendMessage = () => {
  (window as any).ipcRenderer.send('test', '向主线程发送消息');
};
(window as any).ipcRenderer.on('add', (event: any, data: any) => {
  console.log(event, data)
  message.value = JSON.stringify(data)
})
</script>

<template>
  <div>
    <button @click="sendMessage">渲染线程发送消息</button>
    <button @click="addHttp">调用本地数据接口</button>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
