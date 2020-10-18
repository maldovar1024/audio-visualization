import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { Component } from 'react';
import AudioUpload from './component/audio-upload';
import FrequencyCanvas from './component/freq-canvas';
import WaveCanvas from './component/wave-canvas';

interface AppState {
  isPlaying: boolean;
  audioBuffer: AudioBuffer | null;
}

class App extends Component<unknown, AppState> {
  private ctx = new AudioContext();
  private source: AudioBufferSourceNode | null = null;
  private timeAnalyser = this.ctx.createAnalyser();
  private frequencyAnalyser = this.ctx.createAnalyser();

  constructor(props: unknown) {
    super(props);
    this.state = {
      isPlaying: false,
      audioBuffer: null,
    };

    this.timeAnalyser.fftSize = 256;
    this.frequencyAnalyser.fftSize = 256;
  }

  private handlePlayEnd = () => {
    this.setState({ isPlaying: false });
    this.source = null;
  };

  private readAudioData = async (buf: ArrayBuffer) => {
    this.setState({ audioBuffer: null });
    const audioBuffer = await this.ctx.decodeAudioData(buf);
    this.setState({ audioBuffer });
  };

  private start() {
    const { audioBuffer } = this.state;
    if (audioBuffer !== null) {
      this.source = this.ctx.createBufferSource();
      this.source.onended = this.handlePlayEnd;
      this.source.buffer = audioBuffer;
      this.source.connect(this.timeAnalyser);
      this.source.connect(this.frequencyAnalyser);
      this.source.connect(this.ctx.destination);
      this.source.start();
      this.setState({ isPlaying: true });
    } else {
      message.error('没有可播放的音频文件', 1);
    }
  }

  private handleControlClick = () => {
    if (this.state.isPlaying) {
      this.source?.stop();
    } else {
      this.start();
    }
  };

  render() {
    const { isPlaying, audioBuffer } = this.state;
    return (
      <>
        <header>
          <AudioUpload
            disabled={isPlaying}
            readAudioData={this.readAudioData}
          />
          <Button
            className="control"
            disabled={audioBuffer === null}
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
