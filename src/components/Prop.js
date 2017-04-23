import React from 'react';
import { arrayOfToDocs, shapeToDocs, display } from '../utils';

const Prop = ({ prop }) => {
    const { name, docs: { type, required, description, shape, arrayOf, default: def } } = prop;
    return (
        <div key={name} className='prop-docs--prop'>

            <p><b>{name}</b> - {type} ({required ? 'required' : 'optional'})</p>
            <p className='prop-docs--prop--description'>{description}</p>

            {def &&
                <p className='prop-docs--prop--default'>Default value: {display(def)}</p>
            }

            {shape && (
                <div className='prop-docs--prop--shape'>
                    {shapeToDocs(shape).map(prop => <Prop key={prop.name} prop={prop} />)}
                </div>
            )}

            {arrayOf && (
                <div className='prop-docs--prop--arrayOf'>
                    <Prop prop={(arrayOfToDocs(arrayOf))} />
                </div>
            )}
        </div>
    );
}

export default Prop;