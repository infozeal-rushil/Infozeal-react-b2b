import { createContext, useContext, useEffect, useState } from 'react';
export const BreakpointContext = createContext({});
export const gridBreakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1540
};
const BreakpointsProvider = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [breakpoints, setBreakpoints] = useState({
        up: (bp) => {
            return width > gridBreakpoints[bp];
        },
        down: (bp) => {
            return width < gridBreakpoints[bp];
        }
    });
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);
    useEffect(() => {
        setBreakpoints({
            up: bp => width >= gridBreakpoints[bp],
            down: bp => width <= gridBreakpoints[bp]
        });
    }, [width]);
    return (<BreakpointContext.Provider value={{ breakpoints }}>
      {children}
    </BreakpointContext.Provider>);
};
export const useBreakpoints = () => useContext(BreakpointContext);
export default BreakpointsProvider;
