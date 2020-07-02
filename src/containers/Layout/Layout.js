import React,{Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Disclaimer from '../../components/Disclaimer/Disclaimer';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <main>
                    {this.props.children}
                </main>
                <Disclaimer/>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default Layout;