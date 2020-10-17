import { Button, Tooltip, Upload } from 'antd';
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload/interface';
import React, { FC, useState } from 'react';

interface AudioUploadProps {
  disabled: boolean;
  readAudioData: (audioData: ArrayBuffer) => void;
}

const AudioUpload: FC<AudioUploadProps> = props => {
  const [loading, setLoading] = useState(false);

  const disabled = props.disabled || loading;

  const handleUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      props.readAudioData(buffer);
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
    return false;
  };

  return (
    <Tooltip title="上传音频文件" placement="bottom">
      <Upload
        accept="audio/*"
        beforeUpload={handleUpload}
        showUploadList={false}
        disabled={disabled}
      >
        <Button
          icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
          disabled={disabled}
          onClick={() => setLoading(true)}
        />
      </Upload>
    </Tooltip>
  );
};

export default AudioUpload;
