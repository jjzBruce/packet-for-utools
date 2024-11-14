<template>
  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="十六进制报文" name="first">
        <PacketText/>
    </el-tab-pane>
    <el-tab-pane label="报文转JSON配置" name="second">
      <ByteConvertSet />
    </el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import PacketText from './packetText/index.vue'
import ByteConvertSet from './byteConvertSet/index.vue'

const activeName = ref('first');

function handleClick(tab, event) {
  console.log(tab, event);
}

</script>
<style scoped>
</style>