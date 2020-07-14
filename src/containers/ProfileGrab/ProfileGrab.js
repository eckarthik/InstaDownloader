import React, { Component } from 'react';
import InstaProfileCard from '../../components/InstaProfileCard/InstaProfileCard';
import Loader from '../../components/Loader/Loader';
import NotFoundError from '../../components/NotFoundError/NotFoundError';

class ProfileGrab extends Component {

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

    componentDidUpdate(prevProps) {
        if(this.props.username !== prevProps.username) {
            this.getProfileDetails(this.props.username);
        }
    }

    componentDidMount() {
        this.getProfileDetails(this.props.username)
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
        .catch(error => {
            this.setState({errorOccured:true,dataLoading:false})
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.dataLoading ? <Loader loadingMessage="Fetching profile.. Please wait"/> : null}
                {
                    
                    this.state.errorOccured ? <NotFoundError errorMessage="The profile you were searching for is invalid"/> :
                    this.state.userDetailsLoaded ? <InstaProfileCard {...this.state.userDetails}/> : null

                }
            </React.Fragment>
    
        );
    }
}

export default ProfileGrab;