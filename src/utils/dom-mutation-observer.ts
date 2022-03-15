export const observeBodyCreation = (): Promise<HTMLBodyElement> => {
  return new Promise((resolve) => {
    if (getBodyElement()) {
      return resolve(getBodyElement()!);
    }

    const observer = new MutationObserver((_) => {
      if (getBodyElement()) {
        resolve(getBodyElement()!);
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
    });
  });
};

const getBodyElement = (): HTMLBodyElement | null =>
  document.querySelector('body');
