import React, { Component, createRef } from 'react';

interface WaveCanvasProps {
  analyser: AnalyserNode;
  play: boolean;
}

function drawWave(
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

class WaveCanvas extends Component<WaveCanvasProps> {
  private ref = createRef<HTMLCanvasElement>();
  private dataBuffer = new Array<Uint8Array>(30);
  private drawHandler: number | null = null;

  constructor(props: WaveCanvasProps) {
    super(props);
    for (let i = 0; i < this.dataBuffer.length; i++) {
      this.dataBuffer[i] = new Uint8Array(props.analyser.frequencyBinCount);
      this.dataBuffer[i].fill(128);
    }
  }

  componentDidUpdate(prevProps: WaveCanvasProps) {
    const { play } = this.props;

    if (prevProps.play !== play) {
      if (play) {
        const canvas = this.ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
          const bufferLength = this.props.analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          this.props.analyser.getByteTimeDomainData(dataArray);
          this.dataBuffer.shift();
          this.dataBuffer.push(dataArray);

          drawWave(ctx, canvas, this.dataBuffer);
          this.drawHandler = window.requestAnimationFrame(draw);
        };

        this.drawHandler = window.requestAnimationFrame(draw);
      } else if (this.drawHandler) {
        window.cancelAnimationFrame(this.drawHandler);
        this.drawHandler = null;
      }
    }
  }

  render() {
    return <canvas ref={this.ref} width={1200} height={200}></canvas>;
  }
}

export default WaveCanvas;
