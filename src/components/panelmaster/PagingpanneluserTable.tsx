/* eslint-disable */
import React, { useEffect, useState } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender
} from '@tanstack/react-table';
import {
  getPannelUsers,
  PannelUser
} from 'globals/store/Service/panelUserService';
// import {
//   getPannelUsers,
//   PannelUser
// } from 'globals/store/Service/PannelUsersService';
// adjust path as needed

interface Props {
  token: string;
}

const PannelUserTable: React.FC<Props> = () => {
  const [data, setData] = useState<PannelUser[]>([]);
  const [pageIndex, setPageIndex] = useState(0); // 0-based index for React Table
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    console.log('rushil fetchuser');
    setLoading(true);
    try {
      const res = await getPannelUsers(pageIndex + 1, pageSize); // your API uses 1-based pageNo
      setData(res.data.PannelUser);
      console.log(res.data.PannelUser);
      setTotalCount(res.data.TotalRecords);
      console.log(res.data.TotalRecords);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('[Debug] fetchUsers Pagination User Table');
    fetchUsers();
  }, [pageIndex, pageSize]);

  useEffect(() => {
    console.log('[Debug] fetchUsers first mount');
    fetchUsers();
  }, []);

  const columns: ColumnDef<PannelUser>[] = [
    { header: 'ID', accessorKey: 'intPannelUserID' },
    { header: 'Name', accessorKey: 'strPannelUserDisplayName' },
    { header: 'Email', accessorKey: 'strPannelUserEmail' },
    {
      header: 'Status',
      accessorKey: 'bitPannelUserStatus',
      cell: info => (info.getValue() ? 'Active' : 'Inactive')
    }
  ];

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(totalCount / pageSize),
    state: {
      pagination: {
        pageIndex,
        pageSize
      }
    },
    manualPagination: true,
    onPaginationChange: updater => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div>
      <table className="min-w-full border">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border px-2 py-1">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No Data
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="border px-2 py-1">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPageIndex(old => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {Math.ceil(totalCount / pageSize)}
        </span>
        <button
          onClick={() => {
            if ((pageIndex + 1) * pageSize < totalCount) {
              setPageIndex(old => old + 1);
            }
          }}
          disabled={(pageIndex + 1) * pageSize >= totalCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PannelUserTable;
