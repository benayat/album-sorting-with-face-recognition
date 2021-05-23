import React, { useCallback, useReducer } from "react";
import { ImagesContext } from "./ImagesContext";
import imagesReducer from "./imagesReducer";
import imagesInterface from "../../utils/idbStores/images";

const ImageProvider = (props) => {
  const {
    getAllImagesByLabelText,
    get,
    getAll,
    deleteImageFromCurrentFamilyMember,
    set,
  } = imagesInterface;
  const initialState = {
    images: [],
    imagesByLabel: [],
    currentImageSrc: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(imagesReducer, initialState);

  const getImageByTitle = async (title) => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      const imageSrc = await get(title);
      dispatch({ type: "REQUEST_FINISHED" });
      dispatch({ type: "ADD_IMAGE", payload: imageSrc });
    } catch (err) {
      console.log(err);
    }
  };

  const getAllImages = async () => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      const images = await getAll();
      dispatch({ type: "REQUEST_FINISHED" });
      dispatch({ type: "SET_IMAGES", payload: images });
    } catch (error) {
      console.error(error);
    }
  };
  //imageObject: src, labels[],descriptor,title.
  const addNewImage = async (imageObject) => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      await set(imageObject);
      dispatch({ type: "REQUEST_FINISHED" });
      await getAllImages();
    } catch (error) {
      console.error(error);
    }
  };

  //get all images that belong to a specified label
  const getAllImagesByLabel = useCallback(
    async (label) => {
      try {
        dispatch({ type: "SENDING_REQUEST" });
        const imagesByLabel = await getAllImagesByLabelText(label);
        dispatch({ type: "REQUEST_FINISHED" });
        dispatch({
          type: "SET_IMAGES_BY_LABEL",
          payload: { imagesByLabel },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [getAllImagesByLabelText]
  );

  const deleteImageFromCurrentAlbum = async (title, label) => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      await deleteImageFromCurrentFamilyMember(title, label);
      dispatch({ type: "REQUEST_FINISHED" });
      const allImages = await getAll();
      dispatch({ type: "SET_IMAGES", payload: allImages });
      await getAllImagesByLabel(label);
    } catch (error) {
      console.error(error);
    }
  };
  const clearImagesByLabel = async () => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      dispatch({ type: "CLEAR_IMAGES_BY_LABEL" });
      dispatch({ type: "REQUEST_FINISHED" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImagesContext.Provider
      value={{
        images: state.images,
        imagesByLabel: state.imagesByLabel,
        currentImageSrc: state.currentImageSrc,
        loading: state.loading,
        getImageByTitle: getImageByTitle,
        getAllImages: getAllImages,
        getAllImagesByLabel: getAllImagesByLabel,
        deleteImageFromCurrentAlbum: deleteImageFromCurrentAlbum,
        clearImagesByLabel: clearImagesByLabel,
        addNewImage: addNewImage,
      }}
    >
      {props.children}
    </ImagesContext.Provider>
  );
};

export default ImageProvider;

/* 
image looks like:
object {
  title:___
  src:___
  labels:[]
  descriptor:___
}
*/
