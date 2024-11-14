<template>
    <div>

        <div class="card-class">
            字节长度：<el-input-number v-model="byteLen" :min="1" label="长度"></el-input-number>
            <el-button @click="resetChoose">重置选择</el-button>
            <el-button @click="addRule">添加规则</el-button>
        </div>

        <div class="card-class">
            <el-tag class="byte-tag"
             v-for="(item, index) in byteLen" @click="byteClick(index)" :key="index"
             :type="byteTagColor(index)">{{ index }}</el-tag>
        </div>

        <div class="card-class">
            <div v-for="([k, v]) in byteRule.entries()" :key="k">
                <div>
                    <el-tag class="byte-tag"
                        v-for="(item, index) in v['byteIndexes']" :key="index"
                        type="success">{{ item }}</el-tag> ==> 
                </div>
            </div>
        </div>

    </div>
  </template>
  
  <script lang="ts" setup>
  import {ref} from 'vue';
  
  const byteLen = ref(10);
  const chooseByteTags = ref(new Set());
  const byteRule = ref(new Map());

  function addRule() {
    if(chooseByteTags.value.size > 0) {
        const byteArr = Array.from(chooseByteTags.value);
        byteArr.sort((a, b) => {
            const intA:number = a as number;
            const intB:number = b as number;
            return intA - intB; // 升序排序
        });
        byteRule.value.set(byteArr.join(','), {
            byteIndexes: byteArr
        });
    }
  }

  function resetChoose() {
    chooseByteTags.value = new Set();
  }

  function byteTagColor(index: number) {
    if(chooseByteTags.value.has(index)) {
        return 'warning';
    } else {
        return 'success';
    }
  }

  function byteClick(index: number) {
    if(chooseByteTags.value.has(index)) {
        chooseByteTags.value.delete(index);
    } else {
        chooseByteTags.value.add(index);
    }
  }

  
</script>
<style scoped>
.card-class {
    background-color: #e9ede9;
    border: 1px splid black;
    margin: 5px;;
    padding: 5px;
}

.byte-tag {
    cursor: pointer;
}

</style>