import React from 'react';
import './NotFoundError.css';

const NotFoundError = (props) => {
    return (
        <div className="error">
            <div className="error-image">
                <i className="fa fa-warning"/>
            </div>
            <div className="error-message">
                {props.errorMessage}
            </div>
        </div>
    );
}

export default NotFoundError;