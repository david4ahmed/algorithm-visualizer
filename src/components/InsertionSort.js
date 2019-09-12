import React, { Component } from 'react'
import Canvas from './Canvas'


class InsertionSort extends Component {

  constructor(props){
    super(props);
    const { arr, animate } = props;
    this.canvasRef = React.createRef();
    this.state = {
      arr,
    }
  }

  componentDidMount(){
    this.draw();
    if(this.props.animate){
      this.animate();

    }
  }

  componentDidUpdate() {
    this.draw();
    if(this.props.animate){
      this.animate();

    }
}

  // passed as a prop to the Canvas component
  draw(color, color2) {
    const { arr } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.canvas.height = window.innerHeight/1.3;
    ctx.canvas.width = window.innerWidth/1.2;

    const width = ctx.canvas.width/arr.length;
    const margin = 3;
  
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
  
    for(let i = 0; i < arr.length; i++) {
      let height = arr[i];
      const maxHeight = ctx.canvas.height - 30;
  
      if(height > maxHeight) {
        arr[i] = maxHeight;
        height = arr[i];
      }
      
      if(i === color){
        ctx.fillStyle = 'blue'
      }
      else if(i === color2) {
        ctx.fillStyle = 'red'
      }
      else if(color === 'done') {
        ctx.fillStyle = 'green'
      } else {
        ctx.fillStyle = 'grey'
      }

      ctx.fillRect(width * i + margin, ctx.canvas.height - height, width - 2*margin, height);
    }
  }
    

  *sort() {
    const { arr } = this.props;
    for(let i = 1; i < arr.length; i++) {

      const elem = arr[i];
      let j = i - 1;

      while(j >= 0 && arr[j] > elem) {
        arr[j+1] = arr[j];
        j--;

        this.draw(j, i);
        yield arr;
      }

      arr[j+1] = elem;
      this.draw(i);
      yield arr;
    }
    this.props.toggleAnimation();
    this.draw('done');
  }

  animate() {
    const placeInSort = this.sort();
    const fps = 20000;

    const animationStep = () => {
      window.requestAnimationFrame(animationStep);
      
      placeInSort.next();
    }

    window.setTimeout(animationStep(), 1000*fps);
  }




  render() {

    const { arr } = this.state;

    return (
      <div>
        <Canvas
          arr={arr}
          ref={this.canvasRef}
        />
      </div>
    )
}
}

export default InsertionSort
