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
import PhoenixContainer from './PhoenixContainer';
const Section = (_a) => {
    var { className, containerClassName } = _a, rest = __rest(_a, ["className", "containerClassName"]);
    return (<section className={classNames(className)}>
      <PhoenixContainer className={containerClassName} {...rest}/>
    </section>);
};
export default Section;
