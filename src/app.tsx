import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { Component } from 'react';
import AudioUpload from './component/audio-upload';
import FrequencyCanvas from './component/freq-canvas';
import WaveCanvas from './component/wave-canvas';

interface AppState {
  isPlaying: boolean;
  canPlay: boolean;
}

class App extends Component<unknown, AppState> {
  private ctx = new AudioContext();
  private source = this.ctx.createBufferSource();
  private timeAnalyser = this.ctx.createAnalyser();
  private frequencyAnalyser = this.ctx.createAnalyser();

  constructor(props: unknown) {
    super(props);
    this.state = {
      isPlaying: false,
      canPlay: false,
    };

    this.timeAnalyser.fftSize = 256;
    this.frequencyAnalyser.fftSize = 256;
    this.source.connect(this.timeAnalyser);
    this.source.connect(this.frequencyAnalyser);
    this.source.connect(this.ctx.destination);
  }

  private readAudioData = async (buf: ArrayBuffer) => {
    const audioBuffer = await this.ctx.decodeAudioData(buf);
    this.source.buffer = audioBuffer;
    this.setState({ canPlay: true });
  };

  private handleControlClick = () => {
    if (this.state.isPlaying) {
      this.source.stop();
      this.setState({ isPlaying: false });
    } else {
      this.source.start();
      this.setState({ isPlaying: true });
    }
  };

  render() {
    const { isPlaying, canPlay } = this.state;
    return (
      <>
        <header>
          <AudioUpload readAudioData={this.readAudioData} />
          <Button
            disabled={!canPlay}
            onClick={this.handleControlClick}
            icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          />
        </header>
        <main>
          <WaveCanvas play={isPlaying} analyser={this.timeAnalyser} />
          <FrequencyCanvas play={isPlaying} analyser={this.frequencyAnalyser} />
        </main>
      </>
    );
  }
}

export default App;
