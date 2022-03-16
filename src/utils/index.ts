export const isEmptyObject = (object: Object): boolean =>
  JSON.stringify(object) === '{}';
