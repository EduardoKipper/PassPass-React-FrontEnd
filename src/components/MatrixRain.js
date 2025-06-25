import React, { useRef, useEffect } from 'react';

/**
 * Componente visual que implementa o efeito Matrix Rain (letras caindo estilo Matrix).
 * Utiliza canvas para renderização e animação dos caracteres.
 * Props:
 *   - width, height: dimensões do canvas
 *   - style: customização adicional de estilo
 *
 * O efeito é iniciado via useEffect e limpo ao desmontar o componente.
 * Ideal para painéis laterais ou fundos animados.
 */
const MatrixRain = ({ width = 300, height = 300, style = {} }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Inicializa contexto do canvas e variáveis de animação
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const fontSize = 18; // Tamanho da fonte dos caracteres
    const columns = Math.floor(width / fontSize); // Número de colunas de "chuva"
    const drops = Array(columns).fill(1); // Posição inicial de cada "gota"
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'; // Caracteres usados na animação
    let animationFrameId;

    /**
     * Função principal de desenho da animação.
     * - Preenche o fundo com leve opacidade para criar efeito de "rastro".
     * - Sorteia e desenha caracteres em cada coluna.
     * - Reinicia a "gota" aleatoriamente ao chegar no fim.
     */
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 32, 0.15)'; // Fundo semitransparente para efeito de rastro
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = '#00aaff'; // Cor dos caracteres

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicia "gota" ao chegar no fim, com probabilidade
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationFrameId = requestAnimationFrame(draw);
    }

    draw(); // Inicia animação
    // Limpa animação ao desmontar componente
    return () => cancelAnimationFrame(animationFrameId);
  }, [width, height]);

  // Canvas ocupa 100% do container, fundo transparente
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