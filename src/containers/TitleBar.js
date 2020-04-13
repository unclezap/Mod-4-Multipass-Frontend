import React from 'react';

function TitleBar(props) {
    return(
        // This will render as title, or welcome according to state of APP / props being passed.
        <div>
            <h1>Welcome to the {props.currentTitle}!</h1>
        </div>
    );
};

export default TitleBar;