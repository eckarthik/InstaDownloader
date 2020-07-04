import React, { Component } from 'react';
import Post from './Post/Post';
import './Posts.css';

class Posts extends Component {
    shouldComponentUpdate(nextProps,nextState) {
        if(nextProps.posts === this.props.posts) {
            return false;
        }
        else {
            return true;
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.props.posts.length>=1 ? this.props.header : ""}
                
                <div className="posts">
                    {
                        this.props.posts.map((post,index) => {
                            return <Post {...post} key={index}/>
                        })
                    }
                </div>
            </React.Fragment>
            
        );
    }
}

export default Posts;