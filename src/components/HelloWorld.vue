<script setup lang="ts">
import { ref } from 'vue';

import { userRequest } from '../api/user'
defineProps<{ msg: string }>()
let message = ref('');
let localValue = ref('请输入SQL')
let  dataList = ref([])
const databaseTest=()=>{
  (window as any).ipcRenderer.send('openFlyCar')
}
const addHttp=()=>{
  userRequest({}).then((res: any) => {
    console.log('res: ', res)
    dataList.value = res
  })
}
const changeSQ=()=>{
  console.log(localValue,"localValue");
  (window as any).ipcRenderer.send('changeSQ',localValue.value)
}
(window as any).ipcRenderer.on('add', (event:any, data:any) => {
  console.log(event,data)
  message.value = JSON.stringify(data)
})

</script>

<template>
  <div class="card">
    <p>
      <button @click="databaseTest()">获取所有表数据</button>
    </p>
    <p>
      <button @click="changeSQ()">通过SQL添加表数据</button>
    </p>
    <p>-------------</p>
    {{ message }}
    <p>-------------</p>
    <input v-model="localValue"  />
    <p>-------------</p>
    <p>INSERT INTO user (id) VALUES (?)</p>
    <p>-------------</p>
    <p>DELETE FROM user WHERE id = 1;</p>
    <p>-------------</p>
    <p>UPDATE user SET id = 1 WHERE id = 2;</p>
    <p><button @click="addHttp()">链接本地服务器</button></p>
    <p>我是链接自己服务获取的数据：{{dataList}}</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
