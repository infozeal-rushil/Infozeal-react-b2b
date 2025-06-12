import { FaEdit } from 'react-icons/fa';

export const clientMasterColumns = handleEdit => [
  {
    accessorKey: 'ClientDisplayName',
    header: 'Name',
    cell: ({ row }) => (
      <span className="fw-bold fs-8 text-secondary">
        {row.original.ClientDisplayName}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    accessorKey: 'ClientCity',
    header: 'City',
    cell: ({ row }) => (
      <span className="fw-bold fs-8 text-secondary">
        {row.original.ClientCity}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    accessorKey: 'ClientEmail',
    header: 'Email',
    cell: ({ row }) => (
      <span className="fw-bold fs-8 text-secondary">
        {row.original.ClientEmail}
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
