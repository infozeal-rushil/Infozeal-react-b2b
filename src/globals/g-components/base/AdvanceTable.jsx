import classNames from 'classnames';
import { useAdvanceTableContext } from '@globals/g-providers/AdvanceTableProvider';
import { Table } from 'react-bootstrap';
import { flexRender } from '@tanstack/react-table';
const AdvanceTable = ({
  headerClassName,
  bodyClassName,
  rowClassName,
  tableProps,
  hasFooter
}) => {
  const table = useAdvanceTableContext();
  const { getRowModel, getFlatHeaders, getFooterGroups } = table;
  return (
    <div className="scrollbar ms-n1 ps-1">
      <Table {...tableProps}>
        <thead className={headerClassName}>
          <tr>
            {getFlatHeaders().map(header => {
              var _a, _b, _c;
              return (
                <th
                  key={header.id}
                  {...((_a = header.column.columnDef.meta) === null ||
                  _a === void 0
                    ? void 0
                    : _a.headerProps)}
                  className={classNames(
                    (_c =
                      (_b = header.column.columnDef.meta) === null ||
                      _b === void 0
                        ? void 0
                        : _b.headerProps) === null || _c === void 0
                      ? void 0
                      : _c.className,
                    {
                      sort: header.column.getCanSort(),
                      desc: header.column.getIsSorted() === 'desc',
                      asc: header.column.getIsSorted() === 'asc'
                    }
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={bodyClassName}>
          {getRowModel().rows.map(row => (
            <tr key={row.id} className={rowClassName}>
              {row.getVisibleCells().map(cell => {
                var _a;
                return (
                  <td
                    key={cell.id}
                    {...((_a = cell.column.columnDef.meta) === null ||
                    _a === void 0
                      ? void 0
                      : _a.cellProps)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        {hasFooter && (
          <tfoot>
            {getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id} className="border-0 border-translucent">
                {footerGroup.headers.map(header => {
                  var _a;
                  return (
                    <th
                      key={header.id}
                      {...((_a = header.column.columnDef.meta) === null ||
                      _a === void 0
                        ? void 0
                        : _a.footerProps)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </tfoot>
        )}
      </Table>
    </div>
  );
};
export default AdvanceTable;
