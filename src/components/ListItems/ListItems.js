import React, {Component} from 'react';
import './ListItems.css';

const ListItems = (props) => {
    return (
        <div className="list">
            <div className="list-header">
                Top Hashtags
            </div>
            <div className="list-items">
                <ul>
                    <li class="list-item">
                        #DarkNetflix
                    </li>
                    <li class="list-item">
                        #Baahubali2
                    </li>
                    <li class="list-item">
                        #CoronaVirus
                    </li>
                    <li class="list-item">
                        #Memes
                    </li>
                    <li class="list-item">
                        #SiliconValley
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ListItems;