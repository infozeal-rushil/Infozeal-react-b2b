export function getPermissionByMenuPageName(menuPageName) {
  try {
    const panelMenuDataRaw = localStorage.getItem('panelMenuData');
    if (!panelMenuDataRaw || panelMenuDataRaw === 'undefined') return null;
    const panelMenuData = JSON.parse(panelMenuDataRaw);
    const matchedMenu = panelMenuData.data.find(
      item => item.strMunuPage === menuPageName
    );
    if (!matchedMenu) return null;
    const {
      bitCreate = 0,
      bitRead = 0,
      bitUpdate = 0,
      bitDelete = 0,
      bitPrint = 0
    } = matchedMenu;
    return { bitCreate, bitRead, bitUpdate, bitDelete, bitPrint };
  } catch (err) {
    console.error('Permission fetch error:', err);
    return null;
  }
}
