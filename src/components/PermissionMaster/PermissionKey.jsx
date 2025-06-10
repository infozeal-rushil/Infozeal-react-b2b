export const transformPanelToPermission = (panelPermissions) => {
    return panelPermissions.map(panel => {
        var _a, _b;
        return ({
            objectName: panel.strPanelMenuName,
            permissions: {
                Add: panel.bitCreate === 1,
                Edit: panel.bitUpdate === 1,
                Delete: panel.bitDelete === 1,
                Print: panel.bitPrint === 1,
                View: panel.bitRead === 1,
                Execute: (_a = panel.bitPanelPermMenuStatus) !== null && _a !== void 0 ? _a : false
            },
            bitPanelPermMenuStatus: (_b = panel.bitPanelPermMenuStatus) !== null && _b !== void 0 ? _b : false,
            intPanelMenuID: panel.intPanelMenuID
        });
    });
};
