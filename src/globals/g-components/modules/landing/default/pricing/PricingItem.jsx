import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import { pricingFeatures } from 'data/landing/pricingData';
import React from 'react';
const PricingItem = ({ pricing }) => {
    return (<>
      <div className="px-5">
        <div className="text-center pt-5">
          <img src={pricing.icon} width={48} height={48} alt=""/>
          <h3 className="fw-semibold my-4">{pricing.category}</h3>
        </div>
        <div className="text-center">
          <h1 className="fw-semibold text-primary mb-4">
            $<span className="fw-bolder">{pricing.price}</span>
            <span className="text-body-emphasis fs-7 ms-1 fw-bolder">USD</span>
          </h1>
          <Button variant={pricing.popular ? 'primary' : 'outline-primary'} className={`btn btn-lg mb-6 w-100`}>
            Buy
          </Button>
        </div>
      </div>
      <ul className="fa-ul pricing-list">
        {pricingFeatures.map(feature => (<li key={feature.id} className="mb-4 d-flex align-items-center">
            {pricing.features.includes(feature.id) && (<span className="fa-li">
                <FontAwesomeIcon icon={feature.icon} className="text-primary"/>
              </span>)}
            <span className="text-body-secondary" style={pricing.features.includes(feature.id)
                ? { '--phoenix-text-opacity': 1 }
                : { '--phoenix-text-opacity': 0.5 }}>
              {feature.label}
            </span>
            {feature.new && (<Badge bg="warning" variant="phoenix" className="ms-2 fs-10">
                New
              </Badge>)}
          </li>))}
      </ul>
    </>);
};
export default PricingItem;
