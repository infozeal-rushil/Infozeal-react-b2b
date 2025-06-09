import { useSettingsPanelContext } from 'providers/SettingsPanelProvider';
import { useEffect } from 'react';
const useSettingsMountEffect = (effects) => {
    const { settingsPanelConfig, setSettingsPanelConfig } = useSettingsPanelContext();
    useEffect(() => {
        setSettingsPanelConfig(effects);
        const undoEffects = Object.keys(effects).reduce((acc, effect) => {
            // @ts-ignore
            acc[effect] = settingsPanelConfig[effect];
            return acc;
        }, {});
        return () => {
            setSettingsPanelConfig(undoEffects);
        };
    }, []);
};
export default useSettingsMountEffect;
