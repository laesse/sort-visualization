import { BoxState, SortItem } from './App';
export const bubble = async (array: SortItem[]) => {
    let out = []
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j].number > array[j + 1].number) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                
                let step = [...array]
                step[j] = {number: step[j].number, state: BoxState.active};
                step[j+1] = {number: step[j+1].number, state: BoxState.active};
                out.push(step)
            }
        }
        array[array.length-1-i] = {number: array[array.length-1-i].number, state: BoxState.done};
        out.push([...array])
    }
    return out;
}
export const cocktailSort = async (a: SortItem[]) => {
    let out = []
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
            if (a[i].number > a[i + 1].number) {
                let temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
                let step = [...a]
                step[i] = {number: step[i].number, state: BoxState.active};
                step[i+1] = {number: step[i+1].number, state: BoxState.active};
                out.push(step)
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
        if (end+1 < a.length){
            a[end+1] = {number: a[end+1].number, state: BoxState.done};
            out.push([...a])
        }

        // from top to bottom, doing the 
        // same comparison as in the previous stage 
        for (let i = end - 1; i >= start; i--) {
            if (a[i].number > a[i + 1].number) {
                let temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                swapped = true;
                let step = [...a]
                step[i] = {number: step[i].number, state: BoxState.active};
                step[i+1] = {number: step[i+1].number, state: BoxState.active};
                out.push(step)
            }
        }

        // increase the starting point, because 
        // the last stage would have moved the next 
        // smallest number to its rightful spot. 
        start = start + 1;
        a[start-1] = {number: a[start-1].number, state: BoxState.done};
        out.push([...a])
    }
    return out;
}