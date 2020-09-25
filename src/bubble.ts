import { sleep } from "./App";

export const bubble = async (array: number[], setArray: (arr: number[]) => void) => {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                console.log(array)
                setArray(array);
                await sleep(5);
            }
        }
    }
}
export const cocktailSort = async (a: number[], setArray: (arr: number[]) => void) => {
    let swapped = true;
    let start = 0;
    let end = a.length;

    while (swapped === true) {
        // reset the swapped flag on entering the 
        // loop, because it might be true from a 
        // previous iteration. 
        swapped = false;

        // loop from bottom to top same as 
        // the bubble sort 
        for (let i = start; i < end - 1; ++i) {
            if (a[i] > a[i + 1]) {
                let temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
                setArray(a);
                await sleep(5);
            }
        }

        // if nothing moved, then array is sorted. 
        if (swapped === false)
            break;

        // otherwise, reset the swapped flag so that it 
        // can be used in the next stage 
        swapped = false;

        // move the end point back by one, because 
        // item at the end is in its rightful spot 
        end = end - 1;

        // from top to bottom, doing the 
        // same comparison as in the previous stage 
        for (let i = end - 1; i >= start; i--) {
            if (a[i] > a[i + 1]) {
                let temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
                setArray(a);
                await sleep(5);
            }
        }

        // increase the starting point, because 
        // the last stage would have moved the next 
        // smallest number to its rightful spot. 
        start = start + 1;
    }
}