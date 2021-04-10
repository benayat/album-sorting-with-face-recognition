import "../style/manageFamily.css";
import { FaHandPointUp } from "react-icons/fa";

import { useCallback, useContext, useEffect } from "react";
import UploaderForm from "../components/UploaderForm";
import FamilyMemberCard from "../components/familyMemberCard";
import { FaceapiContext } from "../context/faceapi/FaceapiContext";
import { FamilyContext } from "../context/family/FamilyContext";
import DropZone from "../components/DropZone";

const ManageFamily = () => {
  const {
    loadModules,
    modulesLoaded,
    addFamilyMemberFaceapi,
    addNewImageFaceapi,
  } = useContext(FaceapiContext);
  const { getAllFamilyMembers, familyMembers } = useContext(FamilyContext);

  //using callback to memoize the function so it won't be referenced differently every render.
  const getAllFamilyMembersCallback = useCallback(async () => {
    if (!modulesLoaded) {
      await loadModules();
    }
    await getAllFamilyMembers();
  }, [loadModules, getAllFamilyMembers, modulesLoaded]);
  useEffect(() => {
    const load = async () => {
      try {
        await getAllFamilyMembersCallback();
      } catch (error) {
        console.log("error in use effect get all familyNames");
      }
    };
    load();
  }, [getAllFamilyMembersCallback]);

  const addNewFamilyMember = async (label, src) => {
    return await addFamilyMemberFaceapi(label, src);
  };
  const addNewImageToAlbums = async (title, src) => {
    return await addNewImageFaceapi(title, src);
  };

  return (
    <div className="pageContainer">
      <div className="inputs">
        <UploaderForm
          type="familyMembers"
          button
          addNewFamilyMember={addNewFamilyMember}
        />
        {/* <UploaderForm type="images" addNewImageToAlbums={addNewImageToAlbums} /> */}
        <DropZone addNewImageToAlbums={addNewImageToAlbums} />
      </div>

      <div className="containerLeftRightFlex">
        <div className="intro">
          <div className="upndown">
            <FaHandPointUp />
            <p>add family members</p>
          </div>
          <div className="upndown">
            <FaHandPointUp />
            <p>add'n'drag images</p>
          </div>
        </div>
        <div key="familyCards" className="familyCards">
          {familyMembers &&
            familyMembers.map((member) => {
              return (
                <FamilyMemberCard
                  key={member.label}
                  src={member.src}
                  label={member.label}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ManageFamily;
