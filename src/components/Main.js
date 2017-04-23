import React from 'react';
import Prop from './Prop';

const Main = ({ props }) => (
    <div className='prop-docs--body'>
        {props.map(prop => (
            <Prop key={prop.name} prop={prop} />
        ))}
    </div>
);

export default Main;