import React,{PureComponent} from 'react';
import './HowToUse.css';

class HowToUse extends PureComponent {
    render() {
        return (
            <React.Fragment>
                <h1 className="header">How to Download?</h1>
                <div className="how-to-use">
                    {
                        this.props.steps.map((step,index) => {
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
    
}

export default HowToUse;