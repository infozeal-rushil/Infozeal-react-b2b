import FileManagerContent from '@globals/g-components/modules/file-manager/FileManagerContent';
import FileManagerLayout from '@globals/g-layouts/FileManagerLayout';
import { useFileManagerContext } from '@globals/g-providers/FileManagerProvider';
import { useEffect } from 'react';
const ListView = () => {
    const { setIsGridView, setCheckedFileIds } = useFileManagerContext();
    useEffect(() => {
        setIsGridView(false);
        setCheckedFileIds([]);
    }, []);
    return (<FileManagerLayout>
      <FileManagerContent />
    </FileManagerLayout>);
};
export default ListView;
