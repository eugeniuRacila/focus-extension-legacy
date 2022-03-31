import Focus from '../components/focus';
import { renderJsxElement } from '../utils/render-jsx-element';
import { setupBodyStyles } from '../utils/set-up-body';

export const injectFocusElement = (body: HTMLBodyElement): void => {
  setupBodyStyles(body);

  const extensionRootElement = createRootElement();
  body.appendChild(extensionRootElement);

  renderJsxElement(Focus(), extensionRootElement.id);
};

const createRootElement = (): HTMLDivElement => {
  const root = document.createElement('div');
  root.style.zIndex = '2147483647';
  root.id = 'focus-extension-root';

  return root;
};
