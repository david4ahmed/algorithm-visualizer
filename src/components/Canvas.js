import React from 'react'

const Canvas = React.forwardRef((props, ref) => {

  const canvasStyle = {
    borderBottom: '1px solid black',
  }
  
  const canvasContainerStyle = {
    width: '100%',
    'textAlign': 'center',
  }


  return (
    <div style={canvasContainerStyle}>
      <canvas
        id="canvas"
        className="canvas" 
        style={canvasStyle}
        ref={ref}
      />
    </div>
  )
})

export default Canvas;