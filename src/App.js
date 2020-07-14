import React,{Component} from 'react';
import './App.css';
import InstaGrab from './containers/InstaGrab/InstaGrab';
import Layout from './containers/Layout/Layout';

import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/" exact component={InstaGrab}/>
      </Layout>
    )
  }
}
export default App;
