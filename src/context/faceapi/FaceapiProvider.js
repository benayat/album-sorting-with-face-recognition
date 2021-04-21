import * as faceapi from "face-api.js";

import { FaceapiContext } from "./FaceapiContext";
import FaceapiReducer from "./FaceapiReducer";
import React, { useCallback, useContext, useReducer } from "react";

import { ImagesContext } from "../images/ImagesContext";
import { FamilyContext } from "../family/FamilyContext";
//labeledDescriptors:{label:descriptor}
const FaceapiProvider = (props) => {
  const { addFamilyMember, getAllFamilyMembers, familyMembers } = useContext(
    FamilyContext
  );
  const { addNewImage } = useContext(ImagesContext);

  const initialState = {
    modulesLoaded: false,
    labeledDescriptors: [],
    loading: false,
    minMatchRate: 0.8,
    currentMatch: false,
  };
  const [state, dispatch] = useReducer(FaceapiReducer, initialState);

  const loadModules = useCallback(async () => {
    const MODEL_URL = "/models";
    dispatch({ type: "SENDING_LOAD_REQUEST" });
    console.log("loading modules...");
    await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    console.log("finished loading");
    dispatch({ type: "LOAD_REQUEST_FINISHED" });
  }, []);
  // HELPER FUNCTIONS:
  const makeImage = (alt, src) => {
    const image = document.createElement("img");
    image.alt = alt;
    image.src = src;
    return image;
  };
  const getSingleDescriptor = async (alt, src) => {
    if (!state.modulesLoaded) {
      await loadModules();
    }
    return await faceapi
      .detectSingleFace(makeImage(alt, src))
      .withFaceLandmarks()
      .withFaceDescriptor();
  };
  const getDetectionResult = async (descriptor1, descriptor2) => {
    if (!state.modulesLoaded) {
      await loadModules();
    }
    const faceMatcher = new faceapi.FaceMatcher(descriptor1);
    const bestMatch = faceMatcher.findBestMatch(descriptor2.descriptor);
    console.log(bestMatch.toString());
    const matchRate = parseFloat(bestMatch.toString().slice(-5, -1));
    if (matchRate > state.minMatchRate) {
      console.log("match!");
      return true;
    }
    return false;
  };
  const addFamilyMemberFaceapi = async (label, src) => {
    dispatch({ type: "SENDING_REQUEST" });
    const currentDescriptor = await getSingleDescriptor(label, src);
    dispatch({
      type: "ADD_FAMILY_MEMBER",
      payload: { [label]: currentDescriptor },
    });
    await addFamilyMember({ label, src, descriptor: currentDescriptor });
    dispatch({ type: "REQUEST_FINISHED" });
  };
  const addNewImageFaceapi = async (title, src) => {
    dispatch({ type: "SENDING_REQUEST" });
    const matchedLabels = [];
    await getAllFamilyMembers();
    const labeledDescriptors = familyMembers.map((member) => {
      return new faceapi.LabeledFaceDescriptors(member.label, [
        member.descriptor.descriptor,
      ]);
    });
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
    const results = await faceapi
      .detectAllFaces(makeImage(title, src))
      .withFaceLandmarks()
      .withFaceDescriptors();

    results.forEach((fd) => {
      const bestMatch = faceMatcher.findBestMatch(fd.descriptor);
      const match = bestMatch.toString().split(" ")[0];
      if (!matchedLabels.includes(match))
        matchedLabels.push(bestMatch.toString().split(" ")[0]);
      console.log(bestMatch.toString());
    });
    addNewImage({
      title,
      src,
      labels: matchedLabels,
    });
    dispatch({ type: "REQUEST_FINISHED" });
  };
  return (
    <FaceapiContext.Provider
      value={{
        modulesLoaded: state.modulesLoaded,
        loading: state.loading,
        labeledDescriptors: state.labeledDescriptors,
        loadModules: loadModules,
        addFamilyMemberFaceapi: addFamilyMemberFaceapi,
        addNewImageFaceapi: addNewImageFaceapi,
        getSingleDescriptor: getSingleDescriptor,
        getDetectionResult: getDetectionResult,
      }}
    >
      {props.children}
    </FaceapiContext.Provider>
  );
};
export default FaceapiProvider;
//still need to complete addnewimage!!
//by calling the imagesprovider method.

/* 
familyMember = {
  label:__
  src:___
  descriptor:___
}
*/
/* 
image looks like:
object {
  title:___
  src:___
  labels:[]
  descriptor:___
}
*/
