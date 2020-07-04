import React from 'react';
import Button from '../../Button/Button';
import * as utils from '../../../utils';

import './Post.css';

const Post = (props) => {
    let mediaToBeDisplayed = null;
    if(props.isVideo) {
        mediaToBeDisplayed =  <video style={{width:"100%",height:"100%"}} controls>
                                <source src={props.postImageURL} type="video/mp4"/>
                              </video> 
    }
    else {
        mediaToBeDisplayed = <img src={props.postImageURL} alt=""/>
    }
    let buttonText = props.isVideo ? "Download Video" : "Download Post"
    return (
        <div className="post">
            <div className="post-pic">
                {mediaToBeDisplayed}
            </div>
            <div className="post-owner-username">
                {props.postOwnerUsername !== null ? `@${props.postOwnerUsername}` : ""}
            </div>
            <div className="post-details">
                <div className="post-likes">
                    {props.likesCount !== null ? `Liked by ${props.likesCount} and others` :null}
                </div>
                <div className="post-caption">
                    {props.postCaption !== null ? props.postCaption.substr(0,100) : ""}
                </div>
            </div>
            <div className="download-post-button">
                    <Button 
                        buttonText={buttonText}
                        buttonBackgroundColor="white" 
                        buttonBorderColor="red" 
                        buttonTextColor="black"
                        clicked={() => utils.downloadImage(props.postImageURL,props.isVideo ? "video.mp4" :"post.png")}
                        />
            </div>
        </div>
    );
}

export default Post;