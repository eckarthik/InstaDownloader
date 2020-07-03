import React, {Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import NotFoundError from '../../components/NotFoundError/NotFoundError';
import Posts from '../../components/Posts/Posts';
import Loading from '../../components/Loader/Loader';
import HowToUse from '../../components/HowToUse/HowToUse';

import './HashtagGrab.css';

class HashtagGrab extends Component {
    state = {
        hashtagSearchInput:"",
        hashtagTopPosts:[],
        loadingPosts:false,
        hashTag:null
    }

    getPostsWithHashtag = (hashtag) => {
         if(hashtag.replace(" ","").length === 0) {
            return;
        }
        hashtag = hashtag.replace("#","")
        this.setState({loadingPosts:true,hashtagPosts:[]})
        fetch("https://www.instagram.com/explore/tags/"+hashtag+"/?__a=1")
        .then(response => response.json())
        .then(response => {
            if ("graphql" in response) {
                let apiResponse = response.graphql.hashtag;
                let hashtagPosts = apiResponse.edge_hashtag_to_media.edges.map(post => {
                    console.log(post)
                    return {
                        postImageURL:post.node.display_url,
                        postCaption:post.node.edge_media_to_caption ? post.node.edge_media_to_caption.edges[0].node.text : "",
                        likesCount:post.node.edge_liked_by.count
                    }
                });
                this.setState({hashtagTopPosts:hashtagPosts,loadingPosts:false,hashTag:hashtag,errorOccured:false})
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
            hashtagSearchInput:event.target.value
        })
    }

    render() {

        let howToUseSteps = [
            {
                icon:"fas fa-hashtag",
                stepDescription:"Enter the hashtag in the search box"
            },
            {
                icon:"fas fa-search",
                stepDescription:"Click on search and wait for the search to complete"
            },
            {
                icon:"fas fa-photo-video",
                stepDescription:"Click on the download button to download the HD profile picture"
            }
        ]


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
                            this.state.loadingPosts ? <Loading loadingMessage="Loading Posts... Please wait.."/> : <Posts hashTag={this.state.hashTag} posts={this.state.hashtagTopPosts}/>
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