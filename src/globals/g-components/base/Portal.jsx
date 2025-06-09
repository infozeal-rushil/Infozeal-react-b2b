import { createPortal } from 'react-dom';
export const canUseDOM = !!(typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement);
const Portal = ({ children, containerSelector = 'body' }) => {
    if (!canUseDOM)
        return null;
    const portalContainer = document.querySelector(containerSelector);
    if (!portalContainer)
        return null;
    return createPortal(children, portalContainer);
};
export default Portal;
