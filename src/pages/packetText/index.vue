<template>
    <div>
        <div class="card-class">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 24}"
            placeholder="十六进制报文" v-model="packetStr"></el-input>
        </div>
        
        <div class="card-class">
        <el-button @click="transferJson">转JSON</el-button>
        <el-button @click="addSpace">加空格</el-button>
        <el-button @click="removeSpace">去空格</el-button>
        <el-button @click="toUpperCase">大写化</el-button>
        <el-button @click="toLowerCase">小写化</el-button>
        </div>
        
        <div class="card-class">
        结果输出：<el-button @click="copy" :loading="copyBtnLoading">复制</el-button><br/>
        <el-card class="card-class">
          {{ packetConvertStr }}
        </el-card>
        </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import {ref} from 'vue';
  import { RuleType, ByteRule, ByteProp } from '../packet'


  const props = defineProps({
    currentByteProp: { type: ByteProp, default: new ByteProp('') }
  });
  
  const activeName = ref('first');
  const packetStr = ref('');
  const packetConvertStr = ref(null);
  const copyBtnText = ref('复制');
  const copyBtnLoading = ref(false);
  
  async  function copy() {
    if (navigator.clipboard) {
      try {
        copyBtnLoading.value = true;
        copyBtnText.value = '复制中';
            await navigator.clipboard.writeText(packetConvertStr.value);
            copyBtnText.value = '复制成功';
            console.log('文本已复制到剪贴板');
        } catch (err) {
          console.error('无法复制文本: ', err);
        } finally {
          copyBtnLoading.value = false;
          setTimeout(() => copyBtnText.value = '复制', 3000);
        }
    } else {
      alert('浏览器不支持复制到剪贴板');
    }
  }

  function transferJson () {
    packetConvertStr.value = props.currentByteProp.transferJson(packetStr.value);

    // const byteRule: Map =  props.currentByteRule.byteRule;
    // // console.log('byteRule', byteRule)
    // if(byteRule?.size <= 0) {
    //   packetConvertStr.value = '{}';
    // } else {
    //   const json = {};
    //   for (const value of byteRule.values()) {
    //     const byteIndexes = value.byteIndexes;
    //     let byteVal = '';
    //     for(const index in byteIndexes) {
    //       byteVal += packetStr.value.substr(index, 1);
    //     }

    //     const ruleType = value.ruleType;
        
    //     let jsonKey = 'key';
    //     let jsonVal = null;
    //     if(ruleType === 'map') {
    //         const maps = value.maps;
    //         for (const item in maps) {
    //           if(item.key == byteVal) {
    //             jsonVal = item.val;
    //             break;
    //           }
    //         }
    //     } else if (ruleType === 'fun') {
    //         // todo 
    //     }
    //     json[jsonKey] = jsonVal;
    //   }
    //   packetConvertStr.value = json;
    // }
  }
  
  function addSpace() {
    packetConvertStr.value = packetStr.value.replace(/(.{2})/g, '$1 ').trim();
  }
  
  function removeSpace() {
    packetConvertStr.value = packetStr.value.replace(/\s/g, '').trim();
  }
  
  function toUpperCase() {
    packetConvertStr.value = packetStr.value.toUpperCase();
  }
  
  function toLowerCase() {
    packetConvertStr.value = packetStr.value.toLowerCase();
  }
  
</script>
<style scoped>
.card-class {
    margin: 5px;;
}
</style>