
export class ByteRule {
    public byteIndexes: number[];
    public ruleType: string;
    public maps: {[key: string]: any}[];
    public script: string;
}

export class ByteProp {
    public name: string;
    public byteLen: number = 10;
    public byteRuleMap: Map<string, ByteRule>;
    constructor(name: string) {
        this.name = name;
        this.byteRuleMap = new Map<string, ByteRule>();
    }

    public addByteRule(byteArr: number[]) {
        byteArr.sort((a, b) => {
            const intA:number = a as number;
            const intB:number = b as number;
            return intA - intB; // 升序排序
        });
        const key = byteArr.join(',');
        const br: ByteRule = new ByteRule();
        br.byteIndexes = byteArr;
        br.ruleType = 'map';
        br.maps = [];
        br.maps.push({
            key: "",
            val: "",
        });
        br.script = '';
        this.byteRuleMap.set(key, br);
    }

    public transferJson(packetStr: string) {
        if(this.byteRuleMap?.size <= 0) {
          return '{}';
        } else {
          const json = {};
     
          for (const rule of this.byteRuleMap.values()) {
            const byteIndexes: number[] = rule.byteIndexes;
            let byteVal = '';
            for(const index in byteIndexes) {
              byteVal += packetStr.substring(index, index+1);
            }
    
            const ruleType = rule.ruleType;
            
            let jsonKey = 'key';
            let jsonVal = null;
            if(ruleType === 'map') {
                const maps = rule.maps;
                for (const item in maps) {
                  if(item['key'] == byteVal) {
                    jsonVal = item['val'];
                    break;
                  }
                }
            } else if (ruleType === 'fun') {
                // todo 
            }
            json[jsonKey] = jsonVal;
          }
          return json;
        }
      }
}

export const RuleType = [
    { value: 'map',label: '映射'}, 
    { value: 'fun',label: '函数'},
    { value: 'to10',label: '转 10 进制'}
]
