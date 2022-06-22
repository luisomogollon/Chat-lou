import { useEffect } from "react";
import ReactDOM from "react-dom";
import './Portal.css';



const portalRoot = document.getElementById('portal');

function Portal({ children }) {
    const modalBody = document.createElement('div');

    useEffect(() => {
        portalRoot.appendChild(modalBody); 
        return () => {
            portalRoot.removeChild(modalBody);
        }
    })
    return ReactDOM.createPortal(children, modalBody);
}

export default Portal;