import React, { useState , useRef} from 'react';



const EraserTool = () => {
  const [eraserSize, setEraserSize] = useState<number>(5); 
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [drawingHistory, setDrawingHistory] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  // const [isErasingMode, setIsErasingMode] = useState<boolean>(false); // Track eraser 
  
 

  const handleEraserSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    
    setEraserSize(newSize);
    };
    
    const startErasing = () => {
    setIsErasing(true);
  };

  const endErasing = () => {
    setIsErasing(false);
    };
    
  let ctx: CanvasRenderingContext2D;

  const erase = (e: MouseEvent) => {
    if (ctx && isErasing) {
      ctx.clearRect(e.clientX - eraserSize / 2, e.clientY - eraserSize / 2, eraserSize, eraserSize);
    }
  };

  

   const undo = () => {
    
    console.log("test undo",currentStep);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      ctx!.putImageData(drawingHistory[currentStep - 1], 0, 0);

      
    }
  };
 

  const redo = () => {
    console.log("test redo",currentStep);
    if (currentStep < drawingHistory.length - 1) {
      setCurrentStep(currentStep + 1);
      ctx!.putImageData(drawingHistory[currentStep + 1], 0, 0);
    }
  };

  

  return (
    <div>
      <label htmlFor="eraserSize">Eraser Size:</label>
      <select id="eraserSize" value={eraserSize} onChange={handleEraserSizeChange}>
        <option value={5}>Small</option>
        <option value={10}>Medium</option>
        <option value={15}>Large</option>
      </select>
      <button >Eraser</button>
     
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
};

export default EraserTool;

// import React, { useState, useEffect, useRef } from 'react';

// const EraserTool = () => {
//   const [eraserSize, setEraserSize] = useState<number>(5);
//   const [isErasing, setIsErasing] = useState<boolean>(false);
//   const [isErasingMode, setIsErasingMode] = useState<boolean>(false); // Track eraser mode
//   const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
//   const [currentStep, setCurrentStep] = useState<number>(-1);

//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const context = canvas.getContext('2d');
//       if (context) {
//         ctxRef.current = context;
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (ctxRef.current) {
//       ctxRef.current.lineWidth = eraserSize;
//       ctxRef.current.strokeStyle = '#ffffff'; // Set eraser color to white
//     }
//   }, [eraserSize]);

//   const handleEraserSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const newSize = parseInt(event.target.value);
//     setEraserSize(newSize);
//   };

//   const startErasing = () => {
//     setIsErasing(true);
//   };

//   const endErasing = () => {
//     setIsErasing(false);
//   };

//   const toggleEraserMode = () => {
//     setIsErasingMode((prevMode) => !prevMode);
//   };

//   const saveDrawingState = () => {
//     if (ctxRef.current) {
//       const drawingData = ctxRef.current.getImageData(0, 0, ctxRef.current.canvas.width, ctxRef.current.canvas.height);
//       setDrawingHistory((prevHistory) => [...prevHistory.slice(0, currentStep + 1), drawingData]);
//       setCurrentStep((prevStep) => prevStep + 1);
//     }
//   };

//   const undo = () => {
//     if (currentStep > 0) {
//       setCurrentStep((prevStep) => prevStep - 1);
//       if (ctxRef.current && drawingHistory[currentStep - 1]) {
//         ctxRef.current.putImageData(drawingHistory[currentStep - 1], 0, 0);
//       }
//     }
//   };

  

//   const redo = () => {
//     if (currentStep < drawingHistory.length - 1) {
//       setCurrentStep((prevStep) => prevStep + 1);
//       if (ctxRef.current && drawingHistory[currentStep + 1]) {
//         ctxRef.current.putImageData(drawingHistory[currentStep + 1], 0, 0);
//       }
//     }
//   };

//   const handleCanvasMouseDown = () => {
//     if (isErasingMode) {
//       saveDrawingState();
//     }
//   };

//   const erase = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
//     if (isErasingMode && ctxRef.current && isErasing) {
//       ctxRef.current.clearRect(e.nativeEvent.offsetX - eraserSize / 2, e.nativeEvent.offsetY - eraserSize / 2, eraserSize, eraserSize);
//     }
//   };

//   return (
//     <div>
//       <label htmlFor="eraserSize">Eraser Size:</label>
//       <select id="eraserSize" value={eraserSize} onChange={handleEraserSizeChange}>
//         <option value={5}>Small</option>
//         <option value={10}>Medium</option>
//         <option value={15}>Large</option>
//       </select>
//       <button onClick={toggleEraserMode}>{isErasingMode ? 'Disable Eraser Mode' : 'Enable Eraser Mode'}</button>
//       <canvas
//         ref={canvasRef}
//         onMouseDown={handleCanvasMouseDown}
//         onMouseMove={erase}
//         onMouseUp={endErasing}
//         onMouseOut={endErasing}
//         style={{ border: '1px solid black' }}
//       />
//       <button onClick={undo}>Undo</button>
//       <button onClick={redo}>Redo</button>
//     </div>
//   );
// };

// export default EraserTool;