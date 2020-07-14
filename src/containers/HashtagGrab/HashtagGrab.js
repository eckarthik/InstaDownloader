import React, {Component} from 'react';
import NotFoundError from '../../components/NotFoundError/NotFoundError';
import Posts from '../../components/Posts/Posts';
import Loading from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';

import './HashtagGrab.css';

class HashtagGrab extends Component {
    state = {
        hashtagSearchInput:"",
        hashtagTopPosts:[],
        loadingPosts:false,
        hashTag:null,
        endPostNumber:0
    }

    async getPostsWithHashtag(hashtag) {
         if(hashtag.replace(" ","").length === 0) {
            return;
        }
        hashtag = hashtag.replace("#","")
        if(this.state.hashTag !== hashtag) {
            this.setState({hashtagTopPosts:[],endPostNumber:0}) //Bring back to normal when the userinput hashtag changes
        }
        this.setState({loadingPosts:true})
        let posts = []
        const firstResponse = await fetch("https://www.instagram.com/explore/tags/"+hashtag+"/?__a=1").then(response => response.json())
        if("graphql" in firstResponse) {
            const apiResponse = firstResponse.graphql.hashtag;
            const hashtagPosts = apiResponse.edge_hashtag_to_media.edges.splice(this.state.endPostNumber,this.state.endPostNumber+15);
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
                    postCaption:post.node.edge_media_to_caption.edges.length > 0 ? post.node.edge_media_to_caption.edges[0].node.text : "",
                    likesCount:post.node.edge_liked_by.count,
                    postOwnerUsername:null,
                    isVideo:post.node.is_video
                })
            }
            this.setState({hashtagTopPosts:this.state.hashtagTopPosts.concat(posts),loadingPosts:false,hashTag:hashtag,errorOccured:false,endPostNumber:this.state.endPostNumber+15})
        }
        else {
            this.setState({errorOccured:true,loadingPosts:false});
        }
        
    }

    componentDidUpdate(prevProps) {
        if(this.props.hashtag !== prevProps.hashtag) {
            this.getPostsWithHashtag(this.props.hashtag);
        }
    }

    componentDidMount() {
        this.getPostsWithHashtag(this.props.hashtag);
    }

    render() {
        let searchResultHeader = <p style={{textAlign:"center"}}>Search results for <b>#{this.state.hashTag}</b></p>
        return (
            <React.Fragment>
                <div className="hashtags-posts">
                    <div className="top-hashtag-posts">
                        {
                            this.state.errorOccured ? <NotFoundError errorMessage="No posts found for the given hashtag"/> :
                            this.state.loadingPosts && this.state.endPostNumber === 0 ? <Loading loadingMessage="Loading Posts for hashtag... Please wait.."/> : 
                                <Posts header={searchResultHeader} hashTag={this.state.hashTag} posts={this.state.hashtagTopPosts}/>
 
                        }
                    </div>
                    {
                        this.state.endPostNumber >=15 && this.state.endPostNumber <=60 && this.state.loadingPosts ? <Loading loadingMessage="Fetching more posts.. please bear for sometime"/> 
                        :null
                    }
                    {this.state.hashtagTopPosts.length > 0 && this.state.hashtagTopPosts.length <=61 ? <div style={{margin:"auto"}}>
                        <Button 
                            buttonText="Load More"
                            buttonBackgroundColor="#5352ed" 
                            buttonBorderColor="#5352ed" 
                            buttonTextColor="white"
                            clicked={() => this.getPostsWithHashtag(this.state.hashTag)}
                        />
                    </div> : null}
                    
                </div>
            </React.Fragment>

        )
    }
}

export default HashtagGrab;