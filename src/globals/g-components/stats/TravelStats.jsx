import Badge from 'components/base/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const TravelStats = ({ children, title, amount, subtitle = 'From last month', badgeLabel, badgeBg = 'primary', badgeIcon = faPlus }) => {
    return (<>
      <h5 className="text-body mb-4">{title}</h5>
      <div className="d-md-flex flex-between-center">
        {children}
        <div className="mt-4 mt-md-0">
          <h3 className="text-body-highlight mb-2"> {amount}</h3>
          <Badge variant="phoenix" bg={badgeBg} className="fs-10 me-2">
            <FontAwesomeIcon icon={badgeIcon} className="me-1"/>
            {badgeLabel}
          </Badge>
          <span className="fs-9 text-body-secondary d-block d-sm-inline mt-1">
            {subtitle}
          </span>
        </div>
      </div>
    </>);
};
export default TravelStats;
