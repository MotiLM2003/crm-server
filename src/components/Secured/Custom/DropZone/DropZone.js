import React, { useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Progressbar from '../../Custom/Progressbar/Progressbar';
import { ToastContainer, toast } from 'react-toastify';
import api from '../../../../apis/api';
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  justifyContent: 'center',
  color: '#000',
  transition: 'border .24s ease-in-out',
  height: '20rem',
  width: '60rem',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

const DropZone = ({ onResponse }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxFiles: 10,
    accept: '.xlsx',
  });

  const [progress, setProgress] = useState(0);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const uploadFiles = async () => {
    const fd = new FormData();
    if (acceptedFiles.length === 0) {
      toast.warning('😍 No files uploaded.', {
        position: 'bottom-left',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: false,
      });

      return;
    }
    setProgress(0);

    setTimeout(async () => {
      acceptedFiles.map((file) => fd.append('file', file));
      const { data } = await api.post('files/import-customers', fd, {
        onUploadProgress: (progressEvent) => {
          const p = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );

          setProgress(p);
        },
      });

      // setProgress(0);
      onResponse(data);
    }, 1500);
  };

  return (
    <div className='container'>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        Drag 'n' drop some files here, or click to select files
      </div>
      <Progressbar progress={progress} />
      <button className='button bg-success' onClick={uploadFiles}>
        Upload files
      </button>
      <p>Selected files:</p>
      <ul>{files}</ul>

      <ToastContainer />
    </div>
  );
};

export default DropZone;
