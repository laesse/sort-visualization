import { BoxState, SortItem } from './App';
export const gravity = async (arr: SortItem[]) =>
{
    let out: SortItem[][] = []
    let max = arr[0].number;
    for (let i = 1; i < arr.length; i++)
        if (arr[i].number > max)
            max = arr[i].number;

    //Set up abacus
    let grid: boolean[][] = [[true]];
    let levelcount: number[] = [0];
    for (let i = 0; i < max; i++) {
        levelcount[i] = 0;
        for (let j = 0; j < arr.length; j++) {
            grid[i] = []
            grid[i][j] = false;
        }
    }
    //Drop the beads
    for (let i = 0; i < arr.length; i++) {
        let num = arr[i].number;
        for (let j = 0; num > 0; j++) {
            grid[j][levelcount[j]++] = true;
            num--;
        }
        let step = [...arr]
        step[i] = {number: step[i].number, state: BoxState.active};
        out.push(step)
    }
    //Count the beads
    let sorted = [...arr];
    for (let i = 0; i < arr.length; i++) {
        let putt = 0;
        for (let j = 0; j < max && grid[j][arr.length - 1 - i]; j++)
            putt++;
        sorted[i] = {number: putt, state: BoxState.done};
        out.push([...sorted])
    }

    return out;
}