export function drawFrequencyHistogram(
  ctx: CanvasRenderingContext2D,
  canvas: {
    width: number;
    height: number;
  },
  dataBuffer: Uint8Array
) {
  const bufferLength = dataBuffer.length;
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const barWidth = (canvas.width / bufferLength) * 2.5;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataBuffer[i];

    ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

    x += barWidth + 1;
  }
}
