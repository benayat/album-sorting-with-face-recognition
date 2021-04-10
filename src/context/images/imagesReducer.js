const imagesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    case 'ADD_IMAGE':
      return { ...state, currentImageSrc: action.payload };
    // case 'ADD_NEW_IMAGE':
    //   const images = [...state.images, action.payload];
    //   return { ...state, images: images };
    case 'SET_IMAGES_BY_LABEL':
      return { ...state, imagesByLabel: action.payload.imagesByLabel };
    case 'CLEAR_ALL_IMAGES_BY_LABEL':
      return { ...state, imagesByLabel: [] };
    case 'SENDING_REQUEST':
      return { ...state, loading: true };
    case 'REQUEST_FINISHED':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default imagesReducer;
