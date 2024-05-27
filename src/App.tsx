import { useEffect, useRef } from "react"
import { birds, draw } from "./game/draw";
import { bird } from "./game/bird";
import { vector2 } from "./misc/classes";


function App() :JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

    birds.push(new bird())
    birds[1].velocity = new vector2(1, 1)

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      // Set canvas dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let animationFrameId: number;


      const render = (frameCount: number) => {
          draw(context, frameCount, canvas);
          animationFrameId = requestAnimationFrame(() => render(frameCount + 1));
      };

      render(0); // Start the animation loop

      // Resize the canvas on window resize
      const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
      };

      window.addEventListener('resize', resizeCanvas);

      // Cleanup function
      return () => {
          window.removeEventListener('resize', resizeCanvas);
          cancelAnimationFrame(animationFrameId);
      };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default App
