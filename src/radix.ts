import { sleep } from "./App";


export const RadixSort256 = async (arr: number[], n: number, setArr:(arr: number[])=>void) =>
{
 if (n <= 1) return; // Added base case

 let output: number[] = [...arr]; // output array
 
 let count: number[] = [];

 for (let shift = 0, s = 0; shift < 4; shift++, s += 8)
 {
  // Zero the counts
  for (let i = 0; i < 256; i++)
   count[i] = 0;

  // Store count of occurrences in count[] 
  for (let i = 0; i < n; i++)
   count[(arr[i] >> s)&0xff]++;

  // Change count[i] so that count[i] now contains 
  // actual position of this digit in output[] 
  for (let i = 1; i < 256; i++)
   count[i] += count[i - 1];

  // Build the output array 
  for (let i = n - 1; i >= 0; i--)
  {
   // precalculate the offset as it's a few instructions
   let idx = (arr[i] >> s) & 0xff;

   // Subtract from the count and store the value
   output[--count[idx]] = arr[i];
   setArr(output)
   await sleep(5)
  }

  // Copy the output array to input[], so that input[] 
  // is sorted according to current digit

  arr = [...output];
 }

}