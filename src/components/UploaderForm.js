import "../style/uploaderForm.css";
import React, { useState } from "react";
const UploaderForm = (props) => {
  const [currentLabel, setLabel] = useState("");
  const [file, setFile] = useState(null);

  //read the file and decode it
  const getFile = (e) => {
    console.log(e);
    if (e.target && e.target.files[0].size > 3000000) {
      console.error(`can't upload files larger then 3 MB`);
      setFile(null);
      return;
    }
    let reader = new FileReader();
    // const file = e.target.files[0];
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (e) => {
      // setTitle(reader.name);
      setFile(reader.result);
    };
  };
  //submit
  const restoreInitialState = () => {
    setLabel("");
  };
  const getImageInfo = async (e) => {
    e.preventDefault();
    if (currentLabel !== null && file !== null) {
      await props.addNewFamilyMember(currentLabel, file);
      restoreInitialState();
    }
  };

  return (
    <div className="uploader">
      <form className="form" onSubmit={getImageInfo}>
        <label>
          {props.type}:
          <input
            type="text"
            disabled={props.type === "familyMembers" ? false : true}
            value={currentLabel}
            onChange={(e) => setLabel(e.target.value)}
          />
        </label>
        <input type="file" onChange={getFile} />
        <button>upload image</button>
      </form>
    </div>
  );
};
export default UploaderForm;
