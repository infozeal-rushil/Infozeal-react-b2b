import React, { useEffect, useRef } from 'react';
import { createPopup } from '@picmo/popup-picker';
const EmojiPicker = ({ children, onSelect }) => {
    const ref = useRef(null);
    const instance = useRef(null);
    useEffect(() => {
        if (ref.current) {
            instance.current = createPopup({}, {
                referenceElement: ref.current,
                triggerElement: ref.current,
                position: 'bottom-start',
                showCloseButton: false
            });
            instance.current.addEventListener('emoji:select', onSelect);
        }
        return () => {
            var _a;
            (_a = instance.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('emoji:select', onSelect);
            instance.current = null;
        };
    }, []);
    return (<div ref={ref} onClick={() => {
            var _a;
            (_a = instance.current) === null || _a === void 0 ? void 0 : _a.toggle();
        }}>
      {children}
    </div>);
};
export default EmojiPicker;
