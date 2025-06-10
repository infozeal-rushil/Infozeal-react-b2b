import { useEffect } from 'react';
import useAdvanceTable from './useAdvanceTable';
const useSearchHook = (data, searchFields, searchValue) => {
    const table = useAdvanceTable({
        data,
        columns: searchFields
    });
    useEffect(() => {
        table.setGlobalFilter(searchValue);
    }, [searchValue]);
    return table.getRowModel().rows.map(row => row.original);
};
export default useSearchHook;
