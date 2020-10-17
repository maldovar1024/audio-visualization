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

  const barWidth = (width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataBuffer[i];

    ctx.fillStyle = `rgb(50, ${barHeight + 100}, 50)`;
    ctx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1;
  }
}
