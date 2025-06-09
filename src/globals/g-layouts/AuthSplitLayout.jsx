import Logo from 'components/common/Logo';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const AuthSplitLayout = ({ logo = true, bg, children }) => {
    return (<Row className="vh-100 g-0">
      <Col lg={6} className="position-relative d-none d-lg-block">
        <div className="bg-holder" style={{
            backgroundImage: `url(${bg})`
        }}/>
      </Col>
      <Col lg={6}>
        <Row className="flex-center h-100 g-0 px-4 px-sm-0">
          <Col sm={6} lg={7} xl={6}>
            {logo && (<div className="text-center">
                <Link to="/" className="d-inline-block text-decoration-none mb-4">
                  <Logo text={false} width={58} className="fw-bolder fs-5 d-inline-block"/>
                </Link>
              </div>)}
            {children}
          </Col>
        </Row>
      </Col>
    </Row>);
};
export default AuthSplitLayout;
