import classNames from 'classnames';
import React from 'react';
import { Container } from 'react-bootstrap';
const PhoenixContainer = ({ small, className, children }) => {
    return (<Container bsPrefix={small ? 'container-small' : 'container'} className={classNames(className)}>
      {children}
    </Container>);
};
export default PhoenixContainer;
