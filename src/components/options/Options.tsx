import { ChangeEvent, useEffect, useState } from 'react';
import { isEmptyObject } from '../../utils';
import './Options.css';

const Options = () => {
  const [websiteDomainInput, setWebsiteDomainInput] = useState('');
  const [websitesList, setWebsitesList] = useState<Array<string>>([]);

  useEffect(() => {
    chrome.storage.sync.get(['focusWebsites'], (store) => {
      if (!isEmptyObject(store)) {
        setWebsitesList(store['focusWebsites']);
      }
    });
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
      <form onSubmit={handleSubmit} style={{ marginBottom: 32 }}>
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
      </ul>
    </div>
  );
};

export default Options;
