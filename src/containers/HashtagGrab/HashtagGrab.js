import React, {Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import NotFoundError from '../../components/NotFoundError/NotFoundError';
import Posts from '../../components/Posts/Posts';
import Loading from '../../components/Loader/Loader';
import HowToUse from '../../components/HowToUse/HowToUse';
import * as constants from '../../constants';

import './HashtagGrab.css';

class HashtagGrab extends Component {
    state = {
        hashtagSearchInput:"",
        hashtagTopPosts:[],
        loadingPosts:false,
        hashTag:null
    }

    async getPostsWithHashtag(hashtag) {
         if(hashtag.replace(" ","").length === 0) {
            return;
        }
        hashtag = hashtag.replace("#","")
        this.setState({loadingPosts:true,hashtagPosts:[]})
        let posts = []
        const firstResponse = await fetch("https://www.instagram.com/explore/tags/"+hashtag+"/?__a=1").then(response => response.json())
        const apiResponse = firstResponse.graphql.hashtag;
        const hashtagPosts = apiResponse.edge_hashtag_to_media.edges.splice(1,15);
        for(let post of hashtagPosts) {
            let postItemURL = null
            if(post.node.is_video) {
                let postKey = post.node.shortcode;
                const secondResponse = await fetch("https://www.instagram.com/p/"+postKey+"/?__a=1").then(response => response.json())
                postItemURL = secondResponse.graphql.shortcode_media.video_url
            }
            else {
                postItemURL = post.node.display_url
            }
            posts.push({
                postImageURL:postItemURL,
                postCaption:post.node.edge_media_to_caption ? post.node.edge_media_to_caption.edges[0].node.text : "",
                likesCount:post.node.edge_liked_by.count,
                postOwnerUsername:null,
                isVideo:post.node.is_video
            })
        }
        this.setState({hashtagTopPosts:posts,loadingPosts:false,hashTag:hashtag,errorOccured:false})
    }

    componentDidMount() {
        //this.getPostsWithHashtag("DarkSeason3");
    }

    onSearchInputChange = (event) => {
        this.setState({
            hashtagSearchInput:event.target.value
        })
    }

    render() {
        let searchResultHeader = <p style={{textAlign:"center"}}>Search results for <b>#{this.state.hashTag}</b></p>
        let howToUseSteps = constants.hashtagGrabSteps;
        return (
            <React.Fragment>
                <SearchBar 
                    searchBoxPlaceHolder="Enter a Hashtag.. For example #DarkNetflix"
                    value={this.state.hashtagSearchInput} 
                    clicked={() => this.getPostsWithHashtag(this.state.hashtagSearchInput)} 
                    changed={(event) => this.onSearchInputChange(event)}
                    />
                <div className="hashtags-posts">
                    <div className="top-hashtag-posts">
                        {
                            this.state.errorOccured ? <NotFoundError errorMessage="No posts found for the given hashtag"/> :
                            this.state.loadingPosts ? <Loading loadingMessage="Loading Posts... Please wait.."/> : <Posts header={searchResultHeader} hashTag={this.state.hashTag} posts={this.state.hashtagTopPosts}/>
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

export default HashtagGrab;