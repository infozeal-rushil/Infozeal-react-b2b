var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import Button from '@globals/g-components/base/Button';
import { useAppContext } from '@globals/g-providers/AppProvider';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import classNames from 'classnames';
const ThemeToggler = _a => {
  var { slim, className } = _a,
    rest = __rest(_a, ['slim', 'className']);
  const {
    config: { theme, isRTL },
    toggleTheme
  } = useAppContext();
  return (
    <Button
      className={classNames(className, 'border-0 p-0', {
        'lh-1': slim
      })}
      onClick={() => toggleTheme()}
      {...rest}
    >
      <div
        className={classNames('theme-control-toggle', {
          'theme-control-toggle-slim pe-2': slim
        })}
      >
        <OverlayTrigger
          placement={slim ? 'bottom' : isRTL ? 'right' : 'left'}
          overlay={
            <Tooltip id="ThemeColor" style={{ position: 'fixed' }}>
              {slim
                ? 'Switch theme'
                : theme === 'dark'
                ? 'Switch to light theme'
                : 'Switch to dark theme'}
            </Tooltip>
          }
        >
          <div className="theme-control-toggle-label">
            <FeatherIcon
              className={classNames({
                'me-1 d-none d-sm-block': slim
              })}
              icon={theme === 'dark' ? 'moon' : 'sun'}
              size={slim ? 10 : 16}
            />
            {slim && (
              <span className="fs-9 fw-bold">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
            )}
          </div>
        </OverlayTrigger>
      </div>
    </Button>
  );
};
export default ThemeToggler;
