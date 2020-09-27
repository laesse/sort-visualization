const merge = async (arr: number[], l: number, m: number, r: number, out: number[][]) => {
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
            out.push([...arr])
        }else {
            arr[k] = R[j];
            j++;
            out.push([...arr])
        }
        k++;
    }

    /* Copy remaining elements of L[] if any */
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
        out.push([...arr])
    }

    /* Copy remaining elements of R[] if any */
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
        out.push([...arr])
    }
}

// Main function that sorts arr[l..r] using 
// merge() 
const mergeSortR = async (arr: number[], l: number, r: number, out: number[][]) => {
    if (l < r) {
        // Find the middle point 
        let m = Math.floor((l + r) / 2);

        // Sort first and second halves 
        await mergeSortR(arr, l, m, out);
        await mergeSortR(arr, m + 1, r, out);

        // Merge the sorted halves 
        await merge(arr, l, m, r, out);
    }
    return out;
} 

export const mergeSort = async (arr: number[], l: number, r: number) => {
    let out: number[][] = []
    await mergeSortR(arr, l, r, out);
    return out;
} 