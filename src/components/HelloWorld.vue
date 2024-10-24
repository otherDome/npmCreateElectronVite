<script setup lang="ts">
import { ref } from 'vue';

// import { userRequest } from '../api/user'
import axios from 'axios';
defineProps<{ msg: string }>()
let message = ref('');
let localValue = ref('请输入SQL')
let dataList = ref([])
const databaseTest = () => {
  (window as any).ipcRenderer.send('openFlyCar')
}
const addHttp = () => {
  axios.get('http://127.0.0.1:3000/api/test')
    .then((response) => {
      // 请求成功，打印响应数据
      console.log('res: ', response.data);
      dataList.value = response.data
      // 假设你有一个响应式变量dataList来存储数据
      // dataList.value = response.data; // 这里需要根据你的实际代码来设置
    })
    .catch((error) => {
      // 请求失败，打印错误信息
      console.error('Error during fetching user data:', error);
    });
}
const changeSQ = () => {
  console.log(localValue, "localValue");
  (window as any).ipcRenderer.send('changeSQ', localValue.value)
}
(window as any).ipcRenderer.on('add', (event: any, data: any) => {
  console.log(event, data)
  message.value = JSON.stringify(data)
})

</script>

<template>
  <div class="card">
    <p>
      <button @click="databaseTest()">调取sqlite</button>
    </p>
    <p>
      <button @click="changeSQ()">执行SQL操作</button>
    </p>
    <p>-------------</p>
    {{ message }}
    <p>-------------</p>
    <input v-model="localValue" />
    <p>-------------</p>
    <p>INSERT INTO user (id) VALUES (‘添加的ID’)</p>
    <p>-------------</p>
    <p>DELETE FROM user WHERE id = ‘随便一个想要删除的’;</p>
    <p>-------------</p>
    <p>UPDATE user SET id = ‘修改后ID’ WHERE id = ‘修改前ID’;</p>
    <p><button @click="addHttp()">http请求</button></p>
    <p>http：{{ dataList }}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
