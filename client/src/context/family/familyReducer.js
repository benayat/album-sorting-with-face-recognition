const familyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAMILY_MEMBERS':
      return { ...state, familyMembers: action.payload };
    case 'SET_FAMILY_NAMES':
      return { ...state, familyNames: action.payload };
    case 'SET_CURRENT_FAMILY_MEMBER':
      return { ...state, currentFamilyMember: action.payload };
    case 'SENDING_REQUEST':
      return { ...state, loading: true };
    case 'REQUEST_FINISHED':
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default familyReducer;
