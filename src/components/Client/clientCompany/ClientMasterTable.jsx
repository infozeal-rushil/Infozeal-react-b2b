import { FaEdit } from 'react-icons/fa';

export const clientMasterColumns = handleEdit => [
  {
    accessorKey: 'strClientDisplayName',
    header: 'Name',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.strClientDisplayName}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-4' },
      headerProps: { style: { width: '40%' } }
    }
  },
  {
    accessorKey: 'strClientCity',
    header: 'City',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.strClientCity}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    accessorKey: 'strClientMasterEmail',
    header: 'Email',
    cell: ({ row }) => (
      <span className="fw-bold fs-8" style={{ color: 'grey' }}>
        {row.original.strClientMasterEmail}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '30%' } }
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
      </div>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '10%' } }
    }
  }
];
