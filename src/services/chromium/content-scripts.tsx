import { injectFocusElement } from '../../core/inject';
import { unfocusedResources } from '../../types/chromium-storage';
import { isEmptyObject } from '../../utils';
import { observeBodyCreation } from '../../utils/dom-mutation-observer';

const runContentScript = async () => {
  const chromiumStorage = await chrome.storage.sync.get([unfocusedResources]);

  if (
    !isEmptyObject(chromiumStorage) &&
    chromiumStorage[unfocusedResources].find((domain: string) =>
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
