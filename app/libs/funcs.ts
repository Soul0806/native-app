
export function removeLastThreeChars(input: string): string {
    return input.slice(0, -3); // 從頭取到倒數第 3 個字元之前
}
export function pp(arg: object) {
    return JSON.stringify(arg, null, 2);
}

export function entriesValueFilter(obj: object, filterStr: string) {
    const re = new RegExp(filterStr);
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            const filtered = (value as string[]).filter((v: string) => re.test(v))
            if(filtered.length > 0 ) {
            return [key, filtered];     
            }   
                return undefined;
        })
        .filter((entry): entry is [string, string[]] => entry !== undefined )
        .reverse()
    );
}

export function entriesValueFilter_1(obj: object, filterStr: string) {
    const re = new RegExp(filterStr);   

    // const aaa = { "2024": [1, 2], '2025': [2, 2] }
    // const test = new Map(Object.entries(aaa).reverse())
    const result = Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            const result = Object.fromEntries(
                Object.entries(value).map(([innerK, innerV]) => {

                const filtered = (innerV as string[]).filter((v: string) => re.test(v))
                if(filtered.length > 0 ) {
                return [innerK, filtered];     
                }   
                    return undefined;
                }).filter((entry): entry is [string, string[]] => entry !== undefined )
                .reverse()
            )
            
            return [key, result]
            
        }).reverse()
    );
    // console.log(new Map(Object.entries(result).reverse()));
    return new Map(Object.entries(result).reverse()) as Map<string, string[]>;
}

export function convertToEntries(obj: Record<string, string[]>, keys: string[]) {
    const objectArray = Object.entries(obj).map(([key, value]) => ({
        [keys[0]]: key,
        [keys[1]]: value,
        }        
    ))

    return objectArray;
}

export function insertAt(str: string, insert: string, index: number) {
  return str.slice(0, index) + insert + str.slice(index);
}

export function stockfilter(stock: Record<any, any>, filter:string = '') {
    const re = new RegExp(filter);
    return Object.entries(stock).map(([key, specWithLocs]) => (
        Object.fromEntries(
            Object.entries(specWithLocs).filter(([spec]) => 
                (re.test(spec))
            )
        )
    ))
}

export function stockfilter1(stock: Record<any, any>, filter:string = '') {    
    let result:Record<string, Record<string, Record<string, number>>> = {}
    const re = new RegExp(filter); 

   const sortedStock = (function(stock) {
        return Object.fromEntries(
            Object.entries(stock).map(([key, valueObj]) => {
                const sortedValue = Object.fromEntries(
                Object.keys(valueObj).sort().map(k => [k, valueObj[k]])
                );
                return [key, sortedValue];
            })
        );
   })(stock);
    
    for(const [inch, spec_loc] of Object.entries(sortedStock)) {
        for(const [spec, loc] of Object.entries(spec_loc)) {            
            if(re.test(spec)) {                
                if(!result[inch]) {
                    result[inch] = {}
                }
                if (!result[inch][spec]) {
                    result[inch][spec] = {};
                }
                result[inch][spec] = loc as Record<string, number>;
            }
        }
    }
    
    return result
}

// Object.fromEntries(rr
//                 Object.entries(stockWithLoc).map(([spec, loc]) => {
//                     if(!re.test(spec)) {
//                         return [spec, loc];
//                     }
//                 ))}
//             )