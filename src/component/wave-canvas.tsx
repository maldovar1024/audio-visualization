import React, { Component, createRef } from 'react';
import { drawWave, getCanvasAndContext, resetWaveCanvas } from '../utils';

interface WaveCanvasProps {
  analyser: AnalyserNode;
  play: boolean;
}

class WaveCanvas extends Component<WaveCanvasProps> {
  private ref = createRef<HTMLCanvasElement>();
  private dataBuffer = new Array<Uint8Array>(30);
  private drawHandler: number | null = null;
  private width = 1320;
  private height = 200;

  constructor(props: WaveCanvasProps) {
    super(props);
    for (let i = 0; i < this.dataBuffer.length; i++) {
      this.dataBuffer[i] = new Uint8Array(props.analyser.frequencyBinCount);
      this.dataBuffer[i].fill(128);
    }
  }

  private reset() {
    const result = getCanvasAndContext(this.ref);
    if (!result) return;

    const { canvas, ctx } = result;
    resetWaveCanvas(ctx, canvas);
  }

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate(prevProps: WaveCanvasProps) {
    const { play } = this.props;

    if (prevProps.play !== play) {
      if (play) {
        const result = getCanvasAndContext(this.ref);
        if (!result) return;

        const { canvas, ctx } = result;

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
        this.reset();
        this.drawHandler = null;
      }
    }
  }

  render() {
    const { width, height } = this;
    return (
      <canvas
        className="wave"
        ref={this.ref}
        width={width}
        height={height}
      ></canvas>
    );
  }
}

export default WaveCanvas;
