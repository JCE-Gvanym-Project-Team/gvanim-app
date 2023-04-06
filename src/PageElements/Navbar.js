import React, { useState, useEffect } from 'react'

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
                <li><a href="https://www.gvanim.org.il">ראשי</a></li>
                <li><a href="localhost">About</a></li>
                <li><a href="localhost">Services</a></li>
                <li><a href="localhost">Contact</a></li>
            </ul>
            <div class="logo">
                <a href="https://www.gvanim.org.il">
                    <img src={require('../Sources/gvanim-logo.png')} alt="Logo" />
                </a>
            </div>
        </nav>
    );
}
