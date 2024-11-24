<template>
  <div>
    {{ byteRules }}
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
              <el-select v-model="currentBytePropKey" placeholder="选择规则">
                  <el-option
                      v-for="([k]) in byteRules.entries()"
                      :key="k"
                      :label="k"
                      :value="k">
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
          <el-tab-pane label="报文字串(Hex)" name="first">
              <PacketText :currentByteProp="currentByteProp" />
          </el-tab-pane>
          <el-tab-pane label="转JSON配置" name="second">
            <ByteConvertSet :currentByteProp="currentByteProp" />
          </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {ref,computed} from 'vue';
import { RuleType, ByteRule, ByteProp } from './packet'
import PacketText from './packetText/index.vue'
import ByteConvertSet from './byteConvertSet/index.vue'

const newByteRule = ref('');
const byteRules = ref(new Map<string, ByteProp>());
const currentBytePropKey = ref('');
const activeName = ref('first');
const currentByteProp = computed(() => {
    return byteRules.value.get(currentBytePropKey.value);
  });

function handleClick(tab, event) {
  console.log(tab, event);
}

function import1() {
  const readPath = utools.showOpenDialog({ 
    filters: [{ 'name': 'PacketRule.json', extensions: ['json'] }], 
    properties: ['openFile'] 
  })
  if (readPath != undefined && readPath.length > 0) {
    console.log('readPath[0]', readPath[0])
    const readStr: string = readLocalFile(readPath[0]);
    console.log('readStr: ', readStr)
    const rules = JSON.parse(readStr);
    console.log('rules: ', rules)

  }
}

function export1() {
  const savePath = utools.showSaveDialog({ 
    title: '保存位置', 
    defaultPath: utools.getPath('downloads'),
    filters: [{ 'name': 'PacketRule.json', extensions: ['json'] }], 
    buttonLabel: '导出'
  })
  if (savePath != undefined) {
    const byteRulesArray:string[] = [];
    for (const [k, value] of byteRules.value.entries()) {
      const bp: ByteProp = byteRules.value.get(k);
      console.log('k', k);
      console.log('bp: ', bp);
      const json = JSON.stringify(bp);
      byteRulesArray.push(json);
    }
    console.log('byteRulesArray: ', byteRulesArray)
    console.log('byteRulesArray json: ',  JSON.stringify(byteRulesArray))

    // writeLocalFile(savePath, JSON.stringify(byteRulesArray))
  }
}

function addNewByteRule() {
  if(!byteRules.value.has(newByteRule.value)) {
      const one: ByteProp = new ByteProp(newByteRule.value);
      byteRules.value.set(newByteRule.value, one);
      if(currentBytePropKey.value == '') {
        currentBytePropKey.value = newByteRule.value;
      }
  }
  newByteRule.value = "";
}

</script>
<style scoped>
  .card{
    margin: 5px;
  }
</style>