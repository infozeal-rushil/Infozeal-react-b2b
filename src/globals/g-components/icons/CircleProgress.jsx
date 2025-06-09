import classNames from 'classnames';
const CircleProgress = ({ className, height = 52, width = 52, color }) => {
    return (<svg className={classNames(className, 'circle-progress-svg')} width={height} height={width} viewBox="0 0 170 170">
      <circle className="progress-bar-rail" cx={60} cy={60} r={54} fill="none" strokeLinecap="round" strokeWidth={12}/>
      <circle className="progress-bar-top" cx={60} cy={60} r={54} fill="none" strokeLinecap="round" stroke={color} strokeWidth={12}/>
    </svg>);
};
export default CircleProgress;
