import "../style/uploaderForm.css";
import React, { useState } from "react";
const UploaderForm = (props) => {
  const [currentLabel, setLabel] = useState("");
  const [file, setFile] = useState(null);

  //read the file and decode it
  const getFile = (e) => {
    console.log(e);
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
          name:<span> </span>
          <input
            type="text"
            value={currentLabel}
            onChange={(e) => setLabel(e.target.value)}
            required
          />
        </label>
        <input type="file" onChange={getFile} />
        <label>
          click to finish!<span> </span>
          <button>upload image</button>
        </label>
      </form>
    </div>
  );
};
export default UploaderForm;
