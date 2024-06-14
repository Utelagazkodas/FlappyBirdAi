import { useEffect, useRef } from "react"
import { birds, draw, pipes } from "./game/draw";
import { bird } from "./game/bird";
import { pipe} from "./game/pipe";

// Declare the global interface for WindowEventMap
declare global {
  interface WindowEventMap {
    keydown: KeyboardEvent;
  }
}

export let CONTEXT: CanvasRenderingContext2D;
export let WINDOWWIDTH : number
export let WINDOWHEIGHT : number
export let CANVAS : HTMLCanvasElement
export let lastPipe : pipe
export const pipeDistance : number = 500

export function setLastPipe(pipe : pipe){
  lastPipe = pipe
}

function App(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  WINDOWWIDTH = window.innerWidth
  WINDOWHEIGHT = window.innerHeight

  birds.push(new bird(true))
  
  let pipeAmount: number = 10
  
  if(pipes.length == 0){
  for (let index = 0; index < pipeAmount; index++) {
    let t = new pipe((Math.random() - 0.5) * 400,  index * pipeDistance)
    pipes.push(t)
    lastPipe = t
  }}


  // Handle key press event
  const handleUserKeyPress = (event: KeyboardEvent) => {
    const { key } = event;

    if (key == " ") {
      birds.forEach((curBird) => { 
        if (curBird.player) {
          curBird.jump()
        }
      })
    }
    /* 
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
          } */

  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    CANVAS = canvas

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

  return <canvas ref={canvasRef}>Canvas is not supported on your device / browser</canvas>;
}

export default App
