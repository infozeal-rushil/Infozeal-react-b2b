import { Nav } from 'react-bootstrap';
import WizardNavItem from './WizardNavItem';
const WizardSideNav = ({ navItems, setTabEventKey }) => {
    const setCurrentEventKey = (selectedKey) => {
        setTabEventKey && setTabEventKey(parseInt(selectedKey || '0'));
    };
    return (<Nav as="ul" onSelect={setCurrentEventKey} className="justify-content-between flex-nowrap nav-wizard nav-wizard-vertical-xl">
      {navItems.map((item, index) => (<WizardNavItem key={index} icon={item.icon} step={index + 1} label={item.label} isHorizontal/>))}
    </Nav>);
};
export default WizardSideNav;
