import { FaEdit } from 'react-icons/fa';

export const Usercolumns = openEditModal => [
  {
    header: 'Display Name',
    accessorKey: 'strClientUserDisplayName',
    cell: ({ row }) => (
      <span className="fw-bold fs-8 text-secondary">
        {row.original.strClientUserDisplayName || 'N/A'}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-4' },
      headerProps: { style: { width: '30%' } }
    }
  },
  {
    header: 'Email',
    accessorKey: 'strClientUserEmail',
    cell: ({ row }) => (
      <span className="fw-bold fs-8 text-secondary">
        {row.original.strClientUserEmail || 'N/A'}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '20%' } }
    }
  },
  {
    header: 'Password',
    accessorKey: 'strClientUserPassword',
    cell: ({ row }) => (
      <span className="fw-bold fs-8 text-secondary">
        {row.original.strClientUserPassword ? '••••••••' : 'N/A'}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '20%' } }
    }
  },
  {
    header: 'Is Admin',
    accessorKey: 'bitClientUserAdminAccount',
    cell: ({ getValue }) => (
      <span className="fw-bold fs-8">{getValue() ? 'Yes' : 'No'}</span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '10%' } }
    }
  },
  {
    header: 'Is Active',
    accessorKey: 'bitClientUserStatus',
    cell: ({ getValue }) => (
      <span
        className={`fw-bold fs-8 ${
          getValue() ? 'text-success' : 'text-danger'
        }`}
      >
        {getValue() ? 'Active' : 'Inactive'}
      </span>
    ),
    meta: {
      cellProps: { className: 'py-3' },
      headerProps: { style: { width: '10%' } }
    }
  },
  {
    header: 'Actions',
    cell: ({ row }) => (
      <button
        className="btn btn-sm btn-outline-primary"
        onClick={() => openEditModal(row.original)}
        title="Edit User"
      >
        <FaEdit className="me-1" />
      </button>
    ),
    meta: {
      cellProps: { className: 'py-3 text-center' },
      headerProps: { style: { width: '10%' } }
    }
  }
];
