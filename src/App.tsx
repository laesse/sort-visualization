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

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));



interface IBoxProps {
  size: number
}
interface IAppState {
  array: number[]
  text: string[]
  delay: number
}

const Box = ({ size }: IBoxProps) => {
  return <div className='box' style={{ marginTop: size / 4294967 }}></div>
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = { array: [], text: [], delay: 1 }
  }
  initArray = () => {
    this.setState({ array: generateInitialArray(5000, 0, Math.pow(256, 4)) })
  }
  start = async (array: number[]) => {
    const setArray = async (array: number[]) => {
      this.setState({ array });
      await sleep(this.state.delay)
    };

    await this.doSort(() => bubble([...array].slice(0, 100), setArray), "bubble", 0)
    await this.doSort(() => cocktailSort([...array].slice(0, 100), setArray), "cocktail", 1)
    await this.doSort(() => mergeSort([...array].slice(0, 500), 0, [...array].slice(0, 500).length - 1, setArray), "merge", 2)
    await this.doSort(() => quick([...array].slice(0, 1000), 0, [...array].slice(0, 1000).length - 1, setArray), "quick", 1)
    await this.doSort(() => RadixSort256([...array].slice(0, 5000), [...array].slice(0, 5000).length, setArray), "radix", 0)
  }

  doSort = async (sortFunction: () => Promise<void>, sortName: string, delay: number) => {
    const time: Date = new Date();
    this.appendText(sortName, false, delay)
    await sortFunction();
    this.appendText(`${sortName}: ${new Date().getTime() - time.getTime()}ms`, true);
  }

  appendText = (textToAppend: string, shouldShift: boolean, delay: number = 1) => {

    let arr = this.state.text
    shouldShift && arr.shift()
    this.setState({ text: [textToAppend, ...arr], delay })
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
