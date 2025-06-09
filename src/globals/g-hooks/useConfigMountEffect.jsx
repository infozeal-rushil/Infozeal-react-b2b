/* eslint-disable @typescript-eslint/ban-ts-comment */
import { initialConfig } from 'config';
import { useAppContext } from 'providers/AppProvider';
import { useEffect } from 'react';
const useConfigMountEffect = (effects) => {
    const { setConfig } = useAppContext();
    useEffect(() => {
        setConfig(effects);
        return () => {
            const undoEffects = Object.keys(effects).reduce((acc, effect) => {
                // @ts-ignore
                acc[effect] = initialConfig[effect];
                return acc;
            }, {});
            setConfig(undoEffects);
        };
    }, []);
};
export default useConfigMountEffect;
