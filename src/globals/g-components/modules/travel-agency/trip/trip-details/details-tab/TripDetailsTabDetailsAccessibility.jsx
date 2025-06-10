import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const TripDetailsTabDetailsAccessibility = ({ accessibility }) => {
    return (<div className="py-6 px-4">
      <ul className="list-unstyled">
        {accessibility.items.map(item => (<li key={item} className="mb-1 d-flex">
            <FontAwesomeIcon icon={faCircle} className="text-secondary-light me-3 fs-11" transform="down-13 shrink-4"/>
            {item}
          </li>))}
      </ul>
      <p>
        {accessibility.query}{' '}
        <span className="text-body-emphasis fw-semibold">
          {accessibility.promo}
        </span>
      </p>
      <Link to={`to:${accessibility.tel.split(' ').join('')}`}>
        {accessibility.tel}
      </Link>
    </div>);
};
export default TripDetailsTabDetailsAccessibility;
