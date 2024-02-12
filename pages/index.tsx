import { useCallback, useRef } from 'react';
import ColorPicker from '../components/colourPicker';
import DrawingCanvas from '../components/draingCanvas';
import BrushSizeSelector from '@/components/brushSize';
import EraserTool from '@/components/eraser';

const IndexPage = () => {
    const drawingCanvasRef = useRef<HTMLCanvasElement|null>(null);

    const onColourChange = useCallback((color:string)=>{
       const ctx = drawingCanvasRef?.current?.getContext("2d");
       if(!ctx||!color){
        return;
       } 

       ctx.strokeStyle = color
    },[])

  return (
      <div>
          
          <div>
              <ColorPicker onCurrentColorChange={onColourChange}/>
              <BrushSizeSelector />
              <EraserTool/>
          </div>
          <DrawingCanvas ref={drawingCanvasRef}/>
         
    </div>
  );
};

export default IndexPage;
