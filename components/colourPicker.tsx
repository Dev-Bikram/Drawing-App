import React, { useState } from 'react';

type ColorPickerProps = {
  onCurrentColorChange?:(color:string)=>  void
}
const ColorPicker = (props:ColorPickerProps) => {

  

     const [currentColor, setCurrentColor] = useState<string>('#000000');

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value
    props?.onCurrentColorChange?.(newColor)
    setCurrentColor(newColor);
    
  };

  

    const colors = [
    '#000000', // Black
    '#FF0000', // Red
    '#00FF00', // Green
    '#0000FF', // Blue
    '#FFFF00', // Yellow
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFFFFF', // White
    '#FFA500', // Orange
    '#808080', // Gray
  ];

 return (
    <div>
      {colors.map((color, index) => (
        <input key={index} type="color" defaultValue={color} onChange={handleColorChange} />
      ))}
         
            <p>Selected Color: {currentColor}</p>
     </div>
    
  );

 
};

export default ColorPicker;

