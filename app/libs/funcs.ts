
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

// Object.fromEntries(rr
//                 Object.entries(stockWithLoc).map(([spec, loc]) => {
//                     if(!re.test(spec)) {
//                         return [spec, loc];
//                     }
//                 ))}
//             )