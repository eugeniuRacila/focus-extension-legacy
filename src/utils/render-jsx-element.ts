import { render } from 'react-dom';

/**
 * Render a JSX element into the DOM
 * @param element JSX element to render
 * @param parentElementId id of the parent element in which the JSX element will be appended to
 */
export const renderJsxElement = (
  element: JSX.Element,
  parentElementId: string
): void => {
  render(element, document.getElementById(parentElementId));
};
