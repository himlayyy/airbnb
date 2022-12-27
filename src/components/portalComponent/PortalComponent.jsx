import React from "react";
import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

function createWrapperAndAppendToBody(wrapperId){
    const wrapperElement = document.createElement("div");
    wrapperElement.setAttribute("id", wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

function PortalComponent({children, wrapperId="react-portal-wrapper"}){
    const [wrapperElement, setWrapperElement] = useState(null);

    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId);
        let systemCreated = false;

        if(!element){
            systemCreated = true;
            element = createWrapperAndAppendToBody(wrapperId);
        };
        setWrapperElement(element);

        return () => {
            if(systemCreated && element.parentNode){
                element.parentNode.removeChild(element);
            }
        }
    },[wrapperId]);

    if(wrapperElement === null) return null;
    return createPortal(children, document.getElementById(wrapperId));
};

export default PortalComponent;

// modal.js -> portal.jsx
// ReactPortal.js -> PortalComponent.jsx