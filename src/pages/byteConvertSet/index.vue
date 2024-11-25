<template>
    <div>
        <el-card class="card">
            字节长度：<el-input-number v-model="currentByteProp.byteLen" :min="1" label="长度"></el-input-number>
            <el-button @click="resetChoose">重置选择</el-button>
            <el-button @click="addRule">添加规则</el-button>
        </el-card>

        <el-card class="card-byte">
            <el-tag class="byte-tag"
             v-for="(item, index) in currentByteProp.byteLen" @click="byteClick(index)" :key="index"
             :type="byteTagColor(index)">{{ index }}</el-tag>
        </el-card>

        <el-card class="card-rule">
            <el-card v-for="([k, v]) in byteRuleMap.entries()" :key="k" class="outer-class">
                <div slot="header" class="clearfix" style="margin-bottom: 2px;">
                    <el-row>
                        <el-col :offset="21" :span="3">
                            <el-button type="danger" style="float: right;" @click="removeRuleItem(k)">删除</el-button>
                        </el-col>
                    </el-row>
                </div>
                <el-row :gutter="20" style="margin-bottom: 2px;">
                    <el-col :span="3">
                        字节位：
                    </el-col>
                    <el-col :span="6">
                        <el-tag class="byte-tag"
                        v-for="(item, index) in v['byteIndexes']" :key="index"
                        type="success">{{ item }}</el-tag> 
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="v.ruleKey" placeholder="jsonKey" />
                    </el-col>
                    <el-col :offset="3" :span="6">
                        <el-select v-model="v['ruleType']" placeholder="选择规则" style="float: right;">
                            <el-option
                            v-for="item in RuleType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                
                <div v-if="v['ruleType'] === 'map'" class="map-div-class">
                    <el-row :gutter="20" v-for="(ii, index) in v['maps']" :key="ii" class="rule-map-row-class">
                        <el-col :span="5">
                            <el-input v-model="ii['key']" placeholder="字节" />
                        </el-col>
                        <el-col :span="2">==></el-col>
                        <el-col :span="5">
                            <el-input v-model="ii['val']" placeholder="映射的值" />
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" @click="addMapItem(v['maps'])">+</el-button>
                            <el-button type="danger" @click="removeMapItem(v['maps'], index)">-</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div v-else-if="v['ruleType'] === 'to10'" class="map-div-class">
                </div>
                <div v-else>
                    <div  style="margin-bottom: 2px;">
                        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 24}"
                        placeholder="输入 js 脚本" v-model="v['script']"></el-input>
                    </div>
                    <el-card>
                        <div slot="header" class="clearfix" style="margin-bottom: 2px;">
                            脚本测试
                        </div>
                        <el-row>
                            <el-col :span="6">
                                <el-input v-model="v.scriptTestParam" placeholder="入参"></el-input>
                            </el-col>
                            <el-col :offset="1" :span="3">
                                <el-button type="primary" @click="testJs(v)">测试</el-button>
                            </el-col>
                            <el-col :span="14">
                                <el-input v-model="v.scriptTestResult" placeholder="结果" readonly></el-input>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>
            </el-card>
        </el-card>

    </div>
  </template>
  
  <script lang="ts" setup>
  import {ref,computed} from 'vue';
  import { RuleType, ByteRule, ByteProp } from '../packet'

  const props = defineProps({
    currentByteProp: { type: ByteProp, default: new ByteProp('') }
  });

  const chooseByteTags = ref(new Set<number>());

  const byteRuleMap = computed(() => {
    return props.currentByteProp.byteRuleMap;
  });

  function removeRuleItem(byteRuleMapKey: string) {
    // console.log('props.currentByteProp.byteRuleMap', props.currentByteProp.byteRuleMap)
    props.currentByteProp.byteRuleMap.delete(byteRuleMapKey);
  }

  function testJs(v: ByteRule) {
    try {
        const func = new Function('str', v.script);
        const funcResult = func(v.scriptTestParam);
        v.scriptTestResult = funcResult;
    } catch(e) {
        v.scriptTestResult = e;
    }
  }

  function addRule() {
    if(chooseByteTags.value.size > 0) {
        const byteArr: number[] = Array.from(chooseByteTags.value);
        props.currentByteProp.addByteRule(byteArr);
    }
  }

  function addMapItem(maps: Array<Object>) {
    maps.push({
        key: "",
        val: "",
    });
  }

  function removeMapItem(maps: Array<Object>, index: number) {
    if(maps.length > 1) {
        maps.splice(index, 1);
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
.rule-map-row-class {
    margin-bottom: 2px;
}

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

.card{
    margin: 5px;
}

.card-byte {
    margin: 5px;
    background-color: #FE7A36;
} 

.card-rule {
    margin: 2px;
}

</style>