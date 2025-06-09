import useConfigMountEffect from '@globals/g-hooks/useConfigMountEffect';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
import Ecommerce from '@components/dashboard/ecommerce';
const TopnavSlim = () => {
    useSettingsMountEffect({
        disableNavigationType: true,
        disableHorizontalNavbarAppearance: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarShape: true,
        disableResetButton: true
    });
    useConfigMountEffect({
        navbarTopShape: 'slim'
    });
    return <Ecommerce />;
};
export default TopnavSlim;
