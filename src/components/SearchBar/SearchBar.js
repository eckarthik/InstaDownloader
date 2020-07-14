import React from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    return (
        <React.Fragment>
            <div className="search-bar">
                <div className="info">
                    <p>Insta Downloader</p>
                    <p>Your one stop site to download stuff from Instagram</p>
                </div>
                <div className="features">
                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-hashtag"></i>
                        </div>
                        <div className="feature-detail">
                            Download Posts by searching a hashatg
                        </div>
                    </div>

                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-file-image"></i>
                        </div>
                        <div className="feature-detail">
                            Download HD profile picture
                        </div>
                    </div>

                    <div className="feature">
                        <div className="feature-icon">
                            <i className="fas fa-video"></i>
                        </div>
                        <div className="feature-detail">
                            Download videos
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-box">
                <input type="text" placeholder={props.searchBoxPlaceHolder} onKeyPress={(event) => {return event.key === "Enter" ? props.clicked() : ""}} value={props.value}></input>
                <button onClick={props.clicked}>Search</button>
            </div>
        </React.Fragment>

    );
}

export default SearchBar;