import { useAppContext } from '@globals/g-providers/AppProvider';
import { Col, Row } from 'react-bootstrap';
import topDefault from '@src/assets/img/generic/top-default.png';
import topDefaultDark from '@src/assets/img/generic/top-default-dark.png';
import topSlim from '@src/assets/img/generic/top-slim.png';
import topSlimDark from '@src/assets/img/generic/top-slim-dark.png';
import RadioItem from './RadioItem';
import WarningMessage from '@globals/g-components/common/WarningMessage';
import { useSettingsPanelContext } from '@globals/g-providers/SettingsPanelProvider';
const HorizontalNavbarShape = () => {
  const {
    config: { isDark, navbarTopShape },
    setConfig
  } = useAppContext();
  const {
    settingsPanelConfig: { disableHorizontalNavbarShape }
  } = useSettingsPanelContext();
  const handleChange = e => {
    const { value } = e.target;
    setConfig({
      navbarTopShape: value
    });
  };
  return (
    <div className="setting-panel-item">
      <h5 className="setting-panel-item-title">Horizontal Navbar Shape</h5>
      <Row className="gx-2">
        <Col xs={6}>
          <RadioItem
            label="Default"
            name="top-nav-shape"
            value="default"
            thumb={isDark === false ? topDefault : topDefaultDark}
            checked={navbarTopShape === 'default'}
            handleChange={handleChange}
            disabled={disableHorizontalNavbarShape}
          />
        </Col>
        <Col xs={6}>
          <RadioItem
            label="Slim"
            name="top-nav-shape"
            value="slim"
            thumb={isDark === false ? topSlim : topSlimDark}
            checked={navbarTopShape === 'slim'}
            handleChange={handleChange}
            disabled={disableHorizontalNavbarShape}
          />
        </Col>
      </Row>
      {disableHorizontalNavbarShape && (
        <WarningMessage message="You can't update horizontal navbar shape here" />
      )}
    </div>
  );
};
export default HorizontalNavbarShape;
