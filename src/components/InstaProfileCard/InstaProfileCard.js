import React, { Component } from 'react';
import './InstaProfileCard.css';
import * as utils from '../../utils';

class InstaProfileCard extends Component{

    render() {
        return (
            <div className="profile-card" id="profile">
            <div className="profile-pic">
                <img src={this.props.profilePicURLHighDefinition} alt=""/> 
                </div>
                <div className="download-button" onClick={() => utils.downloadImage(this.props.profilePicURLHighDefinition,"profile_pic.png")}>
                    <span><i className="fas fa-download"></i></span>
                </div>
                <div className="profile-info">
                    <div className="profile-name">
                        {this.props.fullName}
                    </div>
                    <div className="profile-username">
                        @{this.props.userName}
                    </div>
                    <div className="profile-bio">
                        {this.props.bio.split("\n").map((line,index) => {
                                return <p key={index}>{line}</p>
                            })
                        }
                    </div>
                </div> 
                <div className="activity-data">
                    <div>Followers <span>{this.props.followersCount}</span></div> 
                    <div>Posts <span>{this.props.postsCount}</span></div> 
                </div>
            </div>
        )
    }
    
};

export default InstaProfileCard;