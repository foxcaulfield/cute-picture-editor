import React, { useRef, useState } from "react";
import "./App.css";
import MainScreen from "./components/MainScreen/MainScreen";
import Slider from "./components/Slider/Slider";
import SidebarItem from "./components/SidebarItem/SidebarItem";

type DefaultOptionsType = Array<OptionType>;

type OptionType = {
  name: string;
  property: string;
  value: number;
  range: {
    min: number;
    max: number;
  };
  unit: string;
};

const DEFAULT_OPTIONS: DefaultOptionsType = [
  {
    name: "Brightness",
    property: "brightness",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Contrast",
    property: "contrast",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Saturation",
    property: "saturate",
    value: 100,
    range: {
      min: 0,
      max: 200,
    },
    unit: "%",
  },
  {
    name: "Grayscale",
    property: "grayscale",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Sepia",
    property: "sepia",
    value: 0,
    range: {
      min: 0,
      max: 100,
    },
    unit: "%",
  },
  {
    name: "Hue rotate",
    property: "hue-rotate",
    value: 0,
    range: {
      min: 0,
      max: 360,
    },
    unit: "deg",
  },
  {
    name: "Blur",
    property: "blur",
    value: 0,
    range: {
      min: 0,
      max: 20,
    },
    unit: "px",
  },
];

function App() {
  // #10 define ref for canvas (and set in attributes in JSX)
  // const resultCanvas = ususeRef
  const resultCanvas = useRef<HTMLCanvasElement>(null);

  const [imgData, setImgData] = useState({});

  //set default selected edit option
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  //set options for sidebar
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  //set current selected option index
  const selectedOption = options[selectedOptionIndex];

  function handleSliderChange(props: any) {
    //!!!!!!!!!!!!!!!!!!!!!!
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: props.target.value };
      });
    });
  }

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" ") };
  }
  console.log(getImageStyle());

  // #04 fall into fileLoad function
  function loadFile(e: any) {
    //!!!!!!!!!!!!!!!!!!!!!!
    // console.log(e)

    // #05 assign our file to variable
    let file = e.target.files[0];

    //  #06 define FileReader
    let reader = new FileReader();

    reader.onloadend = function () {
      //  #08 when reader load - set data via useState hook
      setImgData({ imgData: reader.result });

      // #09 call the loadCanvas function and pass the reader result
      loadCanvas(reader.result);
    };

    //  #07 if there is a file - call readAsData method
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  // #12.1 define function to fit canvas to container
  function fitToContainerBefore(canvas: any, image: any) {
    // console.log(canvas, imageData); //!!!!!!!!!!!!!!!!!!!!
    //  canvas.style.width=`${image.width/(image.height/canvas.height)*100}%`;
    //  canvas.style.height=`${image.height/(image.height/canvas.height)*100}%`;

    // console.log(`canvas.offsetWidth`, canvas.offsetWidth)
    // console.log(`canvas.offsetHeight`, canvas.offsetHeight)
    // console.log(`image.width/(image.height/canvas.height)*100`, image.width/(image.height/canvas.height)*100)
    // console.log(`image.height/(image.height/canvas.height)`, image.height/(image.height/canvas.height))

    // canvas.style.width=`${100}%`;
    // canvas.width  = canvas.offsetHeight*image.width/image.height;
    console.log(`image.width`, image.width);
    console.log(`image.height`, image.height);
    // console.log(`canvas.width`, canvas.width);
    // console.log(`canvas.height`, canvas.height)

    canvas.style.height = "100%";
    canvas.style.width = `100%`;
    // console.log(`canvas.offsetWidth`, canvas.offsetWidth)

    console.log(`canvas.offsetWidth`, canvas.offsetWidth);
    console.log(`canvas.offsetHeight`, canvas.offsetHeight);
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // console
    // console.log(canvas.height*(image.width/image.height)/ canvas.width)
    // canvas.style.height='100%';
    console.log(
      `(canvas.height*(image.height/image.width)/ canvas.width)`,
      (canvas.height * (image.height / image.width)) / canvas.width
    );

    //for tall images

    if (image.width / image.height < 1) {
      if (image.width / image.height > canvas.width / canvas.height) {
        alert("here");
        canvas.style.width = canvas.offsetWidth;
        canvas.style.height = `${ (((image.height / image.width) * canvas.width) / canvas.height) * 100}%`
      } else {
        canvas.style.width = `${
          ((canvas.height * (image.width / image.height)) / canvas.width) * 100
        }%`;
      }

      //for wide pictures
    } else if (image.width / image.height > 1) {
      if (image.height / image.width > canvas.height / canvas.width) {
        canvas.style.height = canvas.offsetHeight;
        canvas.style.width = `${
          ((canvas.height * (image.width / image.height)) / canvas.width) * 100
        }%`;
      } else {
        canvas.style.height = `${
          (((image.height / image.width) * canvas.width) / canvas.height) * 100
        }%`;
      }
    }
    // canvas.style.height='50%';
    // canvas.style.width=`50%`;
    // console.log(`canvas.offsetWidth`, canvas.offsetWidth)

    // canvas.style.width='100%';
    // canvas.style.height='100%';
    // canvas.width  = canvas.offsetWidth;
    // canvas.height = canvas.offsetHeight;
    // console.log(`canvas.offsetWidth`, canvas.offsetWidth)
    // console.log(`canvas.offsetHeight`, canvas.offsetHeight)
    // console.log(`image.width/image.height`, image.width/image.height)
  }

  function fitToContainerAfter(canvas: any, imageData: any) {
    console.log("here");
    // console.log(canvas, imageData); //!!!!!!!!!!!!!!!!!!!!
    //  canvas.style.width=imageData.width/(imageData.height/canvas.height);
    //  canvas.style.height=imageData.height/(imageData.height/canvas.height);
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  // #11 fall into loadCanvas function
  function loadCanvas(imgData: any) {
    //!!!!!!!!!!!!!!!!!!!!!!
    console.log("1");
    // #12 define canvas and 2d context
    let canvas: any = resultCanvas.current;
    // console.log(canvas)
    const context: any = canvas.getContext("2d");
    // console.log(context)
    // console.log(context)
    // let _this = this;
    console.log("2");

    // fitToContainerAfter(canvas, null);
    console.log("3");

    // #13 set image to canvas
    let image = new Image();
    console.log("4");

    image.onload = function () {
      // #12.2 fit canvas to container
      // console.log("here");
      // fitToContainerAfter(canvas, image);
      console.log("5");

      context.clearRect(0, 0, canvas.width, canvas.height);
      let imgSize = {
        width: image.width,
        height: image.height,
      };
      setImgData({ selection: imgSize });
      context.save();
      console.log("6");
      fitToContainerBefore(canvas, image);
      //large pictures
      // tall picture ( img, left padding, top padding, width, height)
      {
        image.height / image.width > canvas.height / canvas.width &&
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }

      // {image.height/image.width > canvas.height/canvas.width &&
      // context.drawImage(image, canvas.width/2 - (image.width/(image.height/canvas.height)/2), 0, image.width/(image.height/canvas.height), image.height/(image.height/canvas.height))}
      console.log("7");
      // fitToContainerBefore(canvas, image);

      // wide picture (img, left padding, top padding, width, height)
      {
        image.height / image.width < canvas.height / canvas.width &&
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
      // {image.height/image.width < canvas.height/canvas.width &&
      //   context.drawImage(image, 0, canvas.height/2 - (image.height/(image.width/canvas.width)/2), image.width/(image.width/canvas.width), image.height/(image.width/canvas.width))}

      //square picture ;)

      // context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.restore();
      console.log("8");

      setImgData({ imgData: canvas.toDataURL("image/jpeg") });
      setImgData({ isSelectDisabled: false });
    };
    image.src = imgData;
  }

  let download_img = function (el: any) {
    console.log(el);
    // var image = canvas.toDataURL("image/jpg");
    el.href = imgData;
  };

  return (
    <div className="container">
      {/* <MainScreen/> */}
      <a
        id="download"
        download="myImage.jpg"
        onClick={() => download_img(imgData)}
      >
        Download to myImage.jpg
      </a>
      <div className="mainImage">
        {" "}
        <canvas
          className="canvas"
          ref={resultCanvas}
          style={getImageStyle()}
          width="0"
          height="0"
        ></canvas>{" "}
      </div>
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          );
        })}
        {/* <SidebarItem /> */}
      </div>
      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />
      {/* <input type="file" id="fileBrowser" onChange={()=>alert("yes!")} style={{display: 'inline-block'}}/> */}
      <div>
        {/* #01 Define canvas      */}
        {/* <canvas className="canvas" ref={resultCanvas} style={getImageStyle()} width="500" height="500"></canvas> */}
        {/* <div  style={this.state.selectorVisibleStyle}>
          <Selector imgData={this.state.imgData} imgSrc={this.state.imgSrc} img={this.state.canvas} setSelection={(pixels) => {this.setSelection(pixels)}} toggleSelector={(toggle) => {this.toggleSelector(toggle)}}/>
        </div> */}

        {/* <div className="editorOptions">*/}

        {/* #02 Define input with file type */}
        <div className="imageOption">
          {/* #03 load file and call the loadFile function */}
          <div className="fileInput">
            <input
              type="file"
              id="fileBrowser"
              onChange={loadFile}
              style={{ display: "inline-block" }}
              className="chooseFile"
            />

            <br />
            <label htmlFor="fileBrowser">
              {" "}
              Upload Image <p className="fileName"></p>
            </label>
          </div>
        </div>
        {/* <div className="imageOption">
            <label htmlFor="makeSelection"> Make Selection </label> <br/>
            <button type="button" id="makeSelection" onClick={(toggle) => {this.toggleSelector(true)}} style={{display: 'inline-block'}} disabled={this.state.isSelectDisabled}>Select </button> 
          </div> */}

        {/* <div className="imageOption">
            <label htmlFor="crop"> Crop </label> <br/>
            <button type="button" id="crop" onClick={() => {this.cropImg()}} style={{display: 'inline-block'}}  disabled={this.state.isToolsDisabled}> Crop </button>
          </div> */}

        {/* <div className="imageOption">
            <label htmlFor="rotateTxt"> Rotate </label> <br/>
            <input type="number" id="rotateTxt" ref="rotationTxt" onChange={this.onDegreeChange.bind(this)}  disabled={this.state.isToolsDisabled}/>
            <button type="button" onClick={(degrees) => { this.rotate(20) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> Rotate </button>
          </div> */}

        {/* <div className="imageOption">
            <label htmlFor="resize"> Resize </label> <br/>
            <button type="button" id="resize" onClick={(percentage) => { this.resize(0.5) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> - </button>
            <button type="button" onClick={(percentage) => { this.resize(1.5) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> + </button>
          </div> */}

        {/* <div className="imageOption">
            <label htmlFor="download"> Download Image </label> <br/>
            <a id="download" ref="downloadBtn" onClick={this.downloadImg.bind(this)} download="face.jpg" href={this.state.imgData}>  <button disabled={this.state.isSelectDisabled}> Download Image </button> </a>
          </div>
        </div> */}

        {/* <div className="slider" style={{width: '250px'}}>
          <h3 htmlFor="rotateSlider"> Rotate Angle </h3>
          <Slider
            min={-180}
            max={180}
            tooltip={false}
            value={this.state.rotateSliderValue}
            onChange={this.handleRotateSlider}
          />
          <div className='value'>{this.state.rotateSliderValue}</div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
