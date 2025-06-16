import { FaEdit, FaTrash } from 'react-icons/fa';

export const branchMasterColumns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'strClientBranchName',
    header: 'Name',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.strClientBranchName}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-4' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    accessorKey: 'strClientBranchCity',
    header: 'City',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.strClientBranchCity}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '20%' } }
    }
  },
  {
    accessorKey: 'strClientBranchEmail',
    header: 'Email',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.strClientBranchEmail}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    accessorKey: 'dtClientBranchValidate',
    header: 'Validity Date',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.dtClientBranchValidate}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '20%' } }
    }
  },
  {
    header: 'Action',
    accessorKey: 'action',
    cell: ({ row }) => (
      <div className="d-flex gap-3 justify-content-center">
        <FaEdit
          className="text-primary cursor-pointer"
          onClick={() => handleEdit(row.original)}
          title="Edit"
        />
        <FaTrash
          className="text-danger cursor-pointer"
          onClick={() => handleDelete(row.original)}
          title="Delete"
        />
      </div>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '10%' } }
    }
  }
];
