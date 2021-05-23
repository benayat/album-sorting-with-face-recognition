const FaceapiReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODULES':
      return { ...state, faceapi: action.payload };
    case 'GET_SINGLE_DESCRIPTOR':
      return { ...state, currentDescriptor: action.payload };
    case 'GET_MULTIPLE_DESCRIPTORS':
      return { ...state, familyNames: action.payload };
    case 'ADD_FAMILY_MEMBER':
      let labeledDescriptors = state.labeledDescriptors;
      labeledDescriptors = (labeledDescriptors && [
        ...labeledDescriptors,
        action.payload,
      ]) || [action.payload];
      return { ...state, labeledDescriptors: labeledDescriptors };
    case 'SENDING_LOAD_REQUEST':
      return { ...state, modulesLoaded: false };
    case 'LOAD_REQUEST_FINISHED':
      return { ...state, modulesLoaded: true };
    case 'SENDING_REQUEST':
      return { ...state, loading: true };
    case 'REQUEST_FINISHED':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default FaceapiReducer;
