import { useAppContext } from '@globals/g-providers/AppProvider';
import { Col, Row } from 'react-bootstrap';
import topDefault from '@src/assets/img/generic/top-default.png';
import topDefaultDarker from '@src/assets/img/generic/top-default-dark.png';
import navTopLight from '@src/assets/img/generic/navbar-top-style-light.png';
import navTopLighter from '@src/assets/img/generic/top-style-lighter.png';
import RadioItem from './RadioItem';
import classNames from 'classnames';
import WarningMessage from '@globals/g-components/common/WarningMessage';
import { useSettingsPanelContext } from '@globals/g-providers/SettingsPanelProvider';
const TopNavbarAppearance = ({ className }) => {
  const {
    config: { isDark, navbarTopAppearance },
    setConfig
  } = useAppContext();
  const {
    settingsPanelConfig: { disableHorizontalNavbarAppearance }
  } = useSettingsPanelContext();
  const handleChange = e => {
    const { value } = e.target;
    setConfig({
      navbarTopAppearance: value
    });
  };
  return (
    <div className={classNames(className, 'setting-panel-item')}>
      <h5 className="setting-panel-item-title">Horizontal Navbar Appearance</h5>
      <Row className="gx-2">
        <Col xs={6}>
          <RadioItem
            label="Default"
            name="top-navbar-appearance"
            value="default"
            thumb={isDark === false ? topDefault : topDefaultDarker}
            checked={navbarTopAppearance === 'default'}
            handleChange={handleChange}
            disabled={disableHorizontalNavbarAppearance}
          />
        </Col>
        <Col xs={6}>
          <RadioItem
            label={isDark === false ? 'Darker' : 'Lighter'}
            name="top-navbar-appearance"
            value="darker"
            thumb={isDark === false ? navTopLight : navTopLighter}
            checked={navbarTopAppearance === 'darker'}
            handleChange={handleChange}
            disabled={disableHorizontalNavbarAppearance}
          />
        </Col>
      </Row>
      {disableHorizontalNavbarAppearance && (
        <WarningMessage message="You can't update horizontal navbar appearance here" />
      )}
    </div>
  );
};
export default TopNavbarAppearance;
