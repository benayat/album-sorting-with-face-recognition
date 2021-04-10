import "../style/album.css";
import { useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { ImagesContext } from "../context/images/ImagesContext";
const AlbumCrud = () => {
  const { label } = useParams();
  const {
    getAllImagesByLabel,
    deleteImageFromCurrentAlbum,
    imagesByLabel,
    loading,
  } = useContext(ImagesContext);

  const getAllImagesByLabelCallback = useCallback(async () => {
    await getAllImagesByLabel(label);
  }, [label, getAllImagesByLabel]);

  //getAllImagesByLabel is a callback function, defined with useCallback!
  useEffect(() => {
    const loadAlbum = async (label) => {
      await getAllImagesByLabelCallback();
    };
    loadAlbum();
  }, [label, getAllImagesByLabelCallback]);

  const contextMenuDelete = async (event) => {
    event.preventDefault();
    await deleteImageFromCurrentAlbum(event.target.alt, label);
  };

  return (
    <div className="pageContainer">
      <div classlabel="album">
        <h1>{label} album</h1>
        <div className="albumContainer">
          {!loading &&
            imagesByLabel.length >= 1 &&
            imagesByLabel.map((image) => {
              return (
                <img
                  key={image.title}
                  alt={image.title}
                  src={image.src}
                  onContextMenu={contextMenuDelete}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default AlbumCrud;

//need to get the label from the param variable from the link path!
//using alt as title!
