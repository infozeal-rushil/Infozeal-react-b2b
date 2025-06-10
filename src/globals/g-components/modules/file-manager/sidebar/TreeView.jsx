import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { treeviewItems } from 'data/treeview';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const TreeviewListItem = ({ item }) => {
    return (<li className="treeview-list-item">
      <div className="treeview-item">
        <a href="#!" className="flex-1 ps-2 ms-2">
          <p className="treeview-text text-nowrap">
            {item.icon ? (<FontAwesomeIcon icon={item.icon} className={classNames('treeview-icon', {
                'text-info-light': item.id === '2-3'
            })}/>) : (<span className={`treeview-icon}`}/>)}

            {item.name}
            {item.dot && <span className={`treeview-dot bg-${item.dot}`}/>}
          </p>
        </a>
      </div>
    </li>);
};
const TreeviewCollapseItem = ({ item, treeviewId }) => {
    var _a;
    const [open, setOpen] = useState(item.show);
    return (<li className="treeview-list-item">
      <Link to="" role="button" aria-expanded={open} onClick={() => setOpen(!open)} className="treeview-collapse-item">
        <p className="treeview-text text-nowrap">
          <FontAwesomeIcon icon={faFolder} className={classNames('treeview-icon', {
            'text-info-light': item.id === '2-3'
        })}/>
          {item.name}
          {item.badge && <span className="treeview-badge">{item.badge}</span>}
          {item.dot && <span className={`treeview-dot bg-${item.dot}`}/>}
        </p>
      </Link>
      <Collapse in={open}>
        <ul className="treeview-list treeview-border" id={`${treeviewId}-${item.id}`}>
          {(_a = item.children) === null || _a === void 0 ? void 0 : _a.map((child, index) => child.children ? (<TreeviewCollapseItem key={index} item={child} treeviewId="treeviewExample"/>) : (<TreeviewListItem key={index} item={child}/>))}
        </ul>
      </Collapse>
    </li>);
};
const TreeView = () => {
    return (<>
      <ul className="mb-0 treeview" id="treeviewExample">
        {treeviewItems.map((item, index) => item.children ? (<TreeviewCollapseItem key={index} item={item} treeviewId={`tree${index}`}/>) : (<TreeviewListItem key={index} item={item}/>))}
      </ul>
    </>);
};
export default TreeView;
