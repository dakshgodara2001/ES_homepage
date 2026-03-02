import Image from "next/image";
import React from "react";
import headerLogo from '../assets/images/headerImage.png';

function Header() {
    return (
        <div className="header">
            <div className="header__logo">
                <Image src={headerLogo} alt="Header logo" width={40} height={40} />
            </div>
            <span className="header__title">ES // Articles</span>
        </div>
    );
}

export default Header;
