import FileManagerContent from '@globals/g-components/modules/file-manager/FileManagerContent';
import FileManagerLayout from '@globals/g-layouts/FileManagerLayout';
import { useFileManagerContext } from '@globals/g-providers/FileManagerProvider';
import { useEffect } from 'react';
const GridView = () => {
    const { setIsGridView, setCheckedFileIds } = useFileManagerContext();
    useEffect(() => {
        setIsGridView(true);
        setCheckedFileIds([]);
    }, []);
    return (<FileManagerLayout>
      <FileManagerContent />
    </FileManagerLayout>);
};
export default GridView;
