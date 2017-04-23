import React from 'react';

const Header = ({ name, description }) => (
    <div className='prop-docs--header'>
        <h1>{name}</h1>
        <h2>{description}</h2>
    </div>
);

export default Header;