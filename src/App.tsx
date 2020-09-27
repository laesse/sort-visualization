/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { cocktailSort, bubble } from './bubble'
import { mergeSort } from './merge'
import './App.css';
import { quick } from './quick';
import { RadixSort256 } from './radix';
import { gravity } from './gravity';

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

export enum BoxState {
  normal,
  active,
  done
}
const generateInitialArray = (size: number, max: number = size): SortItem[] => {
  const out = []
  const stepSize = Math.floor(max / size)
  for (let i = 0; i < max; i+=stepSize) {
    out[i] = { number: i + 1, state: BoxState.normal }
  }
  console.log(out)
  return shuffleArray<SortItem>(out);
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));


interface IBoxProps {
  size: number
  state: BoxState;
  max: number;

}
export interface SortItem {
  number: number;
  state: BoxState;
}
interface IAppState {
  array: SortItem[]
  text: string[]
  lastRun: string
  max: number;
}

const Box = ({ size, state, max }: IBoxProps) => {
  let bgColor;
  switch (state) {
    case BoxState.active:
      bgColor = "red"
      break;
    case BoxState.done:
      bgColor = "green"
      break;
  }
  return <div className='box' style={{
    marginTop: ((size-1) / (max-1)) +"%",
    backgroundColor: bgColor
  }}></div>
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = { array: [], text: ["bubble", "cocktail", "merge", "quick", "radix","gravity"], max: 50, lastRun: "" }
  }
  start = async (t: string) => {
    // TODO 
    // - odd-even
    // - gnome
    // - insertion
    // - comb
    // - shell
    // - selection
    // - double selection
    
    switch (t) {
      case "bubble":
        await this.doSort(() => bubble(generateInitialArray(50)), "bubble", 50)
        break;
      case "cocktail":
        await this.doSort(() => cocktailSort(generateInitialArray(50)), "cocktail", 50)
        break
      case "gravity":
        await this.doSort(() => gravity(generateInitialArray(100)), "gravity", 100)
        break
      // case "merge":
      //   await this.doSort(() => mergeSort([...array].slice(0, 500), 0, [...array].slice(0, 500).length - 1), "merge", 2)
      //   break
      // case "quick":
      //   await this.doSort(() => quick([...array].slice(0, 1000), 0, [...array].slice(0, 1000).length - 1), "quick", 1)
      //   break
      case "radix":
        await this.doSort(() => RadixSort256(generateInitialArray(1000, Math.pow(256,4))), "radix", Math.pow(256,4))
        break
    }

  }

  doSort = async (sortFunction: () => Promise<SortItem[][]>, sortName: string, max: number) => {
    const time: Date = new Date();
    this.setState({ max })
    let out = await sortFunction();
    this.appendText(`${sortName}: ${new Date().getTime() - time.getTime()}ms`);
    console.log(out.length)
    while (out.length > 0) {
      let a = out.shift()
      if (out.length === 0){
        let temp: SortItem[] = []
        a?.forEach(a => {
          temp.push({...a, state: BoxState.done})
        });
        a = [...temp]
      }
      await sleep(10)
      this.setState({ array: a ?? [] })
    }
  }

  appendText = (lastRun: string) => {

    let arr = this.state.text
    this.setState({ lastRun })
  }
  render = () => {
    return (
      <div className="app">
        <div className="display">{this.state.lastRun}</div>
        <div className='container'>
          {this.state.array.map((a, i) => <Box size={a.number} state={a.state} max={this.state.max} key={i}></Box>)}
        </div>
        <div className='control-bar'>
          <ul>{this.state.text.map(t => <li>{t}<button onClick={() => this.start(t)}>Start sort</button></li>)}</ul>
        </div>
      </div>
    );
  };
}


export default App;
