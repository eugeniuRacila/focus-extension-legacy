import { injectFocusElement } from '../../core/inject';
import { isEmptyObject } from '../../utils';
import { observeBodyCreation } from '../../utils/dom-mutation-observer';

const runContentScript = async () => {
  const website = await chrome.storage.sync.get(['focusWebsites']);

  if (
    !isEmptyObject(website) &&
    website['focusWebsites'].find((domain: string) =>
      window.location.hostname.includes(domain)
    )
  ) {
    observeBodyCreation().then((body) => {
      injectFocusElement(body);
    });
  }
};

// Inject Focus JSX element
runContentScript();
