import { useEffect, useState } from 'react';
import {
  addUnfocusedResource,
  getUnfocusedResources,
  removeUnfocusedResource,
} from '../../services/chromium/sync-storage';
import UnfocusedResource from '../unfocused-resource';
import './Options.css';

const Options = () => {
  const [resourceDomainValue, setResourceDomainInput] = useState('');
  const [unfocusedResources, setUnfocusedResources] = useState<string[]>([]);

  useEffect(() => {
    const setInitialUnfocusedResources = async () => {
      try {
        const unfocusedResources = await getUnfocusedResources();

        setUnfocusedResources(unfocusedResources);
      } catch (error) {
        console.warn(error);
      }
    };

    setInitialUnfocusedResources();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const updatedResources = await addUnfocusedResource(resourceDomainValue);

    setUnfocusedResources(updatedResources);
    setResourceDomainInput('');
  };

  const handleResourceRemoval = async (resource: string) => {
    const updatedResources = await removeUnfocusedResource(resource);

    setUnfocusedResources(updatedResources);
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
          <form onSubmit={handleSubmit} className="options-cta-form">
            <input
              className="options-cta-form__input"
              id="domain"
              name="domain"
              onChange={(e) => setResourceDomainInput(e.target.value)}
              placeholder="Domain name.."
              spellCheck={false}
              type="text"
              value={resourceDomainValue}
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
          {unfocusedResources.map((resource) => (
            <UnfocusedResource
              handleResourceRemoval={handleResourceRemoval}
              resource={resource}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Options;
