'use client'
import { useRef, useEffect, forwardRef, useCallback } from 'react';

type DrawingCanvasProps = {

}
const DrawingCanvas = forwardRef<HTMLCanvasElement,DrawingCanvasProps>((_props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement|null>(null);
     
 
 
   useEffect(() => {
     let ctx: CanvasRenderingContext2D;
     const canvas = canvasRef.current;
     if (!canvas) return;
 
     ctx = canvas.getContext('2d')!;
     if (!ctx) return;
 
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
 
     ctx.strokeStyle = '#000000';
     ctx.lineCap = 'round';
     ctx.lineWidth = 5;
 
     let painting = false;
 
     const startPosition = (e: MouseEvent) => {
       painting = true;
       draw(e);
     };
 
     const endPosition = () => {
       painting = false;
       ctx.beginPath();
     };
 
     const draw = (e: MouseEvent) => {
       if (!painting) return;
 
       ctx.lineTo(e.clientX , e.clientY);
       ctx.stroke();
       ctx.beginPath();
       ctx.moveTo(e.clientX , e.clientY );
     };
 
     canvas.addEventListener('mousedown', startPosition);
     canvas.addEventListener('mouseup', endPosition);
     canvas.addEventListener('mousemove', draw);
 
     return () => {
       canvas.removeEventListener('mousedown', startPosition);
       canvas.removeEventListener('mouseup', endPosition);
       canvas.removeEventListener('mousemove', draw);
     };
   }, []);

   const mergeRefs = useCallback((r:HTMLCanvasElement)=>{
    canvasRef.current = r;
    if(typeof ref === "function"){
      ref(r);
    }
    if(ref && "current" in ref){
      ref.current = r
    }
  
   },[])
 
   return  <canvas ref={ mergeRefs} />;
 });

export default DrawingCanvas;



