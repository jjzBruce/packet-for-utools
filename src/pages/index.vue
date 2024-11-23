<template>
  <div>
    <el-card shadow="hover" class="card">
      <el-row>
          <el-col :span="4">
              <el-button @click="addNewByteRule">新增报文规则</el-button>
          </el-col>
          <el-col :span="6">
              <el-input v-model="newByteRule"></el-input>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-form-item label="当前选择" class="card1">
              <el-select v-model="currentByteRule" placeholder="选择规则">
                  <el-option
                      v-for="([k, v]) in byteRules.entries()"
                      :key="k"
                      :label="k"
                      :value="v">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :offset="1" :span="6">
            <el-button @click="import1">导入</el-button>
            <el-button @click="export1">导出</el-button>
          </el-col>
      </el-row>
    </el-card>

    <el-card class="card">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="十六进制报文" name="first">
              <PacketText/>
          </el-tab-pane>
          <el-tab-pane label="报文转JSON配置" name="second">
            <ByteConvertSet :currentByteRule="currentByteRule" />
          </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import PacketText from './packetText/index.vue'
import ByteConvertSet from './byteConvertSet/index.vue'

const newByteRule = ref('');
const byteRules = ref(new Map());
const currentByteRule = ref({});
const activeName = ref('first');

function handleClick(tab, event) {
  console.log(tab, event);
}

function import1() {}
function export1() {
  const dataObject = { name: "张三", age: 25 };  // 假设这是要导出的数据对象
  const jsonData = JSON.stringify(dataObject);  // 转换为JSON字符串
  utools.showSaveDialog({
      title: '请选择保存JSON文件的位置',
      filters: [
          { name: 'JSON文件', extensions: ['json'] }
      ]
  }, (filePath) => {
      if (filePath) {
          const fs = require('fs');
          fs.writeFileSync(filePath, jsonData, 'utf8');
          console.log('JSON数据已成功导出到文件：', filePath);
      } else {
          console.log('用户取消了文件保存操作');
      }
  });

  // utools.showSaveDialog({ 
  //   title: '保存位置', 
  //   defaultPath: utools.getPath('downloads'),
  //   buttonLabel: '导出'
  // }, (filePath) => {

  // });
}

function addNewByteRule() {
  if(!byteRules.value.has(newByteRule.value)) {
      byteRules.value.set(newByteRule.value, {
        name: newByteRule.value,
        byteRule: new Map()
      });
  }
  newByteRule.value = "";
}

</script>
<style scoped>
  .card{
    margin: 5px;
  }
</style>