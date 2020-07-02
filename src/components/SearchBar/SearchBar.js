import React from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    return (
        <React.Fragment>
            <div className="search-bar">
                <div className="info">
                    <p>Insta Downloader</p>
                    <p>Download HD Instagram Profile Pictures</p>
                </div>
                <div className="features">
                    <div className="feature">
                        <div className="feature-icon">
                            <i class="fas fa-hashtag"></i>
                        </div>
                        <div className="feature-detail">
                            Download Posts by searching a Hashatg
                        </div>
                    </div>

                    <div className="feature">
                        <div className="feature-icon">
                            <i class="fas fa-file-image"></i>
                        </div>
                        <div className="feature-detail">
                            Download HD Profile Picture
                        </div>
                    </div>

                    <div className="feature">
                        <div className="feature-icon">
                            <i class="fas fa-video"></i>
                        </div>
                        <div className="feature-detail">
                            Download videos
                        </div>
                    </div>
                </div>
            </div>
            <div className="input-box">
                <input type="text" placeholder={props.searchBoxPlaceHolder} onChange={(event) => props.changed(event)} value={props.value}></input>
                <button onClick={props.clicked}>Search</button>
            </div>
        </React.Fragment>

    );
}

export default SearchBar;