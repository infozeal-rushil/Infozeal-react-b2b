import { useAppContext } from '@globals/g-providers/AppProvider';
import { Col, Row } from 'react-bootstrap';
import defaultLight from '@src/assets/img/generic/default-light.png';
import defaultDark from '@src/assets/img/generic/default-dark.png';
import topDefault from '@src/assets/img/generic/top-default.png';
import topDefaultDark from '@src/assets/img/generic/top-default-dark.png';
import navComboLight from '@src/assets/img/generic/nav-combo-light.png';
import navComboDark from '@src/assets/img/generic/nav-combo-dark.png';
import dualLight from '@src/assets/img/generic/dual-light.png';
import dualDark from '@src/assets/img/generic/dual-dark.png';
import RadioItem from './RadioItem';
import WarningMessage from '@globals/g-components/common/WarningMessage';
import { useSettingsPanelContext } from '@globals/g-providers/SettingsPanelProvider';
const NavigationType = () => {
  const {
    config: { navbarPosition, isDark },
    setConfig
  } = useAppContext();
  const {
    settingsPanelConfig: { disableNavigationType }
  } = useSettingsPanelContext();
  const handleChange = e => {
    const { value } = e.target;
    setConfig({
      navbarPosition: value
    });
  };
  return (
    <div className="setting-panel-item">
      <h5 className="setting-panel-item-title">Navigation Type</h5>
      <Row className="gx-2">
        <Col xs={6}>
          <RadioItem
            label="Vertical"
            name="nav-type"
            value="vertical"
            thumb={isDark === false ? defaultLight : defaultDark}
            checked={navbarPosition === 'vertical'}
            handleChange={handleChange}
            disabled={disableNavigationType}
          />
        </Col>
        <Col xs={6}>
          <RadioItem
            label="Horizontal"
            name="nav-type"
            value="horizontal"
            thumb={isDark === false ? topDefault : topDefaultDark}
            checked={navbarPosition === 'horizontal'}
            handleChange={handleChange}
            disabled={disableNavigationType}
          />
        </Col>
        <Col xs={6}>
          <RadioItem
            label="Combo"
            name="nav-type"
            value="combo"
            thumb={isDark === false ? navComboLight : navComboDark}
            checked={navbarPosition === 'combo'}
            handleChange={handleChange}
            disabled={disableNavigationType}
          />
        </Col>
        <Col xs={6}>
          <RadioItem
            label="Dual nav"
            name="nav-type"
            value="dual"
            thumb={isDark === false ? dualLight : dualDark}
            checked={navbarPosition === 'dual'}
            handleChange={handleChange}
            disabled={disableNavigationType}
          />
        </Col>
      </Row>
      {disableNavigationType && (
        <WarningMessage message="You can't update navigation type here" />
      )}
    </div>
  );
};
export default NavigationType;
