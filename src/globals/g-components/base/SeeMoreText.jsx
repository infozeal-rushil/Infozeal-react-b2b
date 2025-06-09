import React from 'react';
import { Link } from 'react-router-dom';
const SeeMoreText = ({ children, as: Tag = 'p', className, maxChars, link }) => {
    return (<Tag className={className}>
      {children.slice(0, maxChars)}
      {children.length > maxChars && (<>
          <>...</>
          <Link to={link} className="fw-semibold">
            see more
          </Link>
        </>)}
    </Tag>);
};
export default SeeMoreText;
