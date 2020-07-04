import React, {Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import NotFoundError from '../../components/NotFoundError/NotFoundError';
import Posts from '../../components/Posts/Posts';
import Loading from '../../components/Loader/Loader';
import HowToUse from '../../components/HowToUse/HowToUse';
import {obtainPostUniqueLinkFromURL} from '../../utils';
import * as constants from '../../constants';

import './PostGrab.css';

class PostGrab extends Component {
    state = {
        postSearchInput:"",
        postLinkTopPosts:[],
        loadingPosts:false,
        hashTag:null,
        multipleImagesFound:false
    }

    getPostDetails = (postLink) => {
         if(postLink.replace(" ","").length === 0) {
            return;
        }
        postLink = obtainPostUniqueLinkFromURL(postLink)
        console.log("Post Link = ",postLink)
        this.setState({loadingPosts:true,postLinkPosts:[]})
        fetch(encodeURI("https://www.instagram.com/p/"+postLink+"/?__a=1"))
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if ("graphql" in response) {
                if("edge_sidecar_to_children" in response.graphql.shortcode_media) {
                    //Multiple Photos found for single post
                    let apiResponse = response.graphql.shortcode_media;
                    let multiplePosts = apiResponse.edge_sidecar_to_children.edges;
                    let posts = []
                    for(let i = 0; i < multiplePosts.length;i++) {
                        let post = multiplePosts[i].node
                        let postItemURL = post.is_video ? post.video_url : post.display_url
                        let postDetails = {
                            postImageURL:postItemURL,
                            postCaption:null,
                            likesCount:null,
                            postOwnerUsername:null,
                            isVideo:post.is_video
                        }
                        posts.push(postDetails)
                    }
                    this.setState({postLinkTopPosts:posts,loadingPosts:false,postLink:postLink,errorOccured:false,multipleImagesFound:true})

                }
                else {
                    //If only single post is present
                    let apiResponse = response.graphql.shortcode_media;
                    let postItemURL = apiResponse.is_video ? apiResponse.video_url : apiResponse.display_url
                    let postDetails =  {
                        postImageURL:postItemURL,
                        postCaption:apiResponse.edge_media_to_caption.edges.length >=1 ? apiResponse.edge_media_to_caption.edges[0].node.text : "",
                        likesCount:apiResponse.edge_media_preview_like.count,
                        postOwnerUsername:apiResponse.owner.username,
                        isVideo:apiResponse.is_video
                    }
                    this.setState({postLinkTopPosts:[postDetails],loadingPosts:false,postLink:postLink,errorOccured:false,multipleImagesFound:false})
                }
                
            }
            else {
                console.log("GraphQL not found")
                this.setState({errorOccured:true,loadingPosts:true})
            }
        })
        .catch(error => {
            console.log("SOme other error = "+error)
            this.setState({errorOccured:true,loadingPosts:true})
        })
    }

    onSearchInputChange = (event) => {
        this.setState({
            postSearchInput:event.target.value
        })
    }

    render() {
        let searchResultHeader = null;
        if(this.state.multipleImagesFound) {
            searchResultHeader = <p style={{textAlign:"center"}}>Multiple results found for the given post link</p>
        }
        else {
            searchResultHeader = this.state.postLinkTopPosts.length >= 1 ? <p style={{textAlign:"center"}}>Search results for given post link</p> : null
        }
        let howToUseSteps = constants.postGrabSteps;
        return (
            <React.Fragment>
                <SearchBar 
                    searchBoxPlaceHolder="Enter the postlink"
                    value={this.state.postSearchInput} 
                    clicked={() => this.getPostDetails(this.state.postSearchInput)} 
                    changed={(event) => this.onSearchInputChange(event)}
                    />
                <div className="hashtags-posts">
                    <div className="top-hashtag-posts">
                        {
                            this.state.errorOccured ? <NotFoundError errorMessage="No posts found for the given link"/> :
                            this.state.loadingPosts ? <Loading loadingMessage="Loading Posts... Please wait.."/> : <Posts header={searchResultHeader} hashTag={this.state.hashTag} posts={this.state.postLinkTopPosts}/>
                        }
                    </div>
                    <HowToUse steps={howToUseSteps}/>
                    {/* <div className="top-hashtags">
                        <ListItems/>
                    </div> */}  
                </div>
            </React.Fragment>

        )
    }
}

export default PostGrab;