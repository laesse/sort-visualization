import { sleep } from "./App";

const merge = async (arr: number[], l: number, m: number, r: number, setArr:(arr: number[])=>void) => {
    // Find sizes of two subarrays to be merged 
    let n1 = m - l + 1;
    let n2 = r - m;

    /* Create temp arrays */
    let L = [];
    let R = [];

    /*Copy data to temp arrays*/
    for (let i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (let j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    /* Merge the temp arrays */

    // Initial indexes of first and second subarrays 
    let i = 0, j = 0;

    // Initial index of merged subarry array 
    let k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
            setArr(arr)
            await sleep(5)
        }else {
            arr[k] = R[j];
            j++;
            setArr(arr)
            await sleep(5)
        }
        k++;
    }

    /* Copy remaining elements of L[] if any */
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        setArr(arr)
        await sleep(5)
    }

    /* Copy remaining elements of R[] if any */
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        setArr(arr)
        await sleep(5)
    }
}

// Main function that sorts arr[l..r] using 
// merge() 
export const mergeSort = async (arr: number[], l: number, r: number, setArr:(arr: number[])=>void) => {
    if (l < r) {
        // Find the middle point 
        let m = Math.floor((l + r) / 2);

        // Sort first and second halves 
        await mergeSort(arr, l, m, setArr);
        await mergeSort(arr, m + 1, r, setArr);

        // Merge the sorted halves 
        await merge(arr, l, m, r, setArr);
    }
} 