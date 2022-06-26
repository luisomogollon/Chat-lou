import React from "react";
import Portal from "../portal/Portal";


const Modal = ({ children, toggle, active }) =>

(<Portal >
    {active &&
        <div style={styles.wrapper}>
            <div style={styles.window}>
                <button onClick={toggle}>x</button>
                <div>{children}</div>
            </div>
        </div>
    }
</Portal>)


export default Modal;

const styles = {
    wrapper: {
        position: 'absolute',
        top: 27,
        left: '770px',
        width: '5px',
        height: '5px',
        display: 'flex',
        justifycontent: 'center',
        alignitems: 'center',
        
    },
    window: {
      
        
    },
    closebtn: {
        position: 'absolute',
        top: 0,
        right: 0,

    }

};