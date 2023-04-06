import React, { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // cleanup function to remove the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // if at the top of the screen - remove sticky, otherwise set it
    const handleScroll = () => {
        if (window.pageYOffset > 0) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    return (
        <nav className={isSticky ? 'sticky' : ''}>
            <ul>
                <li><a href="/#">לא יודע 3</a></li>
                <li><a href="/#">לא יודע 2</a></li>
                <li><a href="/#">לא יודע 1</a></li>
                <li><a href="/#">משרות לפי אזור</a></li>
                <li><a href="https://www.gvanim.org.il">ראשי</a></li>
            </ul>
            <div class="logo">
                <a href="https://www.gvanim.org.il">
                    <img src={require('../../Sources/gvanim-logo.png')} alt="Logo" />
                </a>
            </div>
        </nav>
    );
}
