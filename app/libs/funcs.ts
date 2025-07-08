
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
    );
}