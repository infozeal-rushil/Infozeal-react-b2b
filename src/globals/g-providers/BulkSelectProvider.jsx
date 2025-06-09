import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useContext, createContext } from 'react';
export const BulkSelectContext = createContext({});
const BulkSelectProvider = ({ data, children }) => {
    const table = useReactTable({
        data,
        columns: [],
        getCoreRowModel: getCoreRowModel()
    });
    const getParentCheckboxProps = () => {
        return {
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler()
        };
    };
    const getRowCheckboxProps = (id) => {
        const row = table.getRow(id);
        return {
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler()
        };
    };
    const getSelectedRows = () => {
        return table.getSelectedRowModel().rows.map(row => row.original);
    };
    return (<BulkSelectContext.Provider value={{ getParentCheckboxProps, getRowCheckboxProps, getSelectedRows }}>
      {children}
    </BulkSelectContext.Provider>);
};
export const useBulkSelect = () => useContext(BulkSelectContext);
export default BulkSelectProvider;
