import React, { Component } from 'react';
import './InstaProfileCard.css';

class InstaProfileCard extends Component{

    render() {
        console.log("Profile Card Props - ",this.props)
        return (
            <div className="profile-card">
            <div className="profile-pic">
                <img src={this.props.profilePicURLHighDefinition}/> 
                </div>
                <div className="download-button">
                    <a href={this.props.profilePicURLHighDefinition} download="profile.jpg" target="_blank"><i className="fas fa-download"></i></a>
                </div>
                <div className="profile-info">
                    <div className="profile-name">
                        {this.props.fullName}
                    </div>
                    <div className="profile-username">
                        @{this.props.userName}
                    </div>
                    <div className="profile-bio">
                        {this.props.bio}
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