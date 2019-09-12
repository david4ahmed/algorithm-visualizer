import React from 'react';
import './App.css';
import BubbleSort from './components/BubbleSort'
import InsertionSort from './components/InsertionSort'
import SelectionSort from './components/SelectionSort'
import MergeSort from './components/MergeSort'
import HeapSort from './components/HeapSort'
import Header from './components/Header'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arr: Array.from({ length: 50 }, () => Math.floor((Math.random() * (window.innerHeight / 1.3 - 30)) + 20)),
      value: 50,
      animate: false,
      render: 'Bubble'
    }
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
      arr: Array.from({ length: e.target.value }, () => Math.floor((Math.random() * (window.innerHeight / 1.3 - 30)) + 20)),
    });
  }

  onClick = () => {
    this.setState({
      arr: Array.from({ length: this.state.arr.length}, () => Math.floor((Math.random() * (window.innerHeight / 1.3 - 30)) + 20))
    });
  }

  toggleAnimation = () => {
    this.setState({
      animate: !this.state.animate,
    });
  }

  toggleRender = r => {
    this.setState({render: r});
  }

  render() {

    let sortAlgo;
    if(this.state.render === 'Bubble') {
      sortAlgo = <BubbleSort
          arr={this.state.arr}
          toggleAnimation={this.toggleAnimation}
          animate={this.state.animate}
      />
    }
     else if(this.state.render === 'Insertion') {
      sortAlgo = <InsertionSort
          arr={this.state.arr}
          toggleAnimation={this.toggleAnimation}
          animate={this.state.animate}
      />
    }
    else if(this.state.render === 'Selection') {
      sortAlgo = <SelectionSort
      arr={this.state.arr}
      toggleAnimation={this.toggleAnimation}
      animate={this.state.animate}
  />
    }
    else if(this.state.render === 'Merge') {
      sortAlgo = <MergeSort
      arr={this.state.arr}
      toggleAnimation={this.toggleAnimation}
      animate={this.state.animate}
  />
    }
    else if(this.state.render === 'Heap') {
      sortAlgo = <HeapSort
      arr={this.state.arr}
      toggleAnimation={this.toggleAnimation}
      animate={this.state.animate}
  />
    }

    return (

      <div>
      <Header
        animate={this.state.animate}
        toggleAnimation={this.toggleAnimation}
        onClick = {this.onClick}
        onChange={this.onChange}
        value={this.state.value}
        toggleRender={this.toggleRender}
        render={this.state.render}
      />
      {sortAlgo}
      {/* <BubbleSort
          arr={this.state.arr}
          toggleAnimation={this.toggleAnimation}
          animate={this.state.animate}
        /> */}
        {/* <InsertionSort 
          arr={arr}
        /> */}
        {/* <SelectionSort
          arr={arr}
        /> */}
        {/* <MergeSort
          arr={arr}
        /> */}
        {/* <HeapSort 
          arr={arr}
        /> */}
      </div>
    );
  }
}



export default App;
