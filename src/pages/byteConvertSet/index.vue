<template>
    <div>

        <div class="card-class">
            字节长度：<el-input-number v-model="byteLen" :min="1" label="长度"></el-input-number>
            <el-button @click="resetChoose">重置选择</el-button>
            <el-button @click="addRule">添加规则</el-button>
        </div>

        {{ byteRule }}

        <div class="card-class">
            <el-tag class="byte-tag"
             v-for="(item, index) in byteLen" @click="byteClick(index)" :key="index"
             :type="byteTagColor(index)">{{ index }}</el-tag>
        </div>

        <div class="card-class">
            <div v-for="([k, v]) in byteRule.entries()" :key="k" class="outer-class">
                <el-row :gutter="20">
                    <el-col :span="3">
                        字节位：
                    </el-col>
                    <el-col :span="6">
                        <el-tag class="byte-tag"
                        v-for="(item, index) in v['byteIndexes']" :key="index"
                        type="success">{{ item }}</el-tag> 
                    </el-col>
                    <el-col :span="4">
                        <el-select v-model="v['ruleType']" placeholder="选择规则">
                            <el-option
                            v-for="item in ruleType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                
                <div v-if="v['ruleType'] === 'map'" class="map-div-class">
                    <el-row :gutter="20">
                        <el-col :span="5">
                            <el-input placeholder="请输入内容" />
                        </el-col>
                        <el-col :span="1">==></el-col>
                        <el-col :span="5">
                            <el-input placeholder="请输入内容" />
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" icon="el-icon-plus"></el-button>
                            <el-button type="danger" icon="el-icon-delete"></el-button>
                            <el-button icon="el-icon-search" circle></el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-else>
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 24}"
                    placeholder="输入动态转换 js 脚本" v-model="v['script']"></el-input>
                </div>
            <div>
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
  const ruleType = [{ value: 'map',label: '静态转换'}, { value: 'fun',label: '动态转换'}]

  function addRule() {
    if(chooseByteTags.value.size > 0) {
        const byteArr = Array.from(chooseByteTags.value);
        byteArr.sort((a, b) => {
            const intA:number = a as number;
            const intB:number = b as number;
            return intA - intB; // 升序排序
        });
        const key = byteArr.join(',');
        byteRule.value.set(key, {
            byteIndexes: byteArr,
            ruleType: 'map',
            maps: [],
            script: '',
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

.outer-class {
    border: 1px splid red;
    margin: 5px;
}

.map-div-class {
    border: 2px splid blue;
    margin: 10px;
}

</style>