import { Canvas } from './types';

const fillStyle = '#101010';

export function resetFrequencyCanvas(
  ctx: CanvasRenderingContext2D,
  { width, height }: Canvas
) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, 0, width, height);
}

export function drawFrequencyHistogram(
  ctx: CanvasRenderingContext2D,
  { width, height }: Canvas,
  dataBuffer: Uint8Array
) {
  const bufferLength = dataBuffer.length;
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, 0, width, height);

  const barWidth = width / bufferLength;
  const heightRate = 0.5;

  let x = width / 2;
  for (let i = 0; i < bufferLength && x < width; i++) {
    const barHeight = dataBuffer[i];

    ctx.fillStyle = `rgb(50, ${barHeight + 100}, 50)`;
    ctx.fillRect(
      x,
      height - barHeight * heightRate,
      barWidth,
      barHeight * heightRate
    );

    x += barWidth + 1;
  }

  x = width / 2 - barWidth - 1;
  for (let i = 0; i < bufferLength && x > -barWidth; i++) {
    const barHeight = dataBuffer[i];

    ctx.fillStyle = `rgb(50, ${barHeight + 100}, 50)`;
    ctx.fillRect(
      x,
      height - barHeight * heightRate,
      barWidth,
      barHeight * heightRate
    );

    x -= barWidth + 1;
  }
}
