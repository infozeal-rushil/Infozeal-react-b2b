/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getColor } from 'helpers/utils';
import { useAppContext } from 'providers/AppProvider';
const TinymceEditor = ({ value, onChange, options = { height: '50vh' } }) => {
    const { config: { isDark } } = useAppContext();
    const editorRef = useRef(null);
    const handleEditorFocus = () => {
        var _a;
        const editorContainer = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.editorContainer;
        editorContainer === null || editorContainer === void 0 ? void 0 : editorContainer.classList.add('editor-focused');
    };
    const handleEditorBlur = () => {
        var _a;
        const editorContainer = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.editorContainer;
        editorContainer === null || editorContainer === void 0 ? void 0 : editorContainer.classList.remove('editor-focused');
    };
    const handleEditorStyle = () => {
        if (editorRef.current) {
            editorRef.current.dom.addStyle(`.mce-content-body{
          color: ${getColor('emphasis-color')} !important;
          background-color: ${getColor('tinymce-bg')} !important;
        }
        `);
        }
    };
    useEffect(() => {
        handleEditorStyle();
    }, [isDark]);
    return (<Editor tinymceScriptSrc="/tinymce/tinymce.min.js" apiKey={import.meta.env.VITE_TINYMCE_APIKEY} onFocus={handleEditorFocus} onBlur={handleEditorBlur} 
    // @ts-ignore
    onInit={(evt, editor) => (editorRef.current = editor)} value={value} onEditorChange={onChange} init={Object.assign({ skin: 'oxide', license_key: 'gpl', menubar: false, content_style: `
        body { 
          color: ${getColor('emphasis-color')};
        }
        .mce-content-body{
          background-color: ${getColor('tinymce-bg')};
        }
        .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: ${getColor('gray-400')};
          font-weight: 400;
          font-size: 12.8px;
        }
        `, statusbar: false, plugins: ['link', 'image', 'lists', 'table', 'media'], theme_advanced_toolbar_align: 'center', 
            // directionality: getItemFromStore('phoenixIsRTL') ? 'rtl' : 'ltr',
            toolbar: [
                { name: 'history', items: ['undo', 'redo'] },
                {
                    name: 'formatting',
                    items: ['bold', 'italic', 'underline', 'strikethrough']
                },
                {
                    name: 'alignment',
                    items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
                },
                { name: 'list', items: ['numlist', 'bullist'] },
                { name: 'link', items: ['link'] }
            ] }, options)}/>);
};
export default TinymceEditor;
