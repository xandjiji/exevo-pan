import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const fetchAndSaveLocally = async (key, url) => {
    const response = await fetch(url);
    const data = await response.json();

    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
}

const run = async () => {
    await fetchAndSaveLocally('characterData', 'https://exevopan-data.netlify.app/LatestCharacterData.json');

    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

run();