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
    var outputCanvas = document.getElementById('output'), //final visible canvas
    output = outputCanvas.getContext('2d'),
    bufferCanvas = document.getElementById('buffer'),
    buffer = bufferCanvas.getContext('2d'), //read pixels
    video = document.getElementById('video'),
    width = outputCanvas.width,
    height = outputCanvas.height,
    interval;

    function processFrame() {
   //grab video and throw it into canvas
    buffer.drawImage(video, 0, 0);
   //get RGB pixel data and Alpha value image data  from this canvas buffer
    var image = buffer.getImageData(0, 0, width, height),
        imageData = image.data,
        alphaData = buffer.getImageData(0, height, width, height).data;

  //apply new alpha value to each pixel
    var len = imageData.length;
    for (var i = 3; i < len; i += 4) {
        imageData[i] = alphaData[i - 1];
    }

    // put the result into the output canvas
    output.putImageData(image, 0, 0, 0, 0, width, height);
    };

    interval = setInterval(processFrame, 40);


// analyze each frame, get alpha data and apply it to canvas every 40ms
    video.addEventListener('play', function() {
        clearInterval(interval);
        interval = setInterval(processFrame, 40);
    }, false);
  }

  render(){
    return(
      <div className="offset3" ref = "canvas_output" id="canvas_output">
        <video id="video" style = {{display: 'none'}} autoPlay>
            <source src="Background_Tall_1.mp4" type='video/mp4' />
        </video>
        <canvas width="1280" height="2048" ref = "buffer" id="buffer" style = {{display: 'none'}}></canvas>
        <canvas width="1280" height="1024" ref = "output" id="output"></canvas>
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
