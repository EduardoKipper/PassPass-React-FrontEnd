import React, { useRef, useEffect } from 'react';

const MatrixRain = ({ width = 300, height = 300, style = {} }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontSize = 18;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    let animationFrameId;

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 32, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#00aaff';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: 'block', margin: '0 auto', background: 'transparent', width: '100%', height: '100%', ...style }}
    />
  );
};

export default MatrixRain;