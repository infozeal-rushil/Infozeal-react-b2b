import useConfigMountEffect from '@globals/g-hooks/useConfigMountEffect';
import useSettingsMountEffect from '@globals/g-hooks/useSettingsMountEffect';
import Ecommerce from '@components/dashboard/ecommerce';
import React from 'react';
const DualNav = () => {
    useSettingsMountEffect({
        disableNavigationType: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarShape: true,
        disableResetButton: true
    });
    useConfigMountEffect({
        navbarPosition: 'dual',
        navbarTopShape: 'default'
    });
    return <Ecommerce />;
};
export default DualNav;
