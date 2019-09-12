import React, { Component } from 'react'

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      style: {
        color: 'black'
      },
    }
  }

  changeColor = () => {
    return {
      outline: 'none',
      color: this.props.animate ? 'black' : 'white',
      backgroundColor: this.props.animate ? 'red' : 'transparent',
      border: this.props.animate ? '1px solid red' : '1px solid white'
    }
  }

  
  changeColorBegin = () => {
    return {
      outline: 'none',
      color: this.props.animate ? 'black' : 'white',
      backgroundColor: this.props.animate ? 'red' : '#73B1B7',
      border: this.props.animate ? '1px solid red' : '1px solid white'
    }
  }

  render() {

    // const {value} = this.state;

    const selection = {
      color: 'white',
      border: '1px solid black',
      backgroundColor: 'black',
      padding: '.6rem',
      borderRadius: '.3rem'
    }

    return (
      <nav className="nav">
        <button
          className='button'
          onClick={() => {
            this.props.onClick()}}
          disabled={this.props.animate}
          style={this.changeColor()}
        >
          Generate a new array
        </button>
        <input 
          type="range"
          id="range"
          className="range"
          min="10"
          max="150"
          value={this.props.value}
          onChange={(e) => {this.props.onChange(e)}}
          disabled={this.props.animate}
        />
        <button
          className='button'
          style={this.changeColor()}
          onClick={() => {this.props.toggleRender('Bubble')}}
          disabled={this.props.animate}
        >
          BubbleSort
        </button>
        <button
          className='button'
          style={this.changeColor()}
          onClick={() => {this.props.toggleRender('Insertion')}}
          disabled={this.props.animate}
        >
          InsertionSort
        </button>
        <button
          className='button'
          style={this.changeColor()}
          onClick={() => {this.props.toggleRender('Selection')}}
          disabled={this.props.animate}
        >
          SelectionSort
        </button>
        <button
          className='button'
          style={this.changeColor()}
          onClick={() => {this.props.toggleRender('Merge')}}
          disabled={this.props.animate}
        >
          MergeSort
        </button>
        <button
          className='button'
          style={this.changeColor()}
          onClick={() => {this.props.toggleRender('Heap')}}
          disabled={this.props.animate}
        >
          HeapSort
        </button>
        <button
          className='button'
          id='begin'
          onClick={() => {this.props.toggleAnimation()}}
          disabled={this.props.animate}
          style={this.changeColorBegin()}
        >
          Begin
        </button>
        <p style={selection}>
          Selection: {`${this.props.render} Sort`}
        </p>
      </nav>
    )
  }
}

export default Header
