var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

import IndeterminateCheckbox from '@globals/g-components/base/IndeterminateCheckbox';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table';
const selectionColumn = {
  id: 'select',
  accessorKey: '',
  header: ({ table }) => (
    <IndeterminateCheckbox
      className="form-check fs-8 mb-0"
      {...{
        checked: table.getIsAllRowsSelected(),
        indeterminate: table.getIsSomeRowsSelected(),
        onChange: table.getToggleAllRowsSelectedHandler()
      }}
    />
  ),
  cell: ({ row }) => (
    <IndeterminateCheckbox
      className="form-check fs-8 mb-0"
      {...{
        checked: row.getIsSelected(),
        disabled: !row.getCanSelect(),
        indeterminate: row.getIsSomeSelected(),
        onChange: row.getToggleSelectedHandler()
      }}
    />
  ),
  meta: {
    headerProps: { style: { width: '30px' } }
  }
};
const useAdvanceTable = _a => {
  var {
      columns,
      data,
      selection,
      sortable,
      pagination,
      pageSize,
      initialState
    } = _a,
    rest = __rest(_a, [
      'columns',
      'data',
      'selection',
      'sortable',
      'pagination',
      'pageSize',
      'initialState'
    ]);
  const state = Object.assign(
    {
      pagination: pagination
        ? { pageSize: pagination ? pageSize : data.length }
        : undefined
    },
    initialState
  );
  const table = useReactTable(
    Object.assign(
      {
        data,
        columns: selection ? [selectionColumn, ...columns] : columns,
        enableSorting: sortable,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: state
      },
      rest
    )
  );
  return table;
};
export default useAdvanceTable;
