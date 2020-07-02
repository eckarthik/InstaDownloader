import React, {Component} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ListItems from '../../components/ListItems/ListItems';
import Posts from '../../components/Posts/Posts';
import Loading from '../../components/Loader/Loader';
import './HashtagGrab.css';

class HashtagGrab extends Component {
    state = {
        hashtagSearchInput:"",
        hashtagTopPosts:[],
        loadingPosts:false
    }

    getPostsWithHashtag = (hashtag) => {
        this.setState({loadingPosts:true})
        fetch("https://www.instagram.com/explore/tags/"+hashtag+"/?__a=1")
        .then(response => response.json())
        .then(response => {
            let apiResponse = response.graphql.hashtag;
            let hashtagPosts = apiResponse.edge_hashtag_to_media.edges.map(post => {
                console.log(post)
                return {
                    postImageURL:post.node.display_url,
                    postCaption:post.node.edge_media_to_caption.edges[0].node.text,
                    likesCount:post.node.edge_liked_by.count
                }
            });
            this.setState({hashtagTopPosts:hashtagPosts,loadingPosts:false,hashTag:hashtag})
        })
    }

    componentDidMount() {
        this.getPostsWithHashtag("DarkSeason3");
    }

    onSearchInputChange = (event) => {
        this.setState({
            hashtagSearchInput:event.target.value
        })
    }

    render() {
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
                        <p style={{textAlign:"center"}}>Search results for <b>#{this.state.hashTag}</b></p>
                        {this.state.loadingPosts ? <Loading loadingMessage="Loading Posts... Please wait.."/> : <Posts posts={this.state.hashtagTopPosts}/>}
                    </div>
                    <div className="top-hashtags">
                        <ListItems/>
                    </div>
                    
                </div>
            </React.Fragment>

        )
    }
}

export default HashtagGrab;