import React, { PureComponent } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import InstaProfileCard from '../../components/InstaProfileCard/InstaProfileCard';
import Loader from '../../components/Loader/Loader';
import NotFoundError from '../../components/NotFoundError/NotFoundError';
import HowToUse from '../../components/HowToUse/HowToUse';

class InstaGrab extends PureComponent {

    state = {
        usernameInput:"",
        userDetails:{
            fullName:"",
            bio:"",
            externalURL:"",
            profilePicURL:"",
            profilePicURLHighDefinition:"",
            followersCount:"",
            followingCount:"",
            postsCount:"",
            userName:""
        },
        userDetailsLoaded:false,
        errorOccured:false,
        dataLoading:false
    }

    componentDidMount() {
        //this.getProfileDetails("virat.kohli")
    }

    getProfileDetails = (username) => {
        if(username.replace(" ","").length === 0) {
            return;
        }
        username = username.replace("@","")
        this.setState({
            userDetailsLoaded:false,
            errorOccured:false,
            dataLoading:true
        })
        fetch("https://instagram.com/"+username+"/?__a=1")
        .then(response => response.json())
        .then(response => {
            if ("graphql" in response) {
                let user = response.graphql.user
                console.log("User Details API Response - ",user)
                this.setState({
                    userDetails:{
                        fullName:user.full_name,
                        userName:user.username,
                        bio:user.biography,
                        externalURL:user.external_url,
                        profilePicURL:user.profile_pic_url,
                        profilePicURLHighDefinition:user.profile_pic_url_hd,
                        followingCount:user.edge_follow.count,
                        followersCount:user.edge_followed_by.count,
                        postsCount:user.edge_owner_to_timeline_media.count
                    },
                    userDetailsLoaded:true,
                    errorOccured:false,
                    dataLoading:false
                })
            }
            else {
                this.setState({errorOccured:true,dataLoading:false})
            } 
           
        })
    }

    onUsernameInputChange = (event) => {
        this.setState({
            usernameInput:event.target.value
        })
    }

    render() {
        let howToUseSteps = [
            {
                icon:"fas fa-keyboard",
                stepDescription:"Enter the Instagram username in the search box"
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
                    searchBoxPlaceHolder="Enter Instagram Username" 
                    value={this.state.usernameInput} 
                    clicked={() => this.getProfileDetails(this.state.usernameInput)} 
                    changed={(event) => this.onUsernameInputChange(event)}
                    />
                {this.state.dataLoading ? <Loader loadingMessage="Fetching profile.. Please wait"/> : null}
                {
                    
                    this.state.errorOccured ? <NotFoundError errorMessage="The profile you were searching for is invalid"/> :
                    this.state.userDetailsLoaded ? <InstaProfileCard {...this.state.userDetails}/> : null

                }
                <HowToUse steps={howToUseSteps}/>
            </React.Fragment>
    
        );
    }
}

export default InstaGrab;