import { UilTimes } from '@iconscout/react-unicons';
import Button from 'components/base/Button';
import Unicon from 'components/base/Unicon';
import PhoenixReactRange from 'components/forms/PhoenixReactRange';
import { Col, Form, Row } from 'react-bootstrap';
import RoomFilterActions from './RoomFilterActions';
import RoomFilterSearch from './RoomFilterSearch';
import { amenitiesOptions, bedTypeOptions, RoomCategoryOptions } from 'data/travel-agency/admin/searchRoom';
import { useMemo, useState } from 'react';
import RoomFilterCollapseItem from './RoomFilterCollapseItem';
import { searchRoomCollapsibleItems } from 'data/travel-agency/customer/hotel';
const RoomFilterOffcanvasContent = ({ setOpen }) => {
    const [range, setRange] = useState({
        priceRangeMin: 500,
        priceRangeMax: 2000
    });
    const [priceRange, setPriceRange] = useState([699, 1299]);
    const [expandedStates, setExpandedState] = useState({
        priceRange: true,
        adult: true,
        child: true,
        bedroom: true,
        numberOfBed: true,
        bathroom: true,
        roomCategory: false,
        bedType: false,
        amenities: false
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRange(prevState => (Object.assign(Object.assign({}, prevState), { [name]: parseInt(value) })));
    };
    const allExpanded = useMemo(() => {
        return Object.values(expandedStates).some(value => value) ? false : true;
    }, [expandedStates]);
    const handleToggleCollapse = (key) => {
        setExpandedState(prev => (Object.assign(Object.assign({}, prev), { [key]: !prev[key] })));
    };
    const toggleCollapseAll = () => {
        const items = Object.keys(expandedStates).reduce((acc, key) => {
            acc[key] = allExpanded;
            return acc;
        }, {});
        setExpandedState(items);
    };
    return (<div className="pe-1">
      <div className="d-flex align-items-center">
        <h3 className="text-body-highlight">Filters</h3>
        <Button variant="phoenix-secondary" className="px-3 ms-auto me-2 me-xl-0" onClick={toggleCollapseAll}>
          {allExpanded ? 'Expand' : 'Collapse'} all
        </Button>
        <Button className="p-0 fw-bold d-xl-none" onClick={() => setOpen && setOpen(false)}>
          <Unicon icon={UilTimes} size={16}/>
        </Button>
      </div>

      <RoomFilterCollapseItem title="Price Range" onToggle={() => handleToggleCollapse('priceRange')} collapseStatus={expandedStates.priceRange}>
        <PhoenixReactRange values={priceRange} variant="primary" min={range.priceRangeMin} max={range.priceRangeMax} onChange={val => setPriceRange(val)} trackHeight={'4px'} classNames={'phoenix-react-range-slim px-2 pt-1 mb-3'}/>
        <Row className="g-2">
          <Col xs={6}>
            <Form.Floating>
              <Form.Control type="number" id="priceRangeMin" name="priceRangeMin" className="input-spin-none" value={range.priceRangeMin} onChange={handleChange}/>
              <label htmlFor="priceRangeMin">Min</label>
            </Form.Floating>
          </Col>
          <Col xs={6}>
            <Form.Floating>
              <Form.Control type="number" id="priceRangeMax" name="priceRangeMax" className="input-spin-none" value={range.priceRangeMax} onChange={handleChange}/>
              <label htmlFor="priceRangeMax">Max</label>
            </Form.Floating>
          </Col>
        </Row>
      </RoomFilterCollapseItem>

      {searchRoomCollapsibleItems.map(item => (<RoomFilterCollapseItem key={item.key} title={item.title} collapseStatus={expandedStates[item.key]} onToggle={() => handleToggleCollapse(item.key)}>
          <RoomFilterActions />
        </RoomFilterCollapseItem>))}

      <RoomFilterCollapseItem title="Room Category" collapseStatus={expandedStates.roomCategory} onToggle={() => handleToggleCollapse('roomCategory')}>
        <RoomFilterSearch items={RoomCategoryOptions}/>
      </RoomFilterCollapseItem>

      <RoomFilterCollapseItem title="Bed Type" collapseStatus={expandedStates.bedType} onToggle={() => handleToggleCollapse('bedType')}>
        <RoomFilterSearch items={bedTypeOptions}/>
      </RoomFilterCollapseItem>

      <RoomFilterCollapseItem title="Amenities" collapseStatus={expandedStates.amenities} hideBorderBottom onToggle={() => handleToggleCollapse('amenities')}>
        <RoomFilterSearch items={amenitiesOptions}/>
      </RoomFilterCollapseItem>

      <div className="sticky-bottom bg-body pt-4 pb-4 pb-xl-0">
        <Button variant="phoenix-secondary" className="me-2">
          Reset
        </Button>
        <Button variant="primary" className="px-7">
          Apply
        </Button>
      </div>
    </div>);
};
export default RoomFilterOffcanvasContent;
