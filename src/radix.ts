import { BoxState, SortItem } from './App';

export const RadixSort256 = async (arr: SortItem[]): Promise<SortItem[][]> => {
    const n = arr.length;
    let out = []
    console.log(n)
    if (n <= 1) return [arr]; // Added base case

    let output: SortItem[] = [...arr]; // output array

    let count: number[] = [];

    console.log("test")
    for (let shift = 0, s = 0; shift < 4; shift++, s += 8) {
        // Zero the counts
        for (let i = 0; i < 256; i++)
            count[i] = 0;

            console.log("test1")
        // Store count of occurrences in count[] 
        for (let i = 0; i < n; i++)
            count[(arr[i].number >> s) & 0xff]++;

            console.log("test2")
        // Change count[i] so that count[i] now contains 
        // actual position of this digit in output[] 
        for (let i = 1; i < 256; i++)
            count[i] += count[i - 1];

        // Build the output array 
        for (let i = n - 1; i >= 0; i--) {
            // precalculate the offset as it's a few instructions
            let idx = (arr[i].number >> s) & 0xff;

            // Subtract from the count and store the value
            let ab = --count[idx];
            output[ab] = arr[i];


            let step = [...output]
            step[ab] = {number: step[ab].number, state: shift === 3 ? BoxState.done : BoxState.active}
            out.push(step)
        }
        // Copy the output array to input[], so that input[] 
        // is sorted according to current digit

        arr = [...output];
    }
    return out;
}