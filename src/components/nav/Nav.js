import React, { useContext } from "react";
import { AuthContext } from "../../context";
import "./nav.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const redirect = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    redirect('/');
  }
  return (
    <div className="nav">
      <div className="nav__blocks">
        <div onClick={handleLogout} className="logout"> Salir</div>
      </div>
    </div>
  );
}

export default Logout;
