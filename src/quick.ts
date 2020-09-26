const partition = async (arr: number[], low: number, high: number, setArr: (arr: number[]) => Promise<void>) => {
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
            await setArr(arr)
        }
    }

    // swap arr[i+1] and arr[high] (or pivot) 
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    await setArr(arr)

    return i + 1;
}


/* The main function that implements QuickSort() 
  arr[] --> Array to be sorted, 
  low  --> Starting index, 
  high  --> Ending index */
export const quick = async (arr: number[], low: number, high: number, setArr: (arr: number[]) => Promise<void>) => {
    if (low < high) {
        /* pi is partitioning index, arr[pi] is  
          now at right place */
        let pi = await partition(arr, low, high, setArr);

        // Recursively sort elements before 
        // partition and after partition 
        await quick(arr, low, pi - 1, setArr);
        await quick(arr, pi + 1, high, setArr);
    }
} 