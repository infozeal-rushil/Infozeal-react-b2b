import Section from '@globals/g-components/base/Section';
import EcomCartSummaryCard from '@globals/g-components/cards/EcomCartSummaryCard';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import EcomCartTable from '@globals/g-components/tables/EcomCartTable';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import { cartItems } from '@globals/g-data/e-commerce/products';
import { Col, Row } from 'react-bootstrap';
const Cart = () => {
    return (<div className="pt-5 mb-9">
      <Section small className="py-0">
        <PageBreadcrumb items={defaultBreadcrumbItems}/>
        <h2 className="mb-6">Cart</h2>
        <Row className="g-5">
          <Col xs={12} lg={8}>
            <EcomCartTable products={cartItems}/>
          </Col>
          <Col xs={12} lg={4}>
            <EcomCartSummaryCard />
          </Col>
        </Row>
      </Section>
    </div>);
};
export default Cart;
