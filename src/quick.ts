const partition = async (arr: number[], low: number, high: number, out: number[][]) => {
    let pivot = arr[high];
    let i = (low - 1); // index of smaller element 
    for (let j = low; j < high; j++) {
        // If current element is smaller than the pivot 
        if (arr[j] < pivot) {
            i++;

            // swap arr[i] and arr[j] 
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            out.push([...arr])
        }
    }

    // swap arr[i+1] and arr[high] (or pivot) 
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    out.push([...arr])

    return i + 1;
}


/* The main function that implements QuickSort() 
  arr[] --> Array to be sorted, 
  low  --> Starting index, 
  high  --> Ending index */
  export const quickR = async (arr: number[], low: number, high: number, out: number[][]) => {
    if (low < high) {
        /* pi is partitioning index, arr[pi] is  
          now at right place */
        let pi = await partition(arr, low, high, out);

        // Recursively sort elements before 
        // partition and after partition 
        await quickR(arr, low, pi - 1, out);
        await quickR(arr, pi + 1, high, out);
    }
} 
export const quick = async (arr: number[], low: number, high: number) => {
    let out:number[][] = []
    await quickR(arr, low, high, out);
    return out;
} 

