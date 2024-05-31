import { useEffect, useRef } from "react"
import { birds, draw, entities } from "./game/draw";
import { bird } from "./game/bird";
import { entity, vector2 } from "./misc/classes";



// Declare the global interface for WindowEventMap
declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent;
  }
}

export let CONTEXT : CanvasRenderingContext2D;

function App() :JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

    birds.push(new bird(true))
    birds[0].position.x = -10

    entities.push(new entity(new vector2(200, 0), new vector2(300, 300), "rectangle", "red"))


    // Handle key press event
  const handleUserKeyPress = (event: KeyboardEvent) => {
    const { key } = event;
   
      if(key == " "){
        birds.forEach((curBird)=> {
          if(curBird.player){
            curBird.jump()
          }
        })
      }

      if(key == "w"){
        birds[0].position.y -= 10
      }
      if(key == "a"){
        birds[0].position.x -= 10
      }
      if(key == "s"){
        birds[0].position.y += 10
      }
      if(key == "d"){
        birds[0].position.x += 10
      }
    
  };

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      CONTEXT = context

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
      window.addEventListener("keydown", handleUserKeyPress);

      // Cleanup function
      return () => {
          window.removeEventListener('resize', resizeCanvas);
          window.removeEventListener("keydown", handleUserKeyPress);
          cancelAnimationFrame(animationFrameId);
      };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default App
