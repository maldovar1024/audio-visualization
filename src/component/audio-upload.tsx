import { Button, Upload } from 'antd';
import React, { FC } from 'react';

interface AudioUploadProps {
  readAudioData: (audioData: ArrayBuffer) => void;
}

const AudioUpload: FC<AudioUploadProps> = props => (
  <Upload
    accept="audio/*"
    beforeUpload={file => {
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        props.readAudioData(buffer);
      };
      reader.readAsArrayBuffer(file);
      return false;
    }}
  >
    <Button>点击上传音频文件</Button>
  </Upload>
);

export default AudioUpload;
