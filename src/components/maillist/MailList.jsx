import React, {useState} from 'react';
import "./maillist.css";


function MailList(){
    const [signUp, setSignUp] = useState(false);
    const [closeOverlay, setCloseOverlay] = useState(false)
    return(
        <>
        <div className="mailListContainer">
            <div className="mailListCta">Sign-up to our mailing list!</div>
            <span>Get the latest promos!</span>
            <div className="mailListSignUp">
                <input type="text" placeholder="E-mail"></input>
                <button className="mailListSubmit" onClick={() =>{ setSignUp(true);
                setCloseOverlay(!closeOverlay)}}>Sign-up</button>
            </div>
        </div>
        {closeOverlay &&
            <div className="signUpOverlay">
                <span>Success!</span>
                <button onClick={() => setCloseOverlay(!closeOverlay)}>Close</button>
            </div>
        }
        </>
    )
}

export default MailList