import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import React, { FC, useState } from 'react';
import './audio-upload.less';

interface AudioUploadProps {
  disabled: boolean;
  readAudioData: (audioData: ArrayBuffer) => void;
}

const AudioUpload: FC<AudioUploadProps> = props => {
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState('');

  const disabled = props.disabled || loading;

  const handleUpload = (file: RcFile) => {
    if (!file.type.startsWith('audio/')) {
      message.error('文件类型错误', 1);
      setLoading(false);
    } else {
      setFilename(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        props.readAudioData(buffer);
        setLoading(false);
      };
      reader.readAsArrayBuffer(file);
    }
    return false;
  };

  return (
    <div className="upload">
      <Upload
        accept="audio/*"
        beforeUpload={handleUpload}
        showUploadList={false}
        disabled={disabled}
      >
        <Button
          style={{ paddingLeft: 6, paddingRight: 6 }}
          icon={<UploadOutlined />}
          disabled={disabled}
          onClick={() => setLoading(true)}
          loading={loading}
        >
          上传音频文件
        </Button>
      </Upload>
      <span className="filename">{filename}</span>
    </div>
  );
};

export default AudioUpload;
