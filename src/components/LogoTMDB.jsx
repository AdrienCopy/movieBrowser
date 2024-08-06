import React from 'react';

const Logo = ({className, src }) => {
    return (
        <img className={className} src={src} />
    );
}

export default Logo;