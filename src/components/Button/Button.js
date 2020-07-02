import React from 'react';

const Button = (props) => {
    return (
        <button 
            className="button"
            style={{
                backgroundColor:`${props.buttonBackgroundColor}`,
                padding:"15px 32px",
                textAlign:"center",
                fontSize:"16px",
                margin:"4px 2px",
                cursor:"pointer",
                color:`${props.buttonTextColor}`,
                border:`2px solid ${props.buttonBorderColor}`,
                borderRadius:"2%",
                
            }}
        >{props.buttonText}</button>
    );
}

export default Button;