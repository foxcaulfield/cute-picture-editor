import React from "react";

function Slider(props:any) { //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  return (
    <div className="sliderContainer">
      Slider
      <input type="range" className="slider" min={props.min} max={props.max} value={props.value} onChange={props.handleChange}></input>
    </div>
  );
}

export default Slider;
