import React from 'react';
import './Loader.css';

const Loader = (props) => {
    return (
        <div className="loading-indicator">
            <div className="loader"></div>
            <p>{props.loadingMessage}</p>
        </div>

    )
};

export default Loader;