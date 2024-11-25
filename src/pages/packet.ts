
export class ByteRuleMap {
  public key: string = '';
  public val: string = '';
}

export class ByteRule {
    public byteIndexes: number[];
    public ruleKey: string;
    public ruleType: string;
    public maps: ByteRuleMap[];
    public script: string;
    public scriptTestParam: string;
    public scriptTestResult: string;
}

export class ByteProp {
    public name: string;
    public byteLen: number = 10;
    public byteRuleMap: Map<string, ByteRule>;
    constructor(name: string) {
        this.name = name;
        this.byteRuleMap = new Map<string, ByteRule>();
    }

    public setFromJson(json: JSON) {
        this.name = json['name'];
        this.byteLen = json['byteLen'];
        this.setByteRuleMapFromJson(json['byteRuleMap']);
    }

    public toJson() {
        const brmj = this.byteRuleMapToJson();
        // console.log('brmj: ', brmj);
        return {
            name: this.name,
            byteLen: this.byteLen,
            byteRuleMap: brmj
        };
    }

    public byteRuleMapToJson() {
      const jsonArr = [];
      for (const rule of this.byteRuleMap.values()) {
          jsonArr.push({
            byteIndexes: rule.byteIndexes,
            ruleKey: rule.ruleKey,
            ruleType: rule.ruleType,
            maps: rule.maps,
            script: rule.script,
          });
      }
      console.log('jsonArr: ', jsonArr)
      return jsonArr;
    }

    public setByteRuleMapFromJson(jsonArr: JSON[]) {
        jsonArr.forEach(x => {
            const br: ByteRule = new ByteRule();
            br.byteIndexes = x['byteIndexes'];
            br.ruleKey = x['ruleKey'];
            br.ruleType = x['ruleType'];
            br.maps = x['maps'];
            br.script = x['script'];
            // console.log('json: ', x);
            // console.log('br: ', br);
            this.byteRuleMap.set(br.byteIndexes?.join(',') || '', br);
        })
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
        br.ruleKey = key;
        br.ruleType = 'map';
        br.maps = [];
        br.maps.push(new ByteRuleMap());
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
            for(const i in byteIndexes) {
              const start = Number(byteIndexes[i]) * 2;
              const end = Math.min(start + 2, packetStr.length);
              byteVal += packetStr.substring(start, end);
              // console.log('byteVal 截取: ', byteIndexes, i, start, end);
            }
            // console.log('byteVal: ', byteVal);

            const ruleType = rule.ruleType;
            let jsonKey = rule.ruleKey;
            let jsonVal = null;
            if(ruleType === 'map') {
                const maps = rule.maps;
                for (const i in maps) {
                  const item = maps[i];
                  if(item.key == byteVal) {
                    jsonVal = item.val;
                    break;
                  }
                }
            } else if (ruleType === 'fun') {
              try {
                const func = new Function('str', rule.script);
                const funcResult = func(byteVal);
                jsonVal = funcResult;
              } catch (e) {
                jsonVal = e;
              }
            } else if (ruleType === 'to10') {
              jsonVal = parseInt(byteVal, 16);
            } else {
              jsonVal = byteVal;
            }
            json[jsonKey] = jsonVal;
          }
          return JSON.stringify(json);
        }
      }
}

export const RuleType = [
    { value: 'map',label: '映射'}, 
    { value: 'fun',label: '函数'},
    { value: 'to10',label: '转 10 进制'}
]
