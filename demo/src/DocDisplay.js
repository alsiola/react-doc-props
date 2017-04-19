import React from 'react';

const display = (value) => {
    if (typeof value === 'object') {
        return JSON.stringify(value, null, 2);
    }
    if (Array.isArray(value)) {
        return `[ ${value.map(v => display(v)).join(', ')} ]`;
    }
    return value;
}

const renderProp = (prop, name) => {
    if (prop.type === 'Shape') {
        return (
            <div>
                <p><i>{prop.type} ({prop.required ? 'required' : 'optional'})</i></p>
                <p>{prop.description}</p>
                {prop.default &&
                    <p>Default value: {display(prop.default)}</p>
                }
                <h3>Shape of {name}:</h3>
                <div style={{
                    borderLeft: '2px solid #000',
                    marginTop: '10px',
                    paddingLeft: '40px'
                }}>
                    {Object.keys(prop.shape).map(key => (
                        <div key={key}>
                            <h4>{key}</h4>
                            {renderProp(prop.shape[key], key)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (prop.type.substr(0, 8) === 'Array of') {
        return (
            <div>
                <p><i>{prop.type} ({prop.required ? 'required' : 'optional'})</i></p>
                <p>{prop.description}</p>
                {prop.default &&
                    <p>Default value: {display(prop.default)}</p>
                }
                <h3>Array of type:</h3>
                <div style={{
                    borderLeft: '2px solid #000',
                    marginTop: '10px',
                    paddingLeft: '40px'
                }}>
                    {renderProp(prop.arrayOf)}
                </div>
            </div>
        );
    }

    return (
        <div >
            <p><i>{prop.type} ({prop.required ? 'required' : 'optional'})</i></p>
            <p>{prop.description}</p>
            {prop.default &&
                <p>Default value: {display(prop.default)}</p>
            }
        </div>
    );
}

const getPropsDocArray= (documentation) => {
    return Object.keys(documentation.props).map(name => {
        return {
            name,
            docs: documentation.props[name].type().getDocs(documentation.props[name])
        }
    });
}

const defaultRenderer = ( name, description, propDocs ) => (
    <div style={{
        padding: '40px',
        textAlign: 'left'
    }}>
        <h1>{name}</h1>
        <h2>{description}</h2>
        {propDocs.map(prop => (
            <div key={prop.name}>
                <h2>{prop.name}</h2>
                <div>{renderProp(prop.docs, prop.name)}</div>
            </div>
        ))}
    </div>
);

const DocDisplay = ({ documentation, customRenderer }) => {
    const propDocs = getPropsDocArray(documentation);
    const render = customRenderer || defaultRenderer;
    return (
        render(documentation.name, documentation.description, propDocs)
    );
}

export default DocDisplay;