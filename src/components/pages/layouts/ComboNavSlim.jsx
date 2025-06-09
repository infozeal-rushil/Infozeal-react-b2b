import useConfigMountEffect from '@globals/g-hooks/useConfigMountEffect';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
import Ecommerce from '@components/dashboard/ecommerce';
const ComboNavSlim = () => {
    useSettingsMountEffect({
        disableNavigationType: true,
        disableHorizontalNavbarAppearance: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarShape: true,
        disableResetButton: true
    });
    useConfigMountEffect({
        navbarPosition: 'combo',
        navbarTopShape: 'slim'
    });
    return <Ecommerce />;
};
export default ComboNavSlim;
