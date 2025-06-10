export function getPermissionByMenuPageName(menuPageName) {
  try {
    const panelMenuDataRaw = localStorage.getItem('panelMenuData');
    if (!panelMenuDataRaw || panelMenuDataRaw === 'undefined') return null;
    const panelMenuData = JSON.parse(panelMenuDataRaw);

    // Log all available menu pages for debugging
    const availablePages = panelMenuData.data.map(item => item.strMunuPage);

    // Case-insensitive match
    const matchedMenu = panelMenuData.data.find(
      item => item.strMunuPage?.toLowerCase() === menuPageName.toLowerCase()
    );
    if (!matchedMenu) {
      console.warn(`No permission found for menuPageName: ${menuPageName}`);
      return null;
    }
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
