import closeSvg from '../../assets/icons/close.svg';
import { getResourceFavIcon } from '../../utils/fav-icon-fetch';
import './UnfocusedResource.css';

interface UnfocusedResourceProp {
  handleResourceRemoval: (resource: string) => void;
  resource: string;
}

const UnfocusedResource = ({
  handleResourceRemoval,
  resource,
}: UnfocusedResourceProp) => {
  let resourceFavIconSrc = getResourceFavIcon(resource);

  return (
    <div className="unfocused-website" title={resource}>
      <div className="unfocused-website__background-image">
        <img alt="" src={resourceFavIconSrc} />
      </div>
      <div className="unfocused-website__background-blurred">
        <img
          alt=""
          className="unfocused-website__favicon"
          src={resourceFavIconSrc}
        />
      </div>
      <button
        className="unfocused-website__remove"
        onClick={() => handleResourceRemoval(resource)}
        title="Remove resource"
      >
        <img alt="" className="unfocused-website__remove-icon" src={closeSvg} />
      </button>
    </div>
  );
};

export default UnfocusedResource;
