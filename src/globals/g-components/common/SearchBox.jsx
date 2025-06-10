var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Form } from 'react-bootstrap';
const SearchBox = (_a) => {
    var { placeholder = 'Search', size, className, inputClassName, formClassName, style } = _a, rest = __rest(_a, ["placeholder", "size", "className", "inputClassName", "formClassName", "style"]);
    return (<div className={classNames('search-box', className)} style={style}>
      <form className={classNames('position-relative', formClassName)}>
        <Form.Control type="search" placeholder={placeholder} className={classNames('search-input search', inputClassName)} size={size} {...rest}/>
        <FontAwesomeIcon icon={faSearch} className="search-box-icon"/>
      </form>
    </div>);
};
export default SearchBox;
