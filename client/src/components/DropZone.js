import "../style/dropZone.css";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = (props) => {
  const onDrop = useCallback(
    async (acceptedFiles) => {
      acceptedFiles.forEach(async (file) => {
        // if (file.size > 4000000)
        //   console.error("can't take files larger then 4mb");
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const title = file.name;
          const src = reader.result;
          await props.addNewImageToAlbums(title, src);
        };
      });
    },
    [props]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });
  return (
    <div className="dropZone" {...getRootProps()}>
      <input {...getInputProps()} />
      <p>
        Drag 'n' drop some files here, or click to select one or multiple files
      </p>
    </div>
  );
};
export default DropZone;
