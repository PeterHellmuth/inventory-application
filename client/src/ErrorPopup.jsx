import {React, useState, useEffect} from "react";
import FadeInOut from "./FadeInOut";

function ErrorPopup({ location, errorPopupMessage, setErrorPopupMessage }) {
    const [show, setShow] = useState(false);
    const duration = 500;
    const extraStyles = {
        position: "fixed",
        top: location.y,
        left: location.x,
        right: 0,
        bottom: 0,
        width: "150px",
        height: "40px",
        textAlign: "center",
        padding: "10px",
        justifyContent: "center",
        borderRadius: "20px",
        background: "white",
        color: "red",
        borderStyle: "solid",
        
        // color: "#FFF"
      };


    useEffect(() => {
        if(errorPopupMessage){
            setShow(true);
            setTimeout(() => {
                setShow(false);
                setTimeout(()=>{
                    setErrorPopupMessage(null);
                }, duration);
            }, 3000);
        }

    }, [errorPopupMessage]);


  return (
    <FadeInOut className="error" show={show} duration={duration} style={extraStyles}>
        <span>{errorPopupMessage}</span>
    </FadeInOut>
  );
}

export default ErrorPopup;
