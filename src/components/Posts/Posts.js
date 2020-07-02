import React from 'react';
import Post from './Post/Post';
import './Posts.css';

const Posts = (props) => {
    return (
        <div className="posts">
            {props.posts.map(post => {
                return <Post {...post}/>
            })}
        </div>
    );
}

export default Posts;