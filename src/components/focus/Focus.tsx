import Frame, { FrameContextConsumer } from 'react-frame-component';

import './Focus.css';

const Focus = () => {
  return (
    <Frame
      head={[
        <link
          type="text/css"
          rel="stylesheet"
          href={chrome.runtime.getURL('/static/css/content.css')}
        ></link>,
      ]}
      frameBorder="0"
      style={{ overflow: 'hidden' }}
    >
      <FrameContextConsumer>
        {
          // Callback is invoked with iframe's window and document instances
          () => <h1 className="focus">Keep of focusing, man</h1>
        }
      </FrameContextConsumer>
    </Frame>
  );
};

export default Focus;
