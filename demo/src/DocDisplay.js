import React from 'react';

const renderProp = (prop) => {
    if (prop.type === 'Shape') {
        return (
            <div>
                {prop.type} ({prop.required ? 'required' : 'optional'}): {prop.description}
                <div style={{
                    paddingLeft: '40px'
                }}>
                    {Object.keys(prop.shape).map(key => (
                        <div key={key}>
                            <h4>{key}</h4>
                            {renderProp(prop.shape[key])}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    if (prop.type === 'ArrayOf') {
        return (
            <div>
                {prop.type} ({prop.required ? 'required' : 'optional'}): {prop.description}
                <div style={{
                    paddingLeft: '40px'  
                }}>
                    {renderProp(prop.arrayOf)}
                </div>
            </div>
        );
    }

    return (
        <p>
            {prop.type} ({prop.required ? 'required' : 'optional'}): {prop.description}
        </p>
    );
}

const DocDisplay = ({ documentation }) => (
    <div style={{
        padding: '40px',
        textAlign: 'left'  
    }}>
        <h1>{documentation.name}</h1>
        <h2>{documentation.description}</h2>
        {Object.keys(documentation.props).map(propName => (
            <div key={propName}>
                <h2>{propName}</h2>
                <div>{renderProp(documentation.props[propName].type().getDocs(documentation.props[propName]))}</div>
            </div>
        ))}
    </div>
);

export default DocDisplay;