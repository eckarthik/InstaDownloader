import React from 'react';
import './HowToUse.css';

const HowToUse = (props) => {
    return (
        <React.Fragment>
            <h1 className="header">How to Download?</h1>
            <div className="how-to-use">
                {
                    props.steps.map((step,index) => {
                        return <div className="step" key={index}>
                                    <div className="step-image">
                                        <i className={step.icon}/>
                                    </div>
                                    <div className="step-number">
                                        Step {index+1}
                                    </div>
                                    <div className="step-description">
                                        {step.stepDescription}
                                    </div>
                                </div>
                    })
                }
            
            </div>
        </React.Fragment>
        

    );
}

export default HowToUse;