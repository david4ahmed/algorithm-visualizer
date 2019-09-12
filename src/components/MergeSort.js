import React, { Component } from 'react'
import Canvas from './Canvas'


class MergeSort extends Component {

  constructor(props) {
    super(props);
    const { arr } = props;
    this.canvasRef = React.createRef();
    this.state = {
      arr,
    }
  }

  componentDidMount() {
    this.draw();
    if(this.props.animate) {
      this.animate();
    }
  }

  componentDidUpdate() {
    this.draw();
    if(this.props.animate) {
      this.animate();
    }
  }

  // passed as a prop to the Canvas component
  draw(color, color2) {
    const { arr } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.canvas.height = window.innerHeight / 1.3;
    ctx.canvas.width = window.innerWidth / 1.2;

    const width = ctx.canvas.width / arr.length;
    const margin = 3;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    for (let i = 0; i < arr.length; i++) {
      let height = arr[i];
      const maxHeight = ctx.canvas.height - 30;

      if (height > maxHeight) {
        arr[i] = maxHeight;
        height = arr[i];
      }

      if (i === color) {
        ctx.fillStyle = 'blue'
      }
      else if (i === color2) {
        ctx.fillStyle = 'red'
      }
      else if (color === 'done') {
        ctx.fillStyle = 'green'
      } else {
        ctx.fillStyle = 'grey'
      }

      ctx.fillRect(width * i + margin, ctx.canvas.height - height, width - 2 * margin, height);
    }
  }


  *sort() {
    const { arr } = this.props;
    const { length } = arr;
    let size;
    let start;

    for (size = 1; size <= length - 1; size *= 2) {
      for (start = 0; start < length - 1; start += 2 * size) {
        const mid = Math.min(start + size - 1, length - 1);
        const end = Math.min(start + 2 * size - 1, length - 1);
        let i; let j; let k;
        const l = mid - start + 1;
        const r = end - mid;
        const leftArr = [];
        const rightArr = [];

        for (i = 0; i < l; i++) {
          leftArr.push(arr[start + i]);
        }
        for (j = 0; j < r; j++) {
          rightArr.push(arr[mid + 1 + j]);
        }

        i = 0;
        j = 0;
        k = start;

        while (i < l && j < r) {
          if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            this.draw(k);
            yield;
            this.draw(-5, k + 1 - 1);
            yield;
            i++;
          } else {
            arr[k] = rightArr[j];
            this.draw(k);
            yield;
            this.draw(-5, k + j - 1);
            yield;
            j++;
          }
          k++;
        }

        while (i < l) {
          arr[k] = leftArr[i];
          this.draw(k);
          yield;
          this.draw(-5, k + i - 1);
          yield;
          i++;
          k++;
        }

        while (j < r) {
          arr[k] = rightArr[j];
          this.draw(k);
          yield;
          this.draw(-5, k + j - 1);
          yield;
          j++;
          k++;
        }

      }
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

    window.setTimeout(animationStep(), 1000 * fps);
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

export default MergeSort
