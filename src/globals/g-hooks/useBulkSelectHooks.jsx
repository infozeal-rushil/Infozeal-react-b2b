import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
const useBulkSelectHooks = (data) => {
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
    return { getParentCheckboxProps, getRowCheckboxProps };
};
export default useBulkSelectHooks;
