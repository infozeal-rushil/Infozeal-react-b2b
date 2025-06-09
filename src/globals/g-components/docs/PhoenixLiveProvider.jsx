import React from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import { LiveProvider } from 'react-live';
import { defaultProps } from 'prism-react-renderer';
import { transformTSCode } from '@globals/g-helpers/utils';
const PhoenixLiveProvider = ({
  children,
  code,
  noInline,
  scope,
  transformCode
}) => {
  return (
    <LiveProvider
      code={code}
      scope={Object.assign(
        Object.assign(Object.assign({}, ReactBootstrap), React),
        scope
      )}
      noInline={noInline}
      transformCode={
        transformCode
          ? transformCode
          : code => transformTSCode(code.replace(/^import.*$/gm, ''))
      }
      language="jsx"
      {...defaultProps}
    >
      {children}
    </LiveProvider>
  );
};
export default PhoenixLiveProvider;
