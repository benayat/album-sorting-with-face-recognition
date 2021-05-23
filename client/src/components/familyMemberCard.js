import "../style/familyMemberCard.css";
import { useContext } from "react";
import { FamilyContext } from "../context/family/FamilyContext";
import { Link } from "react-router-dom";
const FamilyMemberCard = ({ src, label }) => {
  const { deleteFamilyMember } = useContext(FamilyContext);

  const contextMenuDelete = (event) => {
    event.preventDefault();
    deleteFamilyMember(label);
  };

  return (
    src && (
      <div
        key={label}
        className="familyMemberCard"
        onContextMenu={contextMenuDelete}
      >
        <h1>{label}</h1>
        <img key={label} src={src} alt={label} />
        <Link to={`/albums/${label}`} style={{ textDecoration: "none" }}>
          ALBUM
        </Link>
      </div>
    )
  );
};
export default FamilyMemberCard;
//all we need is the label!so cool :)
