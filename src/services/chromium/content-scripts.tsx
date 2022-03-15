import ReactDOM from 'react-dom';
import Focus from '../../components/focus';
import { DOMMessage, DOMMessageResponse } from '../../types';
import { observeBodyCreation } from '../../utils/dom-mutation-observer';

/**
 * Inject the Focus component
 */
const injectFocus = (body: HTMLBodyElement): void => {
  // Set website's body styles
  body.style.overflow = 'hidden';
  body.style.position = 'relative';

  const app = document.createElement('div');
  app.id = 'focus-extention-root';

  body.appendChild(app);

  ReactDOM.render(<Focus />, document.getElementById('focus-extention-root'));
};

if (window.location.toString().includes('google.com')) {
  observeBodyCreation().then((body) => {
    injectFocus(body);
  });
}

/**
 * Fired when a message is sent from either an extension process or a content
 * script.
 */
const messagesFromReactAppListener = (
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log('[content.js]. Message received', msg);

  const response: DOMMessageResponse = {
    title: document.title,
    headlines: Array.from(document.getElementsByTagName<'h1'>('h1')).map(
      (h1) => h1.innerText
    ),
  };

  console.log('[content.js]. Message response', response);

  sendResponse(response);
};

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
