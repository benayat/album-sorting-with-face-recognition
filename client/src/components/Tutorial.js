import { useState } from "react";
import "../style/tutorial.css";
import samePerson from "../media/is_that_the_same_person.jfif";
import AIImg from "../media/AI.jfif";
import albumImg from "../media/album.webp";

const Tutorial = () => {
  const [active, setActive] = useState(true);
  const onContextMenu = (e) => {
    e.preventDefault();
    setActive(!active);
  };
  return (
    <div
      className={`tutorial ${active ? "active" : "disable"}`}
      onContextMenu={onContextMenu}
    >
      <div>
        tired of google asking <img alt="google photos" src={samePerson} /> you
        who this photo belongs to?.
      </div>
      <div>
        you want some real AI <img alt="AI" src={AIImg} /> to tell who is the
        face in the picture?
      </div>
      <div>you've come to the right place!</div>
      <div>
        in this page, we display all the family members cards, with name,
        picture, and link to their album <img alt="album" src={albumImg} />
      </div>
      <div>
        use the uploader in the top-left to add family members. be sure to add
        their name!
      </div>
      <div>
        use the drag'n'drop uploader in the top-right to add pictures, and we'll
        sort everything for you!
      </div>
      <div>
        now, you can just right-click somewhere to toggle on-off this tutorial
        and get started
      </div>
    </div>
  );
};
export default Tutorial;
