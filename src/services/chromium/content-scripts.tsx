import { injectFocusElement } from '../../core/inject';
import { observeBodyCreation } from '../../utils/dom-mutation-observer';

// Inject Focus JSX element
if (window.location.toString().includes('google.com')) {
  observeBodyCreation().then((body) => {
    injectFocusElement(body);
  });
}
