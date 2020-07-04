import React,{Component} from 'react';
import './App.css';
import InstaGrab from './containers/InstaGrab/InstaGrab';
import Layout from './containers/Layout/Layout';
import HashtagGrab from './containers/HashtagGrab/HashtagGrab';
import PostGrab from './containers/PostGrab/PostGrab';
import IGTVGrab from './containers/IGTVGrab/IGTVGrab';

import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={InstaGrab}/>
        <Route path="/hashtags" component={HashtagGrab}/>
        <Route path="/postDownload" exact component={PostGrab}/>
        <Route path="/igtv" exact component={IGTVGrab}/>
      </Layout>
    )
  }
}
export default App;
