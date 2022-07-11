import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './header.styles.css';

import Sidebar from '../sidebar/Sidebar.component.jsx';

const Header = () => {
    const [sidebar, setSidebar] = useState('');
    const showSidebar = () => {
        setSidebar('show');
    };
    const hideSidebar = () => {
        setSidebar('');
    };

    return (
        <div>
            <header className='header'>
                <Link to="" className='headline-link'>
                    <h1>
                        Bookstore
                    </h1>
                </Link>
                
                <button className="hamburger-btn" onClick={showSidebar}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>

                <Sidebar className={sidebar} hideSidebar={hideSidebar}/>
            </header>
        </div>
    );
};

export default Header;