import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <Link to="/manageFamily" className="HomeLink">
        Home
      </Link>
    </div>
  );
};
export default Header;
