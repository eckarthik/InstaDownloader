import React from 'react';
import Post from './Post/Post';
import './Posts.css';

const Posts = (props) => {
    
    let header = props.posts.length > 1 ? <p style={{textAlign:"center"}}>Search results for <b>#{props.hashTag}</b></p> : null
    return (
        <React.Fragment>
            {header}
            <div className="posts">
                {
                    props.posts.map((post,index) => {
                        return <Post {...post} key={index}/>
                    })
                }
            </div>
        </React.Fragment>
        
    );
}

export default Posts;