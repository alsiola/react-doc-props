import React from 'react';
import Header from './Header';
import Main from './Main';

import { propsToDocs } from '../utils';

const DocDisplay = ({ documentation: { name, props, description}, headerComponent, propsComponent }) => {
    const propsArray = propsToDocs(props);
    const Title = headerComponent || Header;
    const Body = propsComponent || Main;
    return (
        <div className='prop-docs'>
            <Title name={name} description={description} />
            <Body props={propsArray} />
        </div>
    );
}

export default DocDisplay;