<template>
  <div>
    <!-- {{ currentByteProp }} -->
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
          <el-tab-pane label="十六进制报文" name="first">
              <PacketText :currentByteProp="currentByteProp" />
          </el-tab-pane>
          <el-tab-pane label="报文转JSON配置" name="second">
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
const byteRules = ref(new Map<String, ByteProp>());
const currentBytePropKey = ref('');
const activeName = ref('first');
const currentByteProp = computed(() => {
    return byteRules.value.get(currentBytePropKey.value);
  });

function handleClick(tab, event) {
  console.log(tab, event);
}

function import1() {}
function export1() {}

function addNewByteRule() {
  if(!byteRules.value.has(newByteRule.value)) {
      const one: ByteProp = new ByteProp(newByteRule.value);
      byteRules.value.set(newByteRule.value, one);
      // if(currentByteProp.value = '') {
      //   currentByteProp.value = one;
      // }
  }
  newByteRule.value = "";
}

</script>
<style scoped>
  .card{
    margin: 5px;
  }
</style>