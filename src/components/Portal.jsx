import React, {useEffect, useRef} from 'react';
import PortalComponent from './portalComponent/PortalComponent';

import { useNavigate } from "react-router-dom"; 
import { logOut } from '../firebase';
import {IoCloseCircle} from "react-icons/io5";

function Portal({children, openPortal, handleClose, containerClass=""}) {
    const nodeRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() =>{
        const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() :null);
        document.body.addEventListener("keydown", closeOnEscapeKey);
        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
        }
    }, [handleClose]);
  return (
    <PortalComponent wrapperId="react-portal-wrapper">
      <div className= "portal modalOverlay"
      ref={nodeRef}>
        <div className={`portal-content modalContainer ${containerClass}`}>
        <button className="buttonTop" onClick={handleClose}>
          <IoCloseCircle size={"2.5em"}/>
        </button>
            {children}
         </div>
      </div>
    </PortalComponent>
  )
}

export default Portal;
