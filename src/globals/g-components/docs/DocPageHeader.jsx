import React from 'react';
import FeatherIcon from 'feather-icons-react';
import classNames from 'classnames';
const DocPageHeader = ({ title, description, children, link, id, className = 'mb-5' }) => {
    return (<div className={classNames(className)} id={id}>
      <h2 className="mb-2 lh-sm">{title}</h2>
      {description && (<p className="text-body-tertiary lead mb-2">{description}</p>)}
      {children}
      {link && (<a href={link.url} className="btn btn-link p-0" rel="noreferrer" target="_blank">
          {link.text}
          <FeatherIcon icon="chevron-right" size={16}/>
        </a>)}
    </div>);
};
export default DocPageHeader;
