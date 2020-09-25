/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { cocktailSort, bubble } from './bubble'
import { mergeSort } from './merge'
import './App.css';
import { quick } from './quick';
import { RadixSort256 } from './radix';

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const generateInitialArray = (size: number, min: number, max: number) => {
  const out = []
  for (let i = 0; i < size; i++) {
    out.push(getRandomInt(min, max));
  }
  return out;
}
interface IBoxProps {
  size: number
}
type TimerIno = {
  date: Date
}
interface IAppState {
  array: number[]
  text: string[]
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));




const Box = ({ size }: IBoxProps) => {
  return <div className='box' style={{ marginTop: size/4294967 }}></div>
}
let time: Date;
const startTime = () => {
  time = new Date();
}
const endTime = ():number => new Date().getTime() - time.getTime() 

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state =  { array: [], text: []}
  }
  initArray = () => {
    this.setState({array: generateInitialArray(1000, 0, Math.pow(256,4))})
  }
  start = async (array: number[]) => {
    const setArray = (array: number[]) => this.setState({ array });

    await this.doSort(()=> bubble([...array], setArray), "bubble")
    await this.doSort(()=> cocktailSort([...array], setArray), "cocktail")
    await this.doSort(()=> mergeSort([...array], 0, array.length-1, setArray), "merge")
    await this.doSort(()=> quick([...array], 0, array.length-1, setArray), "quick")
    await this.doSort(()=> RadixSort256([...array], array.length, setArray), "radix")
  }

  doSort = async (sortFunction: () => Promise<void>, sortName: string) => {
    const time: Date = new Date();
    this.appendText(sortName, false)
    await sortFunction();
    this.appendText(`${sortName}: ${new Date().getTime() - time.getTime() }ms`, true);
  }

  appendText = (textToAppend: string, shouldShift: boolean) => {

    let arr = this.state.text
    shouldShift && arr.shift()
    this.setState({text:  [textToAppend,...arr]})
  }
  render = () => {
    // console.log(this.state.array)
    return (
      <div className="app">
        <div className='container'>
          {this.state.array.map((a, i) => <Box size={a} key={i}></Box>)}
        </div>
        <div className='control-bar'>
          <button onClick={() => this.start(this.state.array)}>Start sort</button>
          <button onClick={this.initArray}>Init Array</button>
          <ul>{this.state.text.map(t => <li>{t}</li>)}</ul>
        </div>
      </div>
    );
  };
}

export default App;
