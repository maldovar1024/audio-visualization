export function drawWave(
  ctx: CanvasRenderingContext2D,
  canvas: { width: number; height: number },
  dataBuffer: Uint8Array[]
) {
  const bufferLength = dataBuffer[0].length;
  ctx.fillStyle = 'rgb(200, 200, 200)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgb(0, 0, 0)';

  const sliceWidth = (canvas.width * 1.0) / (dataBuffer.length * bufferLength);
  let x = 0;

  ctx.beginPath();
  for (const data of dataBuffer) {
    for (let i = 0; i < bufferLength; i++) {
      const v = data[i] / 128.0;
      const y = (v * canvas.height) / 2;

      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += sliceWidth;
    }
  }

  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.stroke();
}

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
