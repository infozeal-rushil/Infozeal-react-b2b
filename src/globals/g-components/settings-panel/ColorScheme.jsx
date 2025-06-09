import { useAppContext } from '@globals/g-providers/AppProvider';
import { Col, Row } from 'react-bootstrap';
import defaultLight from '@src/assets/img/generic/default-light.png';
import defaultDark from '@src/assets/img/generic/default-dark.png';
import auto from '@src/assets/img/generic/auto.png';
import RadioItem from './RadioItem';
const ColorScheme = () => {
  const {
    config: { theme },
    setConfig
  } = useAppContext();
  const handleThemeChange = e => {
    const { value } = e.target;
    setConfig({
      theme: value
    });
  };
  return (
    <div className="setting-panel-item mt-0">
      <h5 className="setting-panel-item-title">Color Scheme</h5>
      <Row className="gx-2">
        <Col xs={4}>
          <RadioItem
            label="Light"
            name="theme"
            value="light"
            thumb={defaultLight}
            checked={theme === 'light'}
            handleChange={handleThemeChange}
          />
        </Col>
        <Col xs={4}>
          <RadioItem
            label="Dark"
            name="theme"
            value="dark"
            thumb={defaultDark}
            checked={theme === 'dark'}
            handleChange={handleThemeChange}
          />
        </Col>
        <Col xs={4}>
          <RadioItem
            label="Auto"
            name="theme"
            value="auto"
            thumb={auto}
            checked={theme === 'auto'}
            handleChange={handleThemeChange}
          />
        </Col>
      </Row>
    </div>
  );
};
export default ColorScheme;
