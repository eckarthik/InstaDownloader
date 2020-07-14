import React, { PureComponent } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import HowToUse from '../../components/HowToUse/HowToUse';
import * as constants from '../../constants';
import HashtagGrab from '../HashtagGrab/HashtagGrab';
import ProfileGrab from '../ProfileGrab/ProfileGrab';
import PostGrab from '../PostGrab/PostGrab';
import IGTVGrab from '../IGTVGrab/IGTVGrab';

class InstaGrab extends PureComponent {

    state = {
        searchInput:"",
        searchType:null
    }

    onSearchSubmit = () => {
        let search = document.getElementsByTagName("input")[0].value;
        if(search.charAt(0) === "#") {
            console.log("User is searching for a hashtag")
            this.setState({searchType:"hashtag",searchInput:search})
        }
        else if(search.search(".com/p/") !== -1) {
            console.log("User is searching for a post")
            this.setState({searchType:"post",searchInput:search})
        }
        else if(search.search(".com/tv/") !== -1) {
            console.log("User is searching for a IGTV video")
            this.setState({searchType:"igtv",searchInput:search})
        }
        else {
            console.log("User is searching for a profile")
            this.setState({searchType:"profile",searchInput:search})
        }
    }


    render() {
        let componentToRender = null;
        console.log("Search Type = ",this.state.searchType)
        if(this.state.searchType === "hashtag") {
            componentToRender = <HashtagGrab hashtag={this.state.searchInput}/>
        }
        else if(this.state.searchType === "post") {
            componentToRender =  <PostGrab postLink={this.state.searchInput}/>;
        }
        else if(this.state.searchType === "igtv") {
            componentToRender =  <IGTVGrab postLink={this.state.searchInput}/>;
        }
        else if(this.state.searchType === "profile") {
            componentToRender = <ProfileGrab username={this.state.searchInput}/>
        }
        else {
            componentToRender = null;
        }
        let howToUseSteps = constants.howToUseSteps;
        return (
            <React.Fragment>
                <SearchBar 
                    searchBoxPlaceHolder="Enter Instagram Username or #hashtag or post link" 
                    // value={this.state.searchInput} 
                    clicked={this.onSearchSubmit} 
                    // changed={(event) => this.onUsernameInputChange(event)}
                    />
                {componentToRender}
                <HowToUse steps={howToUseSteps}/>
            </React.Fragment>
    
        );
    }
}

export default InstaGrab;