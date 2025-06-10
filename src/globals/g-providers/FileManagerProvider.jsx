import { fileCollection as filesData } from 'data/file-manager';
import { useState, createContext, useContext, useEffect } from 'react';
import { gridBreakpoints } from './BreakpointsProvider';
export const FileManagerContext = createContext({});
const FileManagerProvider = ({ children }) => {
    const [fileCollection, setFileCollection] = useState([]);
    const [showFileDetails, setShowFileDetails] = useState(window.innerWidth >= gridBreakpoints.xxl);
    const [checkedFileIds, setCheckedFileIds] = useState([]);
    const [isGridView, setIsGridView] = useState(true);
    const [isGrouped, setIsGrouped] = useState(false);
    useEffect(() => {
        setFileCollection(filesData);
    }, []);
    return (<FileManagerContext.Provider value={{
            fileCollection,
            setFileCollection,
            showFileDetails,
            setShowFileDetails,
            checkedFileIds,
            setCheckedFileIds,
            isGridView,
            setIsGridView,
            isGrouped,
            setIsGrouped
        }}>
      {children}
    </FileManagerContext.Provider>);
};
export const useFileManagerContext = () => useContext(FileManagerContext);
export default FileManagerProvider;
