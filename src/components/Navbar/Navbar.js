import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';



class Navbar extends Component {

    state = {
        showSideBar:false
    }

    navLinksRef = React.createRef();
    navLinks = document.querySelectorAll(".nav-links li")

    componentDidMount() {
        window.addEventListener("scroll",this.closeSidebar)
    }
    
    closeSidebar = () => {
        if(this.state.showSideBar) {
            this.showSideBar()
        }
    }


    showSideBar = () => {
        this.setState({showSideBar:!this.state.showSideBar})
        let navLinks = document.querySelectorAll(".nav-links li")
        navLinks.forEach((link,index) => {
            console.log(link)
            if(link.style.animation) {
                link.style.animation = ''
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.6}s`
            }
            
        })
        
    }

    render() {
        let activeClasses = ["nav-links"];
        if(this.state.showSideBar) {
            activeClasses.push("nav-active");
        }
        return (
            <nav>
                <div className="logo">
                    <h4><i className="fab fa-instagram"></i> InstaDown</h4>
                </div>
                <ul ref={this.navLinksRef} className={activeClasses.join(' ')}>
                    <li>
                        <Link to="/" onClick={this.closeSidebar}>Home</Link>
                    </li>
                    <li>
                        <Link to="/postDownload" onClick={this.closeSidebar}>Post-Download</Link>
                    </li>
                    <li>
                        <Link to="/hashtags" onClick={this.closeSidebar}>Hashtags</Link>
                    </li>
                    <li>
                        <Link to="/" onClick={this.closeSidebar}>IGTV</Link>
                    </li>
                </ul>
                <div className="burger" onClick={this.showSideBar}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </nav>
        );
    }
    
}

export default Navbar;