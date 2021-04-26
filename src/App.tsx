import React, { useEffect, useRef, useState } from "react";
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
  const resultCanvas = useRef<HTMLCanvasElement>(null);

  //exp
  const resultCanvasReal = useRef<HTMLCanvasElement>(null);
  const [imgDataReal, setImgDataReal] = useState<any>({});
  //exp

  //set image data in base64 format
  const [imgData, setImgData] = useState<any>({});

  //set default selected edit option
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  //set options for sidebar
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  //set current selected option index
  const selectedOption = options[selectedOptionIndex];

  function handleSliderChange(props: any) {
    setOptions((prevOptions) => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option;
        return { ...option, value: props.target.value };
      });
    });
    //exp
    // loadCanvas(imgDataReal.imgDataReal);
    //exp
  }

  //exp
  function handleSaveReal(isManual: any) {
    // console.log(isDownloading);
    // if(isDownloading) {

    if (isManual) {
      alert("it is");
      loadCanvas(imgData.imgData, isManual);
    } else {
      alert("it is not");
      loadCanvas(imgDataReal.imgDataReal, false);
    }

    // }

    console.log(`imgDataReal.imgDataReal`, imgDataReal.imgDataReal);
    // download_img(imgDataReal);
  }
  //exp

  function getImageStyle() {
    const filters = options.map((option) => {
      return `${option.property}(${option.value}${option.unit})`;
    });

    return { filter: filters.join(" ") };
    // return { filter: filters.join(" ") };
  }
  console.log(getImageStyle());

  // #04 fall into fileLoad function
  function loadFile(e: any) {
    // #05 assign our file to variable
    let file = e.target.files[0];

    //  #06 define FileReader
    let reader = new FileReader();

    reader.onloadend = function () {
      //  #08 when reader load - set data via useState hook
      setImgData({ imgData: reader.result });

      //exp
      // setImgDataReal({ imgDataReal: reader.result });
      //exp

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
    canvas.style.height = "100%";
    canvas.style.width = `100%`;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    //for tall images
    if (image.width / image.height < 1) {
      if (image.width / image.height > canvas.width / canvas.height) {
        alert("here");
        canvas.style.width = canvas.offsetWidth;
        canvas.style.height = `${
          (((image.height / image.width) * canvas.width) / canvas.height) * 100
        }%`;
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
  }

  //exp
  function fitToContainerReal(canvas: any, image: any) {
    // canvas.style.height = "100%";
    // canvas.style.width = `100%`;

    canvas.width = image.width;
    canvas.height = image.height;

    //for tall images
    // if (image.width / image.height < 1) {
    //   if (image.width / image.height > canvas.width / canvas.height) {
    //     alert("here");
    //     canvas.style.width = canvas.offsetWidth;
    //     canvas.style.height = `${ (((image.height / image.width) * canvas.width) / canvas.height) * 100}%`
    //   } else {
    //     canvas.style.width = `${
    //       ((canvas.height * (image.width / image.height)) / canvas.width) * 100
    //     }%`;
    //   }

    //   //for wide pictures
    // } else if (image.width / image.height > 1) {
    //   if (image.height / image.width > canvas.height / canvas.width) {
    //     canvas.style.height = canvas.offsetHeight;
    //     canvas.style.width = `${
    //       ((canvas.height * (image.width / image.height)) / canvas.width) * 100
    //     }%`;
    //   } else {
    //     canvas.style.height = `${
    //       (((image.height / image.width) * canvas.width) / canvas.height) * 100
    //     }%`;
    //   }
    // }
  }
  //exp

  // #11 fall into loadCanvas function
  function loadCanvas(imgData: any, isManual?: any) {
    // #12 define canvas and 2d context
    let canvas: any = resultCanvas.current;
    const context: any = canvas.getContext("2d");

    //exp
    //   let memorizedCanvasReal;
    //  let memorizedContextReal;

    alert(isManual);

    // if (isManual !== true) {
    let canvasReal: any = resultCanvasReal.current;
    let contextReal: any = canvasReal.getContext("2d");
    // }
    if (!isManual) {
      alert("not manual");
      setMemorizedCanvasReal(canvasReal);
      setMemorizedContextReal(contextReal);
    }
    if (isManual) {
      alert(" manual");
      canvasReal = memorizedCanvasReal;
      contextReal = memorizedContextReal;
    }
    //   if (isDownloading === false) {
    // alert('false');

    // let canvasReal: any = resultCanvasReal.current;
    // const contextReal: any = canvasReal.getContext("2d");
    //     setMemorizedCanvasReal(resultCanvasReal.current);
    //     setMemorizedContextReal(canvasReal.getContext("2d"));

    //   } else  {
    // alert('else');

    // let canvasReal= memorizedCanvasReal;
    // const   contextReal = memorizedContextReal;
    //   }
    //exp

    // resultCanvasReal.current.toDataURL("image/jpeg")

    // #13 set image to canvas
    let image = new Image();

    image.onload = function () {
      //exp
      contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
      contextReal.save();
      //missing fit
      fitToContainerReal(canvasReal, image);
      console.log(getImageStyle().filter);

      // contextReal.filter = "brightness(100%) contrast(100%) saturate(100%) grayscale(0%) sepia(0%) hue-rotate(0deg) blur(0px)";
      contextReal.filter = getImageStyle().filter;
      console.log(`before draw`);

      contextReal.drawImage(image, 0, 0, canvasReal.width, canvasReal.height);

      console.log(`after draw, before set`);

      setImgDataReal({ imgDataReal: canvasReal.toDataURL("image/jpeg") });
      // canvasReal.toDataURL("image/jpeg").href;

      if (isManual) {
        aReal.current.click();
      }

      console.log(`after set`);

      contextReal.restore();

      //exp

      context.clearRect(0, 0, canvas.width, canvas.height);
      let imgSize = {
        width: image.width,
        height: image.height,
      };
      // setImgData({ selection: imgSize });
      context.save();

      fitToContainerBefore(canvas, image);

      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      context.restore();

      // setImgData({ imgData: canvas.toDataURL("image/jpeg") });
      // setImgData({ isSelectDisabled: false });

      canvasReal.toDataURL("image/jpeg");

      // download_img( canvasReal.toDataURL("image/jpeg"));
      // return canvasReal.toDataURL("image/jpeg");
    };

    image.src = imgData;
    console.log(`after  all`);
    // return 2
  }

  // let download_img = function (el: any) {

  // alert("hi");
  // let promise = new Promise((resolve) => {
  //   resolve(loadCanvas(imgDataReal.imgDataReal));
  // });

  // let result = await promise; // будет ждать, пока промис не выполнится (*)

  // el.href = result;
  // alert(result); // "готово!"

  ////==-=-=-==-=-=-=
  // loadCanvas(imgDataReal.imgDataReal);

  // function after() {
  // console.log(el);
  // setTimeout(() => {

  //   el.href = imgDataReal.imgDataReal;
  // }, 1000);
  // }

  // after();

  // console.log(el);

  // return el.href = imgDataReal.imgDataReal;
  ////==-=-=-==-=-=-=

  // console.log(el);

  // el.href = imgDataReal.imgDataReal;

  // fetch(el.href)
  //   .then((res) => res.blob())
  //   .then((blob) => {
  //     const file = new File([blob], "File name", { type: "image/png" });
  //   });
  // };
  const aReal = useRef<any>(null);

  const [isDownloading, setIsDownloading] = useState(false);

  const [memorizedCanvasReal, setMemorizedCanvasReal] = useState<any>();
  const [memorizedContextReal, setMemorizedContextReal] = useState<any>();

  useEffect(() => {
    if (isDownloading === true) {
      // handleSaveReal();
      // aReal.current.click();
      setIsDownloading(false);
    }

    // download_img(imgDataReal);
    // alert("hey");
    // }, [isDownloading]);
  }, [imgDataReal.imgDataReal]);

  const [scale, setScale] = useState<any>(1);

  const [isImageOverflow, setIsImageOverflow] = useState<any>()
  
  
  
  function isOverflown(element:any) {
    console.log(element);
    console.log(`element.scrollHeight`, element.current.scrollHeight);
    console.log(`element.clientHeight`, element.current.clientHeight);
    console.log(`element.scrollWidth`, element.current.scrollWidth);
    console.log(`element.clientWidth`, element.current.clientWidth);
    
    // return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
    return element.current.scrollWidth > element.current.clientWidth;
  }

  const potentiallyOverflow = useRef<any>(null);

  // var els:any = potentiallyOverflow;
  
  // for (let i = 0; i < els.length; i++) {
  //   var el = els[i];
  //   el.style.borderColor = (isOverflown(el) ? 'red' : 'green');
  //   console.log("Element #" + i + " is " + (isOverflown(el) ? '' : 'not ') + "overflown.");
  // }
   
  useEffect(() => {
    setIsImageOverflow(isOverflown(potentiallyOverflow))
  
  }, [scale])
  
  return (
    <div className="container">
      {/* <MainScreen/> */}
      <div className="imageAndScalingContainer">
      {/* <div> */}
        <div ref={potentiallyOverflow} className="view" style={{justifyContent: `${ scale>1 && isImageOverflow ?  "flex-start": "center"}`, 
      }}>




          {/* <div
        className="viewImage"
          // style={{
          //   // width: "100%",
          //   // height: "200px",
          //   background: "green",
          //   overflow: "scroll",
          // }}
        > */}
          <img
            style={{ ...getImageStyle(), transform: `scale(${scale})`, transformOrigin: `${scale< 1? "center center" : scale>1 && isImageOverflow ? "top left" : "top center"}` }}
            // style={getImageStyle()}
            // className={"displayImage", {transform-origin: top left}}
            // style={{transform: scale(0.1)}}
            hidden={false}
            id="thePicture"
            src={imgData.imgData}
          />
          {/* </div> */}
        </div>
        <div className="buttonsContainer">
        <button
          onClick={() => {
            setIsDownloading(true);
            handleSaveReal(true);
          }}
        >
          SAVE ME
        </button>
        <button onClick={() => {setScale(scale + 0.1);
        // setIsImageOverflow(isOverflown(potentiallyOverflow))
        }}>+</button>
        <button onClick={() => setScale(scale - 0.1)}>-</button>
        <button onClick={() => setScale(0.5)}>50%</button>
        <button onClick={() => setScale(0.75)}>75%</button>
        <button onClick={() => setScale(1)}>reset scale</button>
        <button onClick={() => setScale(1.25)}>125%</button>
        <button onClick={() => setScale(1.5)}>150%</button>
        <button onClick={()=> alert(isOverflown(potentiallyOverflow))}>check</button>

        </div>
      </div>
      <div className="controller">
        <a
          hidden={true}
          ref={aReal}
          id="download"
          download="myImage.jpg"
          href={imgDataReal.imgDataReal}

          // onClick={() => download_img(imgDataReal)}
        >
          Download to myImage.jpg
        </a>
        {/* <button
          onClick={() => {
            setIsDownloading(true);
            handleSaveReal(true);
          }}
        >
          SAVE ME
        </button>
        <button onClick={() => setScale(scale + 0.1)}>+</button>
        <button onClick={() => setScale(scale - 0.1)}>-</button>
        <button onClick={() => setScale(0.5)}>50%</button>
        <button onClick={() => setScale(0.75)}>75%</button>
        <button onClick={() => setScale(1)}>reset scale</button>
        <button onClick={() => setScale(1.25)}>125%</button>
        <button onClick={() => setScale(1.5)}>150%</button> */}

        <div className="mainImage">
          {" "}
          <canvas
            hidden={true}
            className="canvas"
            ref={resultCanvas}
            style={getImageStyle()}
            width="0"
            height="0"
          ></canvas>
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
        <div>
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
        </div>
      </div>
      <canvas
        hidden={true}
        className="canvasReal"
        ref={resultCanvasReal}
        // style={getImageStyle()}
        // width="0"
        // height="0"
      ></canvas>
    </div>
  );
}

export default App;
//================================================================================

// import React, { useRef, useState } from "react";
// import "./App.css";
// import MainScreen from "./components/MainScreen/MainScreen";
// import Slider from "./components/Slider/Slider";
// import SidebarItem from "./components/SidebarItem/SidebarItem";

// type DefaultOptionsType = Array<OptionType>;

// type OptionType = {
//   name: string;
//   property: string;
//   value: number;
//   range: {
//     min: number;
//     max: number;
//   };
//   unit: string;
// };

// const DEFAULT_OPTIONS: DefaultOptionsType = [
//   {
//     name: "Brightness",
//     property: "brightness",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Contrast",
//     property: "contrast",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Saturation",
//     property: "saturate",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Grayscale",
//     property: "grayscale",
//     value: 0,
//     range: {
//       min: 0,
//       max: 100,
//     },
//     unit: "%",
//   },
//   {
//     name: "Sepia",
//     property: "sepia",
//     value: 0,
//     range: {
//       min: 0,
//       max: 100,
//     },
//     unit: "%",
//   },
//   {
//     name: "Hue rotate",
//     property: "hue-rotate",
//     value: 0,
//     range: {
//       min: 0,
//       max: 360,
//     },
//     unit: "deg",
//   },
//   {
//     name: "Blur",
//     property: "blur",
//     value: 0,
//     range: {
//       min: 0,
//       max: 20,
//     },
//     unit: "px",
//   },
// ];

// function App() {
//   // #10 define ref for canvas (and set in attributes in JSX)
//   const resultCanvas = useRef<HTMLCanvasElement>(null);

//   //exp
//   const resultCanvasReal = useRef<HTMLCanvasElement>(null);
//   const [imgDataReal, setImgDataReal] = useState<any>({});
//   //exp

//   //set image data in base64 format
//   const [imgData, setImgData] = useState<any>({});

//   //set default selected edit option
//   const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

//   //set options for sidebar
//   const [options, setOptions] = useState(DEFAULT_OPTIONS);

//   //set current selected option index
//   const selectedOption = options[selectedOptionIndex];

//   function handleSliderChange(props: any) {
//     setOptions((prevOptions) => {
//       return prevOptions.map((option, index) => {
//         if (index !== selectedOptionIndex) return option;
//         return { ...option, value: props.target.value };
//       });
//     });
//     //exp
//     // loadCanvas(imgDataReal.imgDataReal);
//     //exp
//   }

//   //exp
//   function handleSaveReal() {
//     loadCanvas(imgDataReal.imgDataReal);
//     console.log(`imgDataReal.imgDataReal`, imgDataReal.imgDataReal);
//     // download_img(imgDataReal);
//   }
//   //exp

//   function getImageStyle() {
//     const filters = options.map((option) => {
//       return `${option.property}(${option.value}${option.unit})`;
//     });

//     return { filter: filters.join(" ") };
//   }
//   console.log(getImageStyle());

//   // #04 fall into fileLoad function
//   function loadFile(e: any) {
//     // #05 assign our file to variable
//     let file = e.target.files[0];

//     //  #06 define FileReader
//     let reader = new FileReader();

//     reader.onloadend = function () {
//       //  #08 when reader load - set data via useState hook
//       setImgData({ imgData: reader.result });

//       //exp
//       // setImgDataReal({ imgDataReal: reader.result });
//       //exp

//       // #09 call the loadCanvas function and pass the reader result
//       loadCanvas(reader.result);
//     };

//     //  #07 if there is a file - call readAsData method
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }

//   // #12.1 define function to fit canvas to container
//   function fitToContainerBefore(canvas: any, image: any) {
//     canvas.style.height = "100%";
//     canvas.style.width = `100%`;

//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;

//     //for tall images
//     if (image.width / image.height < 1) {
//       if (image.width / image.height > canvas.width / canvas.height) {
//         alert("here");
//         canvas.style.width = canvas.offsetWidth;
//         canvas.style.height = `${
//           (((image.height / image.width) * canvas.width) / canvas.height) * 100
//         }%`;
//       } else {
//         canvas.style.width = `${
//           ((canvas.height * (image.width / image.height)) / canvas.width) * 100
//         }%`;
//       }

//       //for wide pictures
//     } else if (image.width / image.height > 1) {
//       if (image.height / image.width > canvas.height / canvas.width) {
//         canvas.style.height = canvas.offsetHeight;
//         canvas.style.width = `${
//           ((canvas.height * (image.width / image.height)) / canvas.width) * 100
//         }%`;
//       } else {
//         canvas.style.height = `${
//           (((image.height / image.width) * canvas.width) / canvas.height) * 100
//         }%`;
//       }
//     }
//   }

//   //exp
//   function fitToContainerReal(canvas: any, image: any) {
//     // canvas.style.height = "100%";
//     // canvas.style.width = `100%`;

//     canvas.width = image.width;
//     canvas.height = image.height;

//     //for tall images
//     // if (image.width / image.height < 1) {
//     //   if (image.width / image.height > canvas.width / canvas.height) {
//     //     alert("here");
//     //     canvas.style.width = canvas.offsetWidth;
//     //     canvas.style.height = `${ (((image.height / image.width) * canvas.width) / canvas.height) * 100}%`
//     //   } else {
//     //     canvas.style.width = `${
//     //       ((canvas.height * (image.width / image.height)) / canvas.width) * 100
//     //     }%`;
//     //   }

//     //   //for wide pictures
//     // } else if (image.width / image.height > 1) {
//     //   if (image.height / image.width > canvas.height / canvas.width) {
//     //     canvas.style.height = canvas.offsetHeight;
//     //     canvas.style.width = `${
//     //       ((canvas.height * (image.width / image.height)) / canvas.width) * 100
//     //     }%`;
//     //   } else {
//     //     canvas.style.height = `${
//     //       (((image.height / image.width) * canvas.width) / canvas.height) * 100
//     //     }%`;
//     //   }
//     // }
//   }
//   //exp

//   // #11 fall into loadCanvas function
//   function loadCanvas(imgData: any) {
//     // #12 define canvas and 2d context
//     let canvas: any = resultCanvas.current;
//     const context: any = canvas.getContext("2d");

//     //exp
//     let canvasReal: any = resultCanvasReal.current;
//     const contextReal: any = canvasReal.getContext("2d");
//     //exp

//     // resultCanvasReal.current.toDataURL("image/jpeg")

//     // #13 set image to canvas
//     let image = new Image();

//     image.onload = function () {
//       //exp
//       contextReal.clearRect(0, 0, canvasReal.width, canvasReal.height);
//       contextReal.save();
//       //missing fit
//       fitToContainerReal(canvasReal, image);
//       console.log(getImageStyle().filter);
//       contextReal.filter = getImageStyle().filter;

//       console.log(`before draw`);

//       contextReal.drawImage(image, 0, 0, canvasReal.width, canvasReal.height);

//       console.log(`after draw, before set`);

//       setImgDataReal({ imgDataReal: canvasReal.toDataURL("image/jpeg") });

//       console.log(`after set`);

//       contextReal.restore();

//       //exp

//       context.clearRect(0, 0, canvas.width, canvas.height);
//       let imgSize = {
//         width: image.width,
//         height: image.height,
//       };
//       // setImgData({ selection: imgSize });
//       context.save();

//       fitToContainerBefore(canvas, image);

//       context.drawImage(image, 0, 0, canvas.width, canvas.height);
//       context.restore();

//       // setImgData({ imgData: canvas.toDataURL("image/jpeg") });
//       // setImgData({ isSelectDisabled: false });
//     };
//     image.src = imgData;

//     console.log(`after  all`);
//     // return 2
//   }

//   let download_img = async function (el: any) {

//     let promise = new Promise((resolve) => {
//       resolve(loadCanvas(imgDataReal.imgDataReal));
//     });

//     let result = await promise; // будет ждать, пока промис не выполнится (*)

//     el.href = result;
//     // alert(result); // "готово!"

// ////==-=-=-==-=-=-=
// // loadCanvas(imgDataReal.imgDataReal);

// // console.log(el);

// // el.href = imgDataReal.imgDataReal;
// ////==-=-=-==-=-=-=

//     // console.log(el);

//     // el.href = imgDataReal.imgDataReal;

//     // fetch(el.href)
//     //   .then((res) => res.blob())
//     //   .then((blob) => {
//     //     const file = new File([blob], "File name", { type: "image/png" });
//     //   });
//   };

//   return (
//     <div className="container">
//       {/* <MainScreen/> */}
//       <img hidden={true} id="thePicture" src={imgData.imgData} />
//       <a
//         id="download"
//         download="myImage.jpg"
//         href={imgDataReal.imgDataReal}
//         onClick={() => download_img(imgDataReal)}
//       >
//         Download to myImage.jpg
//       </a>
//       <button onClick={handleSaveReal}>SAVE ME</button>
//       <div className="mainImage">
//         {" "}
//         <canvas
//           className="canvas"
//           ref={resultCanvas}
//           style={getImageStyle()}
//           width="0"
//           height="0"
//         ></canvas>
//       </div>
//       <div className="sidebar">
//         {options.map((option, index) => {
//           return (
//             <SidebarItem
//               key={index}
//               name={option.name}
//               active={index === selectedOptionIndex}
//               handleClick={() => setSelectedOptionIndex(index)}
//             />
//           );
//         })}
//         {/* <SidebarItem /> */}
//       </div>
//       <Slider
//         min={selectedOption.range.min}
//         max={selectedOption.range.max}
//         value={selectedOption.value}
//         handleChange={handleSliderChange}
//       />
//       <div>
//         {/* #02 Define input with file type */}
//         <div className="imageOption">
//           {/* #03 load file and call the loadFile function */}
//           <div className="fileInput">
//             <input
//               type="file"
//               id="fileBrowser"
//               onChange={loadFile}
//               style={{ display: "inline-block" }}
//               className="chooseFile"
//             />

//             <br />
//             <label htmlFor="fileBrowser">
//               {" "}
//               Upload Image <p className="fileName"></p>
//             </label>
//           </div>
//         </div>
//       </div>

//       <canvas
//         hidden={true}
//         className="canvasReal"
//         ref={resultCanvasReal}
//         // style={getImageStyle()}
//         // width="0"
//         // height="0"
//       ></canvas>
//     </div>
//   );
// }

// export default App;

//=-=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-==-=-=-=-=-=-=-=-=-=-=-=-=
// import React, { useRef, useState } from "react";
// import "./App.css";
// import MainScreen from "./components/MainScreen/MainScreen";
// import Slider from "./components/Slider/Slider";
// import SidebarItem from "./components/SidebarItem/SidebarItem";

// type DefaultOptionsType = Array<OptionType>;

// type OptionType = {
//   name: string;
//   property: string;
//   value: number;
//   range: {
//     min: number;
//     max: number;
//   };
//   unit: string;
// };

// const DEFAULT_OPTIONS: DefaultOptionsType = [
//   {
//     name: "Brightness",
//     property: "brightness",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Contrast",
//     property: "contrast",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Saturation",
//     property: "saturate",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Grayscale",
//     property: "grayscale",
//     value: 0,
//     range: {
//       min: 0,
//       max: 100,
//     },
//     unit: "%",
//   },
//   {
//     name: "Sepia",
//     property: "sepia",
//     value: 0,
//     range: {
//       min: 0,
//       max: 100,
//     },
//     unit: "%",
//   },
//   {
//     name: "Hue rotate",
//     property: "hue-rotate",
//     value: 0,
//     range: {
//       min: 0,
//       max: 360,
//     },
//     unit: "deg",
//   },
//   {
//     name: "Blur",
//     property: "blur",
//     value: 0,
//     range: {
//       min: 0,
//       max: 20,
//     },
//     unit: "px",
//   },
// ];

// function App() {
//   // #10 define ref for canvas (and set in attributes in JSX)
//   const resultCanvas = useRef<HTMLCanvasElement>(null);

//   //set image data in base64 format
//   const [imgData, setImgData] = useState<any>({});

//   //set default selected edit option
//   const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

//   //set options for sidebar
//   const [options, setOptions] = useState(DEFAULT_OPTIONS);

//   //set current selected option index
//   const selectedOption = options[selectedOptionIndex];

//   function handleSliderChange(props: any) {
//     setOptions((prevOptions) => {
//       return prevOptions.map((option, index) => {
//         if (index !== selectedOptionIndex) return option;
//         return { ...option, value: props.target.value };
//       });
//     });
//   }

//   function getImageStyle() {
//     const filters = options.map((option) => {
//       return `${option.property}(${option.value}${option.unit})`;
//     });

//     return { filter: filters.join(" ") };
//   }
//   console.log(getImageStyle());

//   // #04 fall into fileLoad function
//   function loadFile(e: any) {

//     // #05 assign our file to variable
//     let file = e.target.files[0];

//     //  #06 define FileReader
//     let reader = new FileReader();

//     reader.onloadend = function () {
//       //  #08 when reader load - set data via useState hook
//       setImgData({ imgData: reader.result });

//       // #09 call the loadCanvas function and pass the reader result
//       loadCanvas(reader.result);
//     };

//     //  #07 if there is a file - call readAsData method
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }

//   // #12.1 define function to fit canvas to container
//   function fitToContainerBefore(canvas: any, image: any) {

//     canvas.style.height = "100%";
//     canvas.style.width = `100%`;

//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;

//     //for tall images
//     if (image.width / image.height < 1) {
//       if (image.width / image.height > canvas.width / canvas.height) {
//         alert("here");
//         canvas.style.width = canvas.offsetWidth;
//         canvas.style.height = `${ (((image.height / image.width) * canvas.width) / canvas.height) * 100}%`
//       } else {
//         canvas.style.width = `${
//           ((canvas.height * (image.width / image.height)) / canvas.width) * 100
//         }%`;
//       }

//       //for wide pictures
//     } else if (image.width / image.height > 1) {
//       if (image.height / image.width > canvas.height / canvas.width) {
//         canvas.style.height = canvas.offsetHeight;
//         canvas.style.width = `${
//           ((canvas.height * (image.width / image.height)) / canvas.width) * 100
//         }%`;
//       } else {
//         canvas.style.height = `${
//           (((image.height / image.width) * canvas.width) / canvas.height) * 100
//         }%`;
//       }
//     }
//   }

//   // #11 fall into loadCanvas function
//   function loadCanvas(imgData: any) {

//     // #12 define canvas and 2d context
//     let canvas: any = resultCanvas.current;
//     const context: any = canvas.getContext("2d");

//     // #13 set image to canvas
//     let image = new Image();

//     image.onload = function () {

//       context.clearRect(0, 0, canvas.width, canvas.height);
//       let imgSize = {
//         width: image.width,
//         height: image.height,
//       };
//       // setImgData({ selection: imgSize });
//       context.save();

//       fitToContainerBefore(canvas, image);

//       context.drawImage(image, 0, 0, canvas.width, canvas.height)
//       context.restore();

//       // setImgData({ imgData: canvas.toDataURL("image/jpeg") });
//       // setImgData({ isSelectDisabled: false });
//     };
//     image.src = imgData;
//   }

//   let download_img = function (el: any) {
//     console.log(el);
//     // var image = canvas.toDataURL("image/jpg");
//     el.href = imgData.imgData;

//     fetch(el.href)
//   .then(res => res.blob())
//   .then(blob => {
//     const file = new File([blob], "File name",{ type: "image/png" })
//   })
//   };

//   return (
//     <div className="container">
//       {/* <MainScreen/> */}
//       <img hidden={true} id="thePicture"
//         src={imgData.imgData}/>
//       <a
//         id="download"
//         download="myImage.jpg"
//         href={imgData.imgData}
//         onClick={() => download_img(imgData)}
//       >
//         Download to myImage.jpg
//       </a>
//       <div className="mainImage">
//         {" "}
//         <canvas
//           className="canvas"
//           ref={resultCanvas}
//           style={getImageStyle()}
//           width="0"
//           height="0"
//         ></canvas>{" "}
//       </div>
//       <div className="sidebar">
//         {options.map((option, index) => {
//           return (
//             <SidebarItem
//               key={index}
//               name={option.name}
//               active={index === selectedOptionIndex}
//               handleClick={() => setSelectedOptionIndex(index)}
//             />
//           );
//         })}
//         {/* <SidebarItem /> */}
//       </div>
//       <Slider
//         min={selectedOption.range.min}
//         max={selectedOption.range.max}
//         value={selectedOption.value}
//         handleChange={handleSliderChange}
//       />
//       {/* <input type="file" id="fileBrowser" onChange={()=>alert("yes!")} style={{display: 'inline-block'}}/> */}
//       <div>
//         {/* #01 Define canvas      */}
//         {/* <canvas className="canvas" ref={resultCanvas} style={getImageStyle()} width="500" height="500"></canvas> */}
//         {/* <div  style={this.state.selectorVisibleStyle}>
//           <Selector imgData={this.state.imgData} imgSrc={this.state.imgSrc} img={this.state.canvas} setSelection={(pixels) => {this.setSelection(pixels)}} toggleSelector={(toggle) => {this.toggleSelector(toggle)}}/>
//         </div> */}

//         {/* <div className="editorOptions">*/}

//         {/* #02 Define input with file type */}
//         <div className="imageOption">
//           {/* #03 load file and call the loadFile function */}
//           <div className="fileInput">
//             <input
//               type="file"
//               id="fileBrowser"
//               onChange={loadFile}
//               style={{ display: "inline-block" }}
//               className="chooseFile"
//             />

//             <br />
//             <label htmlFor="fileBrowser">
//               {" "}
//               Upload Image <p className="fileName"></p>
//             </label>
//           </div>
//         </div>
//         {/* <div className="imageOption">
//             <label htmlFor="makeSelection"> Make Selection </label> <br/>
//             <button type="button" id="makeSelection" onClick={(toggle) => {this.toggleSelector(true)}} style={{display: 'inline-block'}} disabled={this.state.isSelectDisabled}>Select </button>
//           </div> */}

//         {/* <div className="imageOption">
//             <label htmlFor="crop"> Crop </label> <br/>
//             <button type="button" id="crop" onClick={() => {this.cropImg()}} style={{display: 'inline-block'}}  disabled={this.state.isToolsDisabled}> Crop </button>
//           </div> */}

//         {/* <div className="imageOption">
//             <label htmlFor="rotateTxt"> Rotate </label> <br/>
//             <input type="number" id="rotateTxt" ref="rotationTxt" onChange={this.onDegreeChange.bind(this)}  disabled={this.state.isToolsDisabled}/>
//             <button type="button" onClick={(degrees) => { this.rotate(20) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> Rotate </button>
//           </div> */}

//         {/* <div className="imageOption">
//             <label htmlFor="resize"> Resize </label> <br/>
//             <button type="button" id="resize" onClick={(percentage) => { this.resize(0.5) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> - </button>
//             <button type="button" onClick={(percentage) => { this.resize(1.5) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> + </button>
//           </div> */}

//         {/* <div className="imageOption">
//             <label htmlFor="download"> Download Image </label> <br/>
//             <a id="download" ref="downloadBtn" onClick={this.downloadImg.bind(this)} download="face.jpg" href={this.state.imgData}>  <button disabled={this.state.isSelectDisabled}> Download Image </button> </a>
//           </div>
//         </div> */}

//         {/* <div className="slider" style={{width: '250px'}}>
//           <h3 htmlFor="rotateSlider"> Rotate Angle </h3>
//           <Slider
//             min={-180}
//             max={180}
//             tooltip={false}
//             value={this.state.rotateSliderValue}
//             onChange={this.handleRotateSlider}
//           />
//           <div className='value'>{this.state.rotateSliderValue}</div>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default App;

//=========================================================================================
// import React, { useRef, useState } from "react";
// import "./App.css";
// import MainScreen from "./components/MainScreen/MainScreen";
// import Slider from "./components/Slider/Slider";
// import SidebarItem from "./components/SidebarItem/SidebarItem";

// type DefaultOptionsType = Array<OptionType>;

// type OptionType = {
//   name: string;
//   property: string;
//   value: number;
//   range: {
//     min: number;
//     max: number;
//   };
//   unit: string;
// };

// const DEFAULT_OPTIONS: DefaultOptionsType = [
//   {
//     name: "Brightness",
//     property: "brightness",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Contrast",
//     property: "contrast",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Saturation",
//     property: "saturate",
//     value: 100,
//     range: {
//       min: 0,
//       max: 200,
//     },
//     unit: "%",
//   },
//   {
//     name: "Grayscale",
//     property: "grayscale",
//     value: 0,
//     range: {
//       min: 0,
//       max: 100,
//     },
//     unit: "%",
//   },
//   {
//     name: "Sepia",
//     property: "sepia",
//     value: 0,
//     range: {
//       min: 0,
//       max: 100,
//     },
//     unit: "%",
//   },
//   {
//     name: "Hue rotate",
//     property: "hue-rotate",
//     value: 0,
//     range: {
//       min: 0,
//       max: 360,
//     },
//     unit: "deg",
//   },
//   {
//     name: "Blur",
//     property: "blur",
//     value: 0,
//     range: {
//       min: 0,
//       max: 20,
//     },
//     unit: "px",
//   },
// ];

// function App() {
//   // #10 define ref for canvas (and set in attributes in JSX)
//   // const resultCanvas = ususeRef
//   const resultCanvas = useRef<HTMLCanvasElement>(null);

//   const [imgData, setImgData] = useState<any>({});

//   //set default selected edit option
//   const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

//   //set options for sidebar
//   const [options, setOptions] = useState(DEFAULT_OPTIONS);

//   //set current selected option index
//   const selectedOption = options[selectedOptionIndex];

//   function handleSliderChange(props: any) {
//     //!!!!!!!!!!!!!!!!!!!!!!
//     setOptions((prevOptions) => {
//       return prevOptions.map((option, index) => {
//         if (index !== selectedOptionIndex) return option;
//         return { ...option, value: props.target.value };
//       });
//     });
//   }

//   function getImageStyle() {
//     const filters = options.map((option) => {
//       return `${option.property}(${option.value}${option.unit})`;
//     });

//     return { filter: filters.join(" ") };
//   }
//   console.log(getImageStyle());

//   // #04 fall into fileLoad function
//   function loadFile(e: any) {
//     //!!!!!!!!!!!!!!!!!!!!!!
//     // console.log(e)

//     // #05 assign our file to variable
//     let file = e.target.files[0];

//     //  #06 define FileReader
//     let reader = new FileReader();

//     reader.onloadend = function () {
//       //  #08 when reader load - set data via useState hook
//       setImgData({ imgData: reader.result });

//       // #09 call the loadCanvas function and pass the reader result
//       loadCanvas(reader.result);
//     };

//     //  #07 if there is a file - call readAsData method
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   }

//   // #12.1 define function to fit canvas to container
//   function fitToContainerBefore(canvas: any, image: any) {
//     // console.log(canvas, imageData); //!!!!!!!!!!!!!!!!!!!!
//     //  canvas.style.width=`${image.width/(image.height/canvas.height)*100}%`;
//     //  canvas.style.height=`${image.height/(image.height/canvas.height)*100}%`;

//     // console.log(`canvas.offsetWidth`, canvas.offsetWidth)
//     // console.log(`canvas.offsetHeight`, canvas.offsetHeight)
//     // console.log(`image.width/(image.height/canvas.height)*100`, image.width/(image.height/canvas.height)*100)
//     // console.log(`image.height/(image.height/canvas.height)`, image.height/(image.height/canvas.height))

//     // canvas.style.width=`${100}%`;
//     // canvas.width  = canvas.offsetHeight*image.width/image.height;
//     console.log(`image.width`, image.width);
//     console.log(`image.height`, image.height);
//     // console.log(`canvas.width`, canvas.width);
//     // console.log(`canvas.height`, canvas.height)

//     canvas.style.height = "100%";
//     canvas.style.width = `100%`;
//     // console.log(`canvas.offsetWidth`, canvas.offsetWidth)

//     console.log(`canvas.offsetWidth`, canvas.offsetWidth);
//     console.log(`canvas.offsetHeight`, canvas.offsetHeight);
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;

//     // console
//     // console.log(canvas.height*(image.width/image.height)/ canvas.width)
//     // canvas.style.height='100%';
//     console.log(
//       `(canvas.height*(image.height/image.width)/ canvas.width)`,
//       (canvas.height * (image.height / image.width)) / canvas.width
//     );

//     //for tall images

//     if (image.width / image.height < 1) {
//       if (image.width / image.height > canvas.width / canvas.height) {
//         alert("here");
//         canvas.style.width = canvas.offsetWidth;
//         canvas.style.height = `${ (((image.height / image.width) * canvas.width) / canvas.height) * 100}%`
//       } else {
//         canvas.style.width = `${
//           ((canvas.height * (image.width / image.height)) / canvas.width) * 100
//         }%`;
//       }

//       //for wide pictures
//     } else if (image.width / image.height > 1) {
//       if (image.height / image.width > canvas.height / canvas.width) {
//         canvas.style.height = canvas.offsetHeight;
//         canvas.style.width = `${
//           ((canvas.height * (image.width / image.height)) / canvas.width) * 100
//         }%`;
//       } else {
//         canvas.style.height = `${
//           (((image.height / image.width) * canvas.width) / canvas.height) * 100
//         }%`;
//       }
//     }
//   }

//   function fitToContainerAfter(canvas: any, imageData: any) {
//     console.log("here");
//     // console.log(canvas, imageData); //!!!!!!!!!!!!!!!!!!!!
//     //  canvas.style.width=imageData.width/(imageData.height/canvas.height);
//     //  canvas.style.height=imageData.height/(imageData.height/canvas.height);
//     canvas.style.width = "100%";
//     canvas.style.height = "100%";
//     canvas.width = canvas.offsetWidth;
//     canvas.height = canvas.offsetHeight;
//   }

//   // #11 fall into loadCanvas function
//   function loadCanvas(imgData: any) {

//     //!!!!!!!!!!!!!!!!!!!!!!
//     console.log("1");
//     // #12 define canvas and 2d context
//     let canvas: any = resultCanvas.current;
//     // console.log(canvas)
//     const context: any = canvas.getContext("2d");

//     // console.log(context)
//     // console.log(context)
//     // let _this = this;
//     console.log("2");

//     // fitToContainerAfter(canvas, null);
//     console.log("3");

//     // #13 set image to canvas
//     let image = new Image();
//     console.log("4");

//     image.onload = function () {
//       // #12.2 fit canvas to container
//       // console.log("here");
//       // fitToContainerAfter(canvas, image);
//       console.log("5");

//       context.clearRect(0, 0, canvas.width, canvas.height);
//       let imgSize = {
//         width: image.width,
//         height: image.height,
//       };
//       // setImgData({ selection: imgSize });
//       context.save();
//       console.log("6");
//       fitToContainerBefore(canvas, image);
//       //large pictures
//       // tall picture ( img, left padding, top padding, width, height)
//       {
//         image.height / image.width > canvas.height / canvas.width &&
//           context.drawImage(image, 0, 0, canvas.width, canvas.height);
//       }

//       // {image.height/image.width > canvas.height/canvas.width &&
//       // context.drawImage(image, canvas.width/2 - (image.width/(image.height/canvas.height)/2), 0, image.width/(image.height/canvas.height), image.height/(image.height/canvas.height))}
//       console.log("7");
//       // fitToContainerBefore(canvas, image);

//       // wide picture (img, left padding, top padding, width, height)
//       {
//         image.height / image.width < canvas.height / canvas.width &&
//           context.drawImage(image, 0, 0, canvas.width, canvas.height);
//       }
//       // {image.height/image.width < canvas.height/canvas.width &&
//       //   context.drawImage(image, 0, canvas.height/2 - (image.height/(image.width/canvas.width)/2), image.width/(image.width/canvas.width), image.height/(image.width/canvas.width))}

//       //square picture ;)

//       // context.drawImage(image, 0, 0, canvas.width, canvas.height);
//       context.restore();
//       console.log("8");

//       // setImgData({ imgData: canvas.toDataURL("image/jpeg") });
//       // setImgData({ isSelectDisabled: false });
//     };
//     image.src = imgData;
//   }

//   let download_img = function (el: any) {
//     console.log(el);
//     // var image = canvas.toDataURL("image/jpg");
//     el.href = imgData.imgData;

//     fetch(el.href)
//   .then(res => res.blob())
//   .then(blob => {
//     const file = new File([blob], "File name",{ type: "image/png" })
//   })
//   };

//   return (
//     <div className="container">
//       {/* <MainScreen/> */}
//       <img id="source"
//         src="https://mdn.mozillademos.org/files/5397/rhino.jpg"/>
//       <a
//         id="download"
//         download="myImage.jpg"
//         href={imgData.imgData}
//         onClick={() => download_img(imgData)}
//       >
//         Download to myImage.jpg
//       </a>
//       <div className="mainImage">
//         {" "}
//         <canvas
//           className="canvas"
//           ref={resultCanvas}
//           style={getImageStyle()}
//           width="0"
//           height="0"
//         ></canvas>{" "}
//       </div>
//       <div className="sidebar">
//         {options.map((option, index) => {
//           return (
//             <SidebarItem
//               key={index}
//               name={option.name}
//               active={index === selectedOptionIndex}
//               handleClick={() => setSelectedOptionIndex(index)}
//             />
//           );
//         })}
//         {/* <SidebarItem /> */}
//       </div>
//       <Slider
//         min={selectedOption.range.min}
//         max={selectedOption.range.max}
//         value={selectedOption.value}
//         handleChange={handleSliderChange}
//       />
//       {/* <input type="file" id="fileBrowser" onChange={()=>alert("yes!")} style={{display: 'inline-block'}}/> */}
//       <div>
//         {/* #01 Define canvas      */}
//         {/* <canvas className="canvas" ref={resultCanvas} style={getImageStyle()} width="500" height="500"></canvas> */}
//         {/* <div  style={this.state.selectorVisibleStyle}>
//           <Selector imgData={this.state.imgData} imgSrc={this.state.imgSrc} img={this.state.canvas} setSelection={(pixels) => {this.setSelection(pixels)}} toggleSelector={(toggle) => {this.toggleSelector(toggle)}}/>
//         </div> */}

//         {/* <div className="editorOptions">*/}

//         {/* #02 Define input with file type */}
//         <div className="imageOption">
//           {/* #03 load file and call the loadFile function */}
//           <div className="fileInput">
//             <input
//               type="file"
//               id="fileBrowser"
//               onChange={loadFile}
//               style={{ display: "inline-block" }}
//               className="chooseFile"
//             />

//             <br />
//             <label htmlFor="fileBrowser">
//               {" "}
//               Upload Image <p className="fileName"></p>
//             </label>
//           </div>
//         </div>
//         {/* <div className="imageOption">
//             <label htmlFor="makeSelection"> Make Selection </label> <br/>
//             <button type="button" id="makeSelection" onClick={(toggle) => {this.toggleSelector(true)}} style={{display: 'inline-block'}} disabled={this.state.isSelectDisabled}>Select </button>
//           </div> */}

//         {/* <div className="imageOption">
//             <label htmlFor="crop"> Crop </label> <br/>
//             <button type="button" id="crop" onClick={() => {this.cropImg()}} style={{display: 'inline-block'}}  disabled={this.state.isToolsDisabled}> Crop </button>
//           </div> */}

//         {/* <div className="imageOption">
//             <label htmlFor="rotateTxt"> Rotate </label> <br/>
//             <input type="number" id="rotateTxt" ref="rotationTxt" onChange={this.onDegreeChange.bind(this)}  disabled={this.state.isToolsDisabled}/>
//             <button type="button" onClick={(degrees) => { this.rotate(20) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> Rotate </button>
//           </div> */}

//         {/* <div className="imageOption">
//             <label htmlFor="resize"> Resize </label> <br/>
//             <button type="button" id="resize" onClick={(percentage) => { this.resize(0.5) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> - </button>
//             <button type="button" onClick={(percentage) => { this.resize(1.5) }} style={{ display: 'inline-block' }}  disabled={this.state.isToolsDisabled}> + </button>
//           </div> */}

//         {/* <div className="imageOption">
//             <label htmlFor="download"> Download Image </label> <br/>
//             <a id="download" ref="downloadBtn" onClick={this.downloadImg.bind(this)} download="face.jpg" href={this.state.imgData}>  <button disabled={this.state.isSelectDisabled}> Download Image </button> </a>
//           </div>
//         </div> */}

//         {/* <div className="slider" style={{width: '250px'}}>
//           <h3 htmlFor="rotateSlider"> Rotate Angle </h3>
//           <Slider
//             min={-180}
//             max={180}
//             tooltip={false}
//             value={this.state.rotateSliderValue}
//             onChange={this.handleRotateSlider}
//           />
//           <div className='value'>{this.state.rotateSliderValue}</div>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default App;
