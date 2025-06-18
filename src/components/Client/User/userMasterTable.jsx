import { FaEdit, FaTrash } from 'react-icons/fa';

export const Usercolumns = (openEditModal, onDelete) => [
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
    accessorKey: 'action',
    cell: ({ row }) => (
      <div className="d-flex justify-content-center gap-2">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={() => openEditModal(row.original)}
          title="Edit User"
        >
          <FaEdit />
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete ${row.original.strClientUserDisplayName}?`
              )
            ) {
              onDelete(row.original);
            }
          }}
          title="Delete User"
        >
          <FaTrash />
        </button>
      </div>
    ),
    meta: {
      cellProps: { className: 'py-3 text-center' },
      headerProps: { style: { width: '10%' } }
    }
  }
];
