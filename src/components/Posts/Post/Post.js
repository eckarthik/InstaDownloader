import React from 'react';
import Button from '../../Button/Button';
import * as utils from '../../../utils';

import './Post.css';

const Post = (props) => {
    return (
        <div className="post">
            <div className="post-pic">
                <img src={props.postImageURL} alt=""/>
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
                        buttonTextColor="black"
                        clicked={() => utils.downloadImage(props.postImageURL,"post.png")}
                        />
            </div>
        </div>
    );
}

export default Post;