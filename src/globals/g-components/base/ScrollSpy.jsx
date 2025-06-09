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
import classNames from 'classnames';
import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import ScrollSpyProvider, { useScrollSpyContext } from 'providers/ScrollSpyProvider';
const ScrollSpy = ({ children }) => {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const target = document.getElementById(hash.slice(1));
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, []);
    return <ScrollSpyProvider>{children}</ScrollSpyProvider>;
};
const ScrollSpyContent = (_a) => {
    var { id, children, rootMargin = '-50% 0px -50% 0px', threshold = 0 } = _a, rest = __rest(_a, ["id", "children", "rootMargin", "threshold"]);
    const { setActiveElemId } = useScrollSpyContext();
    const { ref, inView } = useInView({ threshold, rootMargin });
    useEffect(() => {
        if (inView && id) {
            setActiveElemId(id);
        }
    }, [inView, id, setActiveElemId]);
    return (<div id={id} ref={ref} {...rest}>
      {children}
    </div>);
};
const ScrollSpyNavLink = ({ className, href, children }) => {
    const { activeElemId } = useScrollSpyContext();
    const targetId = href === null || href === void 0 ? void 0 : href.replace('#', '');
    return (<Nav.Link className={classNames(className)} active={activeElemId === targetId} href={href}>
      {children}
    </Nav.Link>);
};
ScrollSpy.Content = ScrollSpyContent;
ScrollSpy.NavLink = ScrollSpyNavLink;
export default ScrollSpy;
