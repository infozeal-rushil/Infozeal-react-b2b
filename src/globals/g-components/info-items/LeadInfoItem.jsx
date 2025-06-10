import classNames from 'classnames';
import Unicon from 'components/base/Unicon';
const LeadInfoItem = ({ className, label, value, icon, children }) => {
    return (<div className={classNames(className)}>
      <div className="d-flex align-items-center mb-1">
        <Unicon icon={icon} className="me-2" size={16}/>
        <h5 className="text-body-highlight mb-0">{label}</h5>
      </div>
      {value && <p className="mb-0 text-body-secondary">{value}</p>}
      {children}
    </div>);
};
export default LeadInfoItem;
