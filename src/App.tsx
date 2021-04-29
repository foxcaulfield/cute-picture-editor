import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import MainScreen from "./components/MainScreen/MainScreen";
import Slider from "./components/Slider/Slider";
import SidebarItem from "./components/SidebarItem/SidebarItem";
import { Button, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";

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

type ImgDataRealType = {
  imgDataReal: string | undefined;
};

type ImgDataType = {
  imgData: any
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

// type SetOptionsType = Array<DefaultOptionsType>;

function App() {
  // #10 define ref for canvas (and set in attributes in JSX)
  const resultCanvasReal = useRef<HTMLCanvasElement>(null);
  const [imgDataReal, setImgDataReal] = useState<ImgDataRealType>({
    imgDataReal: undefined,
  });

  //set image data in base64 format
  const [imgData, setImgData] = useState<ImgDataType>({ imgData: undefined});

  //set default selected edit option
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  //set options for sidebar
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  //set current selected option index
  const selectedOption = options[selectedOptionIndex];

  //handle slider change
  function handleSliderChange(props: any) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: props.target.value };
      });
    });
  }

  function handleResetOptions() {
    setOptions(DEFAULT_OPTIONS);
  }

  //handle save image from canvas(real)
  function handleSaveReal(isManual: any) {
    //manual trigger check
    if (isManual) {
      loadCanvas(imgData.imgData, isManual);
    } else {
      loadCanvas(imgDataReal.imgDataReal, false);
    }
  }

  //get current style
  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });
    return { filter: filters.join(" ") };
  }

  // #04 fall into fileLoad function
  function loadFile(e: any) {
    // #05 assign our file to variable
    let file = e.target.files[0];

    //  #06 define FileReader
    let reader = new FileReader();

    reader.onloadend = function () {
      //reset options to defaut
      handleResetOptions();

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

  function fitToContainerReal(canvas: any, image: any) {
    canvas.width = image.width;
    canvas.height = image.height;
  }

  // #11 fall into loadCanvas function
  function loadCanvas(imgData: any, isManual?: any) {
    // #12 define canvas and 2d context
    let canvasReal: any = resultCanvasReal.current;
    let contextReal: any = canvasReal.getContext("2d");

    //check for manual trigger, if false - set "initial" canvas(image) state
    if (!isManual) {
      setMemorizedCanvasReal(canvasReal);
      setMemorizedContextReal(contextReal);
    }
    if (isManual) {
      canvasReal = memorizedCanvasReal;
      contextReal = memorizedContextReal;
    }

    // #13 set image to canvas
    let image = new Image();

    image.onload = function () {
      contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
      contextReal.save();

      fitToContainerReal(canvasReal, image);

      contextReal.filter = getImageStyle().filter;

      contextReal.drawImage(image, 0, 0, canvasReal.width, canvasReal.height);

      //exp for wide images
      setIsImageOverflowHorizontal(isOverflowHorizontal(potentiallyOverflow));

      setImgDataReal({ imgDataReal: canvasReal.toDataURL("image/jpeg") });
      // canvasReal.toDataURL("image/jpeg").href;

      //"save" option
      if (isManual) {
        aReal.current.click();
      }

      contextReal.restore();

      canvasReal.toDataURL("image/jpeg");
    };

    image.src = imgData;
  }

  //ref for anchor
  const aReal = useRef<any>(null);

  //is picture downloading now
  const [isDownloading, setIsDownloading] = useState(false);

  //"initial" state for canvas and context
  const [memorizedCanvasReal, setMemorizedCanvasReal] = useState<any>();
  const [memorizedContextReal, setMemorizedContextReal] = useState<any>();

  //set isDowloading to false for next render
  useEffect(() => {
    if (isDownloading === true) {
      setIsDownloading(false);
    }
  }, [imgDataReal.imgDataReal]);

  //current scale
  const [scale, setScale] = useState<any>(1);

  //is picture overflow horizontal
  const [
    isImageOverflowHorizontal,
    setIsImageOverflowHorizontal,
  ] = useState<any>();

  //function for detecting overflow horizontal
  function isOverflowHorizontal(element: any) {
    return element.current.scrollWidth > element.current.clientWidth;
  }

  //is picture overflow horizontal
  const [isImageOverflowVertical, setIsImageOverflowVertical] = useState<any>();

  //function for detecting overflow vertical
  function isOverflowVertical(element: any) {
    return element.current.scrollHeight > element.current.clientHeight;
  }

  //ref for div tht contains image
  const potentiallyOverflow = useRef<any>(null);

  //set actual isOverflowHorizontal value when scale is changing
  useEffect(() => {
    setIsImageOverflowHorizontal(isOverflowHorizontal(potentiallyOverflow));
    setIsImageOverflowVertical(isOverflowVertical(potentiallyOverflow));
  }, [scale, imgData]);

  return (
    <div className="container">
      {/* <MainScreen/> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          background: "white",
          alignItems: "center",
          padding: "0.5em",
        }}
      >
        <Button
          variant="contained"
          size="large"
          className="gradientButton"
          startIcon={<SaveIcon />}
          onClick={() => {
            setIsDownloading(true);
            handleSaveReal(true);
          }}
        >
          Save
        </Button>

        <div className="headerName">Cute picture editor</div>

        <input
          type="file"
          id="fileBrowser"
          onChange={loadFile}
          hidden={true}
          onClick={(e) => (e.currentTarget.value = "")}
        />

        <label
          htmlFor="fileBrowser"
          style={{ display: "block", cursor: "pointer" }}
        >
          {/* Open Image  */}
          <Button
            variant="contained"
            style={{ pointerEvents: "none" }}
            size="large"
            className="gradientButtonUpload"
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </label>
      </div>
      <div className="imageAndScalingContainer">
        <div
          ref={potentiallyOverflow}
          className="view"
          style={{
            justifyContent: `${
              isImageOverflowHorizontal === false &&
              isImageOverflowVertical === false
                ? "center"
                : isImageOverflowHorizontal === false &&
                  isImageOverflowVertical === true
                ? "center"
                : "flex-start"
            }`,
          }}
        >
          <img
            style={{
              ...getImageStyle(),
              // maxWidth:"100%",
              transform: `scale(${scale})`,
              transformOrigin: `${
                isImageOverflowHorizontal === false &&
                isImageOverflowVertical === false
                  ? "center center"
                  : isImageOverflowHorizontal === false &&
                    isImageOverflowVertical === true
                  ? "top center"
                  : isImageOverflowHorizontal === true &&
                    isImageOverflowVertical === false
                  ? "left"
                  : "top left"
              }`,
            }}
            hidden={false}
            id="thePicture"
            src={imgData.imgData}
          />
        </div>
      </div>
      <div className="controller">
        <a
          hidden={true}
          ref={aReal}
          id="download"
          download="myImage.jpg"
          href={imgDataReal.imgDataReal}
        >
          Download to myImage.jpg
        </a>
        <div className="mainImage"></div>
        <div className="buttonsContainer">
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <Icon>add_circle</Icon> */}
            <IconButton size="small">
              <ZoomOutIcon onClick={() => setScale(scale * 0.9)} />
            </IconButton>

            <input
              type="range"
              min="0.1"
              max="2"
              value={scale}
              step="0.01"
              onChange={(e) => {
                console.log(e.target.value);
                setScale(e.target.value);
              }}
            />
            <IconButton size="small">
              <ZoomInIcon
                onClick={() => {
                  setScale(scale * 1.1);
                }}
              />
            </IconButton>
          </div>
          <div></div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "100%" }}>
            <Slider
              min={selectedOption.range.min}
              max={selectedOption.range.max}
              value={selectedOption.value}
              handleChange={handleSliderChange}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              background: "white",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => setScale(1)}
              style={{
                letterSpacing: "0.1em",
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              reset scale
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => handleResetOptions()}
              style={{
                letterSpacing: "0.1em",
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              reset options
            </Button>
          </div>
        </div>
        <div>{/* #02 Define input with file type */}</div>
      </div>
      <canvas
        hidden={true}
        className="canvasReal"
        ref={resultCanvasReal}
      ></canvas>
    </div>
  );
}

export default App;
