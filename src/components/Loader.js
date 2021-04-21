import "../style/loader.css";
import albumImg from "../media/album.webp";
import cpuImg from "../media/cpu-icon.png";
import familyImg from "../media/family.PNG";
const Loader = (props) => {
  return (
    <div className={`loader ${props.loading ? "active" : "disable"}`}>
      <ul>
        <li>
          {" "}
          The cpu <img alt="cpu" src={cpuImg} />
          has some tough job to do now, so please be patient
        </li>
        <li>
          did you know? to make the model that sorts your albums, over a hundred
          thouthand photos <img alt="album" src={albumImg} /> where fed to it.
        </li>
        <li>
          {" "}
          the model will go through all the photos, and compare them with all
          the faces of your family
          <img alt="family" src={familyImg} /> members, and try to find a match
        </li>
      </ul>
    </div>
  );
};
export default Loader;
