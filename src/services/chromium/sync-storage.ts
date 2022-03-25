import { unfocusedResources } from '../../types/chromium-storage';
import { isEmptyObject } from '../../utils';

// TODO: Implement addUnfocusResource
export const addUnfocusedResource = async (
  resourceName: string
): Promise<string[]> =>
  new Promise<string[]>((resolve, _) => {
    chrome.storage.sync.get([unfocusedResources], (result) => {
      console.log('result in isEmptyObject -> ', result);

      if (isEmptyObject(result)) {
        result[unfocusedResources] = [];
      }

      result[unfocusedResources].push(resourceName);

      chrome.storage.sync.set(result, () => {
        resolve(result[unfocusedResources]);
      });
    });
  });

export const getUnfocusedResources = async (): Promise<string[]> =>
  new Promise((resolve, reject) => {
    chrome.storage.sync.get([unfocusedResources], (result) => {
      console.log('Result value ->');
      console.log(result[unfocusedResources]);

      if (result[unfocusedResources] === undefined) {
        reject(`${unfocusedResources} key's value is undefined`);
      } else {
        resolve(result[unfocusedResources]);
      }
    });
  });

export const removeUnfocusedResource = async (
  resourceName: string
): Promise<string[]> =>
  new Promise<string[]>((resolve, reject) => {
    chrome.storage.sync.get([unfocusedResources], (result) => {
      const indexOfResource = result[unfocusedResources].indexOf(resourceName);

      if (indexOfResource === -1) {
        reject('Resource name not found');
      } else {
        result[unfocusedResources].splice(indexOfResource, 1);

        chrome.storage.sync.set(result, () => {
          resolve(result[unfocusedResources]);
        });
      }
    });
  });
