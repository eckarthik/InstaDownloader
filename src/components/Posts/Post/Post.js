import React from 'react';
import Button from '../../Button/Button';

import './Post.css';

const Post = (props) => {
    return (
        <div className="post">
            <div className="post-pic">
                <img src={props.postImageURL}/>
            </div>
            <div className="post-details">
                <div className="post-likes">
                    Liked by {props.likesCount} and others
                </div>
                <div className="post-caption">
                    {props.postCaption.substr(0,100)}
                </div>
            </div>
            <div className="download-post-button">
                    <Button 
                        buttonText="Download Post" 
                        buttonBackgroundColor="white" 
                        buttonBorderColor="red" 
                        buttonTextColor="black"/>
            </div>
        </div>
    );
}

export default Post;