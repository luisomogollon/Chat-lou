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
        left: '840px',
        width: '5px',
        height: '5px',
        display: 'flex',
        justifycontent: 'center',
        alignitems: 'center',
        
    },
    window: {
        position: 'relative',
        background: '#fff',
        padding: 10,
        borderRadius: 10,
        zIndex: 10,
        minwidth: 200,
        width: '400px',
        border: '10px solid',
        color: '#cac8c8', 
        height: '360px',
        justifycontent: 'center'
        
    },
    closebtn: {
        position: 'absolute',
        top: 0,
        right: 0,

    }

};