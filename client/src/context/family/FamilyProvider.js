import React, { useCallback, useReducer } from "react";
import { FamilyContext } from "./FamilyContext";
import familyReducer from "./familyReducer";
import familyMembersInterface from "../../utils/idbStores/familyMembers";

const FamilyProvider = (props) => {
  const { get, set, getAll, deleteByLabel } = familyMembersInterface;
  const initialState = {
    familyMembers: [],
    familyNames: [],
    currentFamilyMember: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(familyReducer, initialState);

  //setting the current family member in state, so I can take it from the current field later
  const getFamilyMemberByLabel = async (label) => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      const familyMember = await get(label);
      dispatch({ type: "REQUEST_FINISHED" });
      dispatch({ type: "SET_CURRENT_FAMILY_MEMBER", payload: familyMember });
      return familyMember;
    } catch (err) {
      console.error(err);
    }
  };
  const getAllFamilyMembers = useCallback(async () => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      const familyMembers = await getAll();
      dispatch({ type: "REQUEST_FINISHED" });
      dispatch({ type: "SET_FAMILY_MEMBERS", payload: familyMembers });
    } catch (error) {
      console.error(error);
    }
  }, [getAll]);
  const deleteFamilyMember = async (label) => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      await deleteByLabel(label);
      const newFamilyMembers = await getAll();
      dispatch({ type: "REQUEST_FINISHED" });
      dispatch({ type: "SET_FAMILY_MEMBERS", payload: newFamilyMembers });
    } catch (error) {
      console.error(error);
    }
  };

  //moves:
  /* 
    - adding family member object to the store.
    - updating members and names databases.

  */
  const addFamilyMember = async (familyMember) => {
    try {
      dispatch({ type: "SENDING_REQUEST" });
      await set(familyMember);
      dispatch({ type: "REQUEST_FINISHED" });
      await getAllFamilyMembers();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FamilyContext.Provider
      value={{
        familyMembers: state.familyMembers,
        familyNames: state.familyNames,
        currentFamilyMember: state.currentFamilyMember,
        loading: state.loading,
        getFamilyMemberByLabel: getFamilyMemberByLabel,
        getAllFamilyMembers: getAllFamilyMembers,
        deleteFamilyMember: deleteFamilyMember,
        addFamilyMember: addFamilyMember,
      }}
    >
      {props.children}
    </FamilyContext.Provider>
  );
};

export default FamilyProvider;

/* 
familyMember = {
  label:__
  src:___
  descriptor:___
}
*/
