import { useState, FunctionComponent } from "react";

export const Color: FunctionComponent<{}> = () => {
  const [color, setColor] = useState("");

  const generateColor = () => {
    setColor(
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    );
  };

  return (
    <>
      <div style={{ backgroundColor: color , height:'200px', width:'200px'}} onClick={generateColor}></div>
    </>
  );
};
