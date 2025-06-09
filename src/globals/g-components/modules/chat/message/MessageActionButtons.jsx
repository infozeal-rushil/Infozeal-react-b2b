import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Button from '@globals/g-components/base/Button';
const MessageActionButtons = ({ actions, variant }) => {
  return (
    <>
      <div className="d-sm-none hover-actions align-self-center me-2 start-0">
        <div className="bg-body-emphasis rounded-pill d-flex align-items-center border px-2 actions">
          {actions.map(action => (
            <Button key={action.label} className="btn p-2" type="button">
              <FontAwesomeIcon
                icon={action.icon}
                className={classNames({
                  'text-primary': variant === 'sent'
                })}
              />
            </Button>
          ))}
        </div>
      </div>
      <div className="d-none d-sm-flex">
        <div className="hover-actions position-relative align-self-center">
          {actions.map(action => (
            <Button key={action.label} className="fs-10 p-2" type="button">
              <FontAwesomeIcon
                icon={action.icon}
                className={classNames({
                  'text-primary': variant === 'sent'
                })}
              />
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};
export default MessageActionButtons;
