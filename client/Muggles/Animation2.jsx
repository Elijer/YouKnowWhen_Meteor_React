import React from 'react';
import ReactDom from 'react-dom';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class Animation2 extends TrackerReact(React.Component) {

  componentDidMount(){
    var outputCanvas = document.getElementById('output2'), //final visible canvas
    output = outputCanvas.getContext('2d'),
    bufferCanvas = document.getElementById('buffer2'),
    buffer = bufferCanvas.getContext('2d'), //read pixels
    video = document.getElementById('video2'),
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


    /////////////////////////////////////////
    ///////////////////////////////////
    /////////////////////////
    ////////////////
    video.addEventListener('play', function() {
        clearInterval(interval);
        interval = setInterval(processFrame, 40);
    }, false);
  }

//'muted' indicator for video tag is CRUCIAL.
//Googlechrome will BLOCK AUTOPLAY without this tag.
//Or any attempts to do $(#videoID).play()
//Which is what I'm using, mostly just so it's apparent that I can call play() whenever I like, which is nice.
//Which lowkey, I approve of, even if I wasted wayyy too much time trying to figure this out.
  render(){
    return(
      <div className="offset4" ref = "canvas_output" id="canvas_output">
        <video ref = "animationTwoVideoRef" id = "video2" style = {{display: 'none'}} loop muted>
            <source src="Try_typing_Tall2.mp4" type='video/mp4' />
        </video>
        <canvas width="1280" height="2048" ref = "buffer2" id="buffer2" style = {{display: 'none'}}></canvas>
        <canvas width="1280" height="1024" ref = "output2" id="output2"></canvas>
      </div>
    )
  }
}
