import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Animation extends TrackerReact(React.Component) {

  constructor(){
    super();

    this.state = {
      phase: 'standby'
    }
  }

  componentDidMount(){
    var outputCanvas = this.refs.output,
    output = outputCanvas.getContext('2d'),
    bufferCanvas = this.refs.buffer,
    buffer = bufferCanvas.getContext('2d'),
    video = this.refs.video,
    width = outputCanvas.width,
    height = outputCanvas.height, interval;

    function processFrame() {
        buffer.drawImage(video, 0, 0);

            // this can be done without alphaData, except in Firefox which doesn't like it when image is bigger than the canvas
        var image = buffer.getImageData(0, 0, width, height),
        imageData = image.data,
        alphaData = buffer.getImageData(0, height, width, height).data;

        for (var i = 3, len = imageData.length; i < len; i = i + 4) {
        imageData[i] = alphaData[i-1];
        }

        output.putImageData(image, 0, 0, 0, 0, width, height);
        }
  }

  render(){
    return(
      <div className="offset3" ref = "canvas_output" id="canvas_output">
        <video id="video" style = {{display: 'none'}} autoPlay>
            <source src="Background_Tall_1.mp4" type='video/mp4' />
        </video>
        <canvas width="640" height="720" ref = "buffer" id="buffer"></canvas>
        <canvas width="640" height="360" ref = "output" id="output"></canvas>
      </div>
    )
  }

}

/*      <div className="offset3" ref = "canvas_output" id="canvas_output">
          <video id="video" style = {{display: 'none'}} autoPlay>
              <source src="Background_Tall_1.mp4" type='video/mp4; codecs="avc1.42E01E"' />
          </video>
          <canvas width="640" height="720" ref = "buffer" id="buffer"></canvas>
          <canvas width="640" height="360" ref = 'outpot' id="output"></canvas>
      </div> */
