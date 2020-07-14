import React, {Component} from 'react';
import NotFoundError from '../../components/NotFoundError/NotFoundError';
import Posts from '../../components/Posts/Posts';
import Loading from '../../components/Loader/Loader';
import {obtainIGTVUniqueLinkFromURL} from '../../utils';

class IGTVGrab extends Component {

    state = {
        igtvSearchInput:"",
        postLinkTopPosts:[],
        loadingPosts:false,
        hashTag:null,
        multipleImagesFound:false
    }

    getPostDetails = (postLink) => {
         if(postLink.replace(" ","").length === 0) {
            return;
        }
        postLink = obtainIGTVUniqueLinkFromURL(postLink)
        console.log("Post Link = ",postLink)
        this.setState({loadingPosts:true,postLinkPosts:[]})
        fetch(encodeURI("https://www.instagram.com/p/"+postLink+"/?__a=1"))
        .then(response => response.json())
        .then(response => {
            console.log(response)
            if ("graphql" in response) {
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
            else {
                this.setState({errorOccured:true,loadingPosts:true})
            }
        })
        .catch(error => {
            console.log("SOme other error = "+error)
            this.setState({errorOccured:true,loadingPosts:true})
        })
    }

    componentDidMount() {
        this.getPostDetails(this.props.postLink);
    }

    componentDidUpdate(prevProps) {
        if(this.props.postLink !== prevProps.postLink) {
            this.getPostDetails(this.props.postLink);
        }
    }

    render() {
        let searchResultHeader = null;
        if(this.state.multipleImagesFound) {
            searchResultHeader = <p style={{textAlign:"center"}}>Multiple results found for the given post link</p>
        }
        else {
            searchResultHeader = this.state.postLinkTopPosts.length >= 1 ? <p style={{textAlign:"center"}}>Search results for given IGTV link</p> : null
        }
        return (
            <React.Fragment>
                <div className="hashtags-posts">
                    <div className="top-hashtag-posts">
                        {
                            this.state.errorOccured ? <NotFoundError errorMessage="No posts found for the given link"/> :
                            this.state.loadingPosts ? <Loading loadingMessage="Loading IGTV Video... Please wait.."/> : <Posts header={searchResultHeader} hashTag={this.state.hashTag} posts={this.state.postLinkTopPosts}/>
                        }
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default IGTVGrab;