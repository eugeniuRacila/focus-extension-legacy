import { ChangeEvent, useEffect, useState } from 'react';
import { isEmptyObject } from '../../utils';
import UnfocusedResource from '../unfocused-resource';
import './Options.css';

const Options = () => {
  const [websiteDomainInput, setWebsiteDomainInput] = useState('');
  const [websitesList, setWebsitesList] = useState<Array<string>>([]);

  useEffect(() => {
    // chrome.storage.sync.get(['focusWebsites'], (store) => {
    //   if (!isEmptyObject(store)) {
    //     setWebsitesList(store['focusWebsites']);
    //   }
    // });
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    chrome.storage.sync.get(['focusWebsites'], (store) => {
      console.log('store initial value -> ', store);

      if (isEmptyObject(store)) {
        chrome.storage.sync.set({ focusWebsites: [websiteDomainInput] }, () => {
          console.log('Created a new store');
          console.log('Stored the website for focus ->', websiteDomainInput);
          setWebsitesList(store.focusWebsites);
        });
      } else {
        store.focusWebsites.push(websiteDomainInput);
        chrome.storage.sync.set(store, () => {
          console.log('Stored the website for focus ->', websiteDomainInput);
          console.log('store.focusWebsites ->', store.focusWebsites);

          setWebsitesList(store.focusWebsites);
        });
      }
    });

    setWebsiteDomainInput('');
  };

  const handleWebsiteRemoval = async (index: number) => {
    chrome.storage.sync.get(['focusWebsites'], (store) => {
      store.focusWebsites.splice(index, 1);

      chrome.storage.sync.set(store, () => {
        console.log('Removed the website from focus');
      });

      setWebsitesList(store.focusWebsites);
    });
  };

  return (
    <div className="options">
      <nav className="navigation-bar">
        <div className="navigation-bar__logo">
          <img
            alt="focus logo alpha build"
            height={24}
            src="assets/focus_logo-alpha-build.png"
          />
        </div>
      </nav>
      <div className="options__content">
        <section id="options-cta" className="options-cta">
          <div className="options-cta__text-content">
            <h3 className="options-cta__text-action text__action text__action--uppercase">
              Manage unfocused sources
            </h3>
            <h2 className="options-cta__text-heading-2 text__heading-2">
              Let’s level up your focus, by unfocusing the irrelevant
            </h2>
            <p className="options-cta__text-body text__body">
              Want to receive a monthly email in your inbox with awesome free
              Webflow cloneables, resources.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="options-cta-form"
          >
            <input
              className="options-cta-form__input"
              id="domain"
              name="domain"
              placeholder="Domain name.."
              spellCheck={false}
              type="text"
            />
            <div className="options-cta-form__button-wrapper">
              <button className="options-cta-form__button" type="submit">
                Unfocus
              </button>
            </div>
          </form>
        </section>
        <section
          className="manage-unfocused-websites"
          id="manage-unfocused-websites"
        >
          <UnfocusedResource faviconSrc="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://instagram.com&size=128" />
          <UnfocusedResource faviconSrc="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://youtube.com&size=128" />
          <UnfocusedResource faviconSrc="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://reddit.com&size=128" />
        </section>
      </div>
      {/* <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
        <label style={{ marginRight: 16 }}>
          <input
            name="websiteDomain"
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
              setWebsiteDomainInput(value)
            }
            type="text"
            value={websiteDomainInput}
          />
        </label>
        <button>Add website</button>
      </form>
      <br />
      <ul>
        {websitesList.length !== 0 &&
          websitesList.map((website, index) => (
            <div
              key={website}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}
            >
              <li>{website}</li>
              <button onClick={() => handleWebsiteRemoval(index)}>x</button>
            </div>
          ))}
      </ul> */}
    </div>
  );
};

export default Options;
