import './App.css';
import { useEffect, useState } from 'react';
import { DOMMessage, DOMMessageResponse } from '../../types';

const App = () => {
  const [title, setTitle] = useState<string>('');
  const [headlines, setHeadlines] = useState<string[]>([]);

  // useEffect(() => {
  //   chrome.tabs &&
  //     chrome.tabs.query(
  //       {
  //         active: true,
  //         currentWindow: true,
  //       },
  //       (tabs) => {
  //         chrome.tabs.sendMessage(
  //           tabs[0].id || 0,
  //           { type: 'GET_DOM' } as DOMMessage,
  //           ({ headlines, title }: DOMMessageResponse) => {
  //             setTitle(title);
  //             setHeadlines(headlines);
  //           }
  //         );
  //       }
  //     );
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Focus is still under development</p>
        <br />
        <h2>{title}</h2>
        <br />
        <ul>
          {headlines.map((headline, index) => (
            <li key={index}>{headline}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
