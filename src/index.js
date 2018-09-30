import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// To access the component from outside react

ReactDOM.render(<App ref={(ourComponent) =>{
    window.ourComponent = ourComponent
}}/>, document.getElementById('root'));
registerServiceWorker();
