import { useEffect, useRef } from "react"


function App() :JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      // Set canvas dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let animationFrameId: number;

      const draw = (context: CanvasRenderingContext2D, frameCount: number) => {
          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);

          // Example drawing: animate a rotating square
          context.fillStyle = 'red';
          context.save();
          context.translate(canvas.width / 2, canvas.height / 2);
          context.rotate((frameCount * 0.01) % (2 * Math.PI));
          context.fillRect(-50, -50, 100, 100);
          context.restore();
      };

      const render = (frameCount: number) => {
          draw(context, frameCount);
          animationFrameId = requestAnimationFrame(() => render(frameCount + 1));
      };

      render(0); // Start the animation loop

      // Resize the canvas on window resize
      const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          draw(context, 0); // Redraw after resizing
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
