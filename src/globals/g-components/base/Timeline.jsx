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
const Timeline = ({ children, variant, className }) => {
    return (<div className={classNames(className, {
            'timeline-basic': variant === 'basic',
            'timeline-vertical': variant === 'vertical'
        })}>
      {children}
    </div>);
};
export const TimelineItem = ({ children, className }) => {
    return (<div className={classNames(className, 'timeline-item')}>{children}</div>);
};
export const TimelineOppositeContent = ({ children, className }) => {
    return (<div className={classNames(className, 'order-1 order-md-0 me-md-4')}>
      {children}
    </div>);
};
export const TimelineContent = ({ children, className }) => {
    return (<div className={classNames(className, 'timeline-content')}>{children}</div>);
};
export const TimelineSeparator = ({ children, className }) => {
    return (<div className={classNames(className, 'timeline-separator')}>
      {children}
    </div>);
};
export const TimelineDot = ({ children, className }) => {
    return (<div className={classNames(className, 'icon-item icon-item-sm')}>
      {children}
    </div>);
};
export const TimelineBar = (_a) => {
    var { className } = _a, rest = __rest(_a, ["className"]);
    return (<span className={classNames(className, 'timeline-bar border-end')} {...rest}/>);
};
Timeline.Item = TimelineItem;
Timeline.OppositeContent = TimelineOppositeContent;
Timeline.Content = TimelineContent;
Timeline.Separator = TimelineSeparator;
Timeline.Bar = TimelineBar;
Timeline.Dot = TimelineDot;
export default Timeline;
