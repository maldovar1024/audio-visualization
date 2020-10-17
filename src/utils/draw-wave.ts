import { Canvas } from './types';

const fillStyle = 'rgb(200, 200, 200)';
const strokeStyle = 'rgb(0, 0, 0)';
const lineWidth = 1;

export function resetWaveCanvas(
  ctx: CanvasRenderingContext2D,
  { width, height }: Canvas
) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
}

export function drawWave(
  ctx: CanvasRenderingContext2D,
  { width, height }: Canvas,
  dataBuffer: Uint8Array[]
) {
  const bufferLength = dataBuffer[0].length;
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;

  const sliceWidth = (width * 1.0) / (dataBuffer.length * bufferLength);
  let x = 0;

  ctx.beginPath();
  for (const data of dataBuffer) {
    for (let i = 0; i < bufferLength; i++) {
      const v = data[i] / 128.0;
      const y = (v * height) / 2;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += sliceWidth;
    }
  }

  ctx.lineTo(width, height / 2);
  ctx.stroke();
}
