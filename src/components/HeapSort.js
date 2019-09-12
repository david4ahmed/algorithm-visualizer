import React from 'react'
import Canvas from './Canvas'

class HeapSort extends React.Component {

  constructor(props){
    super(props);
    const { arr } = props;
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
      if(arr[i] > arr[Math.floor((i - 1)/2)]){
        let j = i;

        while(arr[j] > arr[Math.floor((j - 1)/2)]){
          const temp = arr[j];
          arr[j] = arr[Math.floor((j - 1)/2)];
          arr[Math.floor((j - 1)/2)] = temp;
          j = Math.floor((j - 1)/2);

          this.draw(i,j);
          yield;
        }
      }
    } 
    
    for(let i = arr.length - 1; i >= 0; i--){
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      this.draw(i);
      yield;

      let j = 0;
      let index = 2 * j + 1;

      while(index < i) {
        index = 2 * j + 1;
        if(index < (i-1) && arr[index] < arr[index + 1]){
          index++;
        }

        if(index < i && arr[j] < arr[index]){
          const temp2 = arr[j];
          arr[j] = arr[index];
          arr[index] = temp2;
        }

        this.draw(i,j);
        yield;

        j = index;
      }


    }

    this.props.toggleAnimation();
    this.draw('done');
  }

  animate() {
    const placeInSort = this.sort();
    const fps = 1000;

    const animationStep = () => {
      window.requestAnimationFrame(animationStep);
      
      placeInSort.next();
    }

    window.setTimeout(animationStep(), 1000/fps);
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


export default HeapSort




