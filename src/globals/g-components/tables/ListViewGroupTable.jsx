import classNames from 'classnames';
import { useAdvanceTableContext } from 'providers/AdvanceTableProvider';
import { Table } from 'react-bootstrap';
import { flexRender } from '@tanstack/react-table';
import React from 'react';
const ListViewGroupTable = ({ headerClassName, bodyClassName, rowClassName, tableProps }) => {
    const table = useAdvanceTableContext();
    const { getRowModel, getFlatHeaders } = table;
    const fileTypes = ['folder', 'image', 'video', 'doc', 'zip', 'csv', 'xlx'];
    const rows = getRowModel().rows;
    const folderRows = rows.filter(row => row.original.type === 'folder');
    const imageRows = rows.filter(row => row.original.type === 'image');
    const videoRows = rows.filter(row => row.original.type === 'video');
    const fileRows = rows.filter(row => ['doc', 'zip', 'csc', 'xlx'].includes(row.original.type));
    const otherRows = rows.filter(row => !fileTypes.some(type => row.original.type.includes(type)));
    const tableGroups = [
        {
            title: 'Folder',
            rows: folderRows
        },
        {
            title: 'Images',
            rows: imageRows
        },
        {
            title: 'Video',
            rows: videoRows
        },
        {
            title: 'Files',
            rows: fileRows
        },
        {
            title: 'Others',
            rows: otherRows
        }
    ];
    return (<div className="scrollbar ms-n1 ps-1">
      <Table {...tableProps}>
        <thead className={headerClassName}>
          <tr>
            {getFlatHeaders().map(header => {
            var _a, _b, _c;
            return (<th key={header.id} {...(_a = header.column.columnDef.meta) === null || _a === void 0 ? void 0 : _a.headerProps} className={classNames((_c = (_b = header.column.columnDef.meta) === null || _b === void 0 ? void 0 : _b.headerProps) === null || _c === void 0 ? void 0 : _c.className, {
                    sort: header.column.getCanSort(),
                    desc: header.column.getIsSorted() === 'desc',
                    asc: header.column.getIsSorted() === 'asc'
                })} onClick={header.column.getToggleSortingHandler()}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>);
        })}
          </tr>
        </thead>
        <tbody className={bodyClassName}>
          {tableGroups.map(({ title, rows }) => rows.length > 0 ? (<React.Fragment key={title}>
                <tr>
                  <td colSpan={table.getAllColumns().length}>
                    <h4 className="mt-2 mb-0">{title}</h4>
                  </td>
                </tr>
                {rows.map((row, index) => (<tr key={row.id} className={classNames(rowClassName, {
                    'list-group-last-item': rows.length - 1 === index
                })}>
                    {row.getVisibleCells().map(cell => {
                    var _a;
                    return (<td key={cell.id} {...(_a = cell.column.columnDef.meta) === null || _a === void 0 ? void 0 : _a.cellProps}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>);
                })}
                  </tr>))}
              </React.Fragment>) : null)}
        </tbody>
      </Table>
    </div>);
};
export default ListViewGroupTable;
