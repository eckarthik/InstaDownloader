import React, {Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import NotFoundError from '../../components/NotFoundError/NotFoundError';
import Posts from '../../components/Posts/Posts';
import Loading from '../../components/Loader/Loader';
import HowToUse from '../../components/HowToUse/HowToUse';

import './PostGrab.css';

class PostGrab extends Component {
    state = {
        postSearchInput:"",
        postLinkTopPosts:[],
        loadingPosts:false,
        hashTag:null
    }

    getPostDetails = (postLink) => {
         if(postLink.replace(" ","").length === 0) {
            return;
        }
        postLink = postLink.replace("#","")
        this.setState({loadingPosts:true,postLinkPosts:[]})
        fetch(postLink+"/?__a=1")
        .then(response => response.json())
        .then(response => {
            if ("graphql" in response) {
                let apiResponse = response.graphql.shortcode_media;
                let postDetails =  {
                    postImageURL:apiResponse.display_url,
                    postCaption:apiResponse.edge_media_to_caption ? apiResponse.edge_media_to_caption.edges[0].node.text : "",
                    likesCount:apiResponse.edge_media_preview_like.count
                }
                this.setState({postLinkTopPosts:[postDetails],loadingPosts:false,postLink:postLink,errorOccured:false})
            }
            else {
                this.setState({errorOccured:true})
            }
        })
    }

    componentDidMount() {
        //this.getPostsWithHashtag("DarkSeason3");
    }

    onSearchInputChange = (event) => {
        this.setState({
            postSearchInput:event.target.value
        })
    }

    render() {

        let howToUseSteps = [
            {
                icon:"fas fa-link",
                stepDescription:"Enter the postlink in the search box"
            },
            {
                icon:"fas fa-search",
                stepDescription:"Click on search and wait for the search to complete"
            },
            {
                icon:"fas fa-photo-video",
                stepDescription:"Click on the download button to download the post"
            }
        ]


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
                            this.state.loadingPosts ? <Loading loadingMessage="Loading Posts... Please wait.."/> : <Posts hashTag={this.state.hashTag} posts={this.state.postLinkTopPosts}/>
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