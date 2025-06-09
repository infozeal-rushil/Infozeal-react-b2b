import useConfigMountEffect from '@globals/g-hooks/useConfigMountEffect';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
import Ecommerce from '@components/dashboard/ecommerce';
const ComboNav = () => {
    useSettingsMountEffect({
        disableNavigationType: true,
        disableHorizontalNavbarAppearance: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarShape: true,
        disableResetButton: true
    });
    useConfigMountEffect({
        navbarPosition: 'combo'
    });
    return <Ecommerce />;
};
export default ComboNav;
