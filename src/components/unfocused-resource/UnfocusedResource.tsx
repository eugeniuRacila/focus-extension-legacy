import closeSvg from '../../assets/icons/close.svg';
import './UnfocusedResource.css';

interface UnfocusedResourceProp {
  faviconSrc: string;
}

const UnfocusedResource = ({ faviconSrc }: UnfocusedResourceProp) => {
  return (
    <div className="unfocused-website">
      <div className="unfocused-website__background-image">
        <img alt="" src={faviconSrc} />
      </div>
      <div className="unfocused-website__background-blurred">
        <img alt="" className="unfocused-website__favicon" src={faviconSrc} />
      </div>
      <button className="unfocused-website__remove">
        <img alt="" className="unfocused-website__remove-icon" src={closeSvg} />
      </button>
    </div>
  );
};

export default UnfocusedResource;
