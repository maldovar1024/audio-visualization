import { Button, Tooltip, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload/interface';
import React, { FC } from 'react';

interface AudioUploadProps {
  readAudioData: (audioData: ArrayBuffer) => void;
}

const AudioUpload: FC<AudioUploadProps> = props => {
  const handleUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      props.readAudioData(buffer);
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  return (
    <Tooltip title="上传音频文件" placement="bottom">
      <Upload accept="audio/*" beforeUpload={handleUpload}>
        <Button icon={<UploadOutlined />} />
      </Upload>
    </Tooltip>
  );
};

export default AudioUpload;
