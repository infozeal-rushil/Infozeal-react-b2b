import { FaEdit, FaTrash } from 'react-icons/fa';

export const branchMasterColumns = (handleEdit, handleDelete) => [
  {
    accessorKey: 'Name',
    header: 'Name',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.Name}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-4' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    accessorKey: 'City',
    header: 'City',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.City}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '20%' } }
    }
  },
  {
    accessorKey: 'Email',
    header: 'Email',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.Email}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    accessorKey: 'ValidityDate',
    header: 'Validity Date',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.ValidityDate}
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
