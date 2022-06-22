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
        top: 0,
        left: '600px',
        width: '5px',
        height: '5px',
        display: 'flex',
        justifycontent: 'center',
        alignitems: 'center',
    },
    window: {
        position: 'relative',
        background: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        zIndex: 10,
        minwidth: 320,
        width: '500px',
        height: '340px',
        justifycontent: 'center'
        

    },
    closebtn: {
        position: 'absolute',
        top: 0,
        right: 0,

    }

};