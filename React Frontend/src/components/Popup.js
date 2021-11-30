import React, { useState, useRef, useEffect } from 'react';
import './Popup.css'

const Popup = (props) => {

    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef && !popupRef.current.contains(event.target)) {
                props.onHide();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={props.show ? "blurbox display" : "blurbox no-display"}>
            <div className="box" ref={popupRef}>
                {props.components}
            </div>
        </div>
    );
}

export default Popup;