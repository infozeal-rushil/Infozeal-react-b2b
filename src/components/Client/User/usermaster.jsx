import {
  faPlus,
  faSpinner,
  faSyncAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from '@globals/g-components/common/PageBreadcrumb';
import { defaultBreadcrumbItems } from '@globals/g-data/commonData';
import AdvanceTable from '@globals/g-components/base/AdvanceTable';
import AdvanceTableFooter from '@globals/g-components/base/AdvanceTableFooter';
import AdvanceTableProvider from '@globals/g-providers/AdvanceTableProvider';
import useAdvanceTable from '@globals/g-hooks/useAdvanceTable';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { funcGetClientMasterAll } from '@globals/g-store/slice/Branch/getClientMasterAllSlice';
import { funcGetClientBranchMasterAllbyClientID } from '@globals/g-store/slice/Branch/getClientBranchMasterAllbyClientIDSlice';
import { funcGetClientUserMasterAllbyBranchID } from '@globals/g-store/slice/User/getClientUserMasterAllbyBranchIDSlice';

const UserMaster = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [formData, setFormData] = useState({
    ClientUserID: null,
    ClientBranchID: '',
    DisplayName: '',
    Email: '',
    Password: '',
    IsAdmin: true,
    IsActive: true
  });

  // Redux selectors
  const {
    clients = [],
    loading: clientsLoading,
    error: clientsError
  } = useSelector(state => state.clientMasterAll || {});

  const {
    branches = [],
    loading: branchesLoading,
    error: branchesError
  } = useSelector(state => state.branchMasterAllByClientID || {});

  const {
    users = [],
    loading: usersLoading,
    error: usersError
  } = useSelector(state => state.userMasterAllByBranchID || {});

  console.log('Users from Redux:', users); // <-- Add this

  const filteredData = users.filter(user =>
    user.UserName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Filtered data for table:', filteredData); // <-- Add this

  // Fetch clients on mount
  useEffect(() => {
    dispatch(funcGetClientMasterAll());
  }, [dispatch]);

  // Set default client when clients load
  useEffect(() => {
    if (clients.length > 0 && !selectedClient) {
      const defaultClientId = clients[0].intClientID;
      setSelectedClient(defaultClientId);
      dispatch(
        funcGetClientBranchMasterAllbyClientID({ ClientID: defaultClientId })
      );
    }
  }, [clients, selectedClient, dispatch]);

  // Fetch users when branch changes
  useEffect(() => {
    if (selectedBranch) {
      dispatch(
        funcGetClientUserMasterAllbyBranchID({
          ClientBranchID: Number(selectedBranch)
        })
      );
    }
  }, [selectedBranch, dispatch]);

  const handleClientChange = useCallback(
    e => {
      const clientId = e.target.value;
      setSelectedClient(clientId);
      setSelectedBranch(''); // Reset branch selection
      if (clientId) {
        dispatch(
          funcGetClientBranchMasterAllbyClientID({ ClientID: Number(clientId) })
        );
      }
    },
    [dispatch]
  );

  const handleBranchChange = e => {
    setSelectedBranch(e.target.value);
  };

  const handleRefreshUsers = () => {
    if (selectedBranch) {
      dispatch(
        funcGetClientUserMasterAllbyBranchID({
          ClientBranchID: Number(selectedBranch)
        })
      );
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      user =>
        user.strClientUserDisplayName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        user.strClientUserEmail
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const columns = useMemo(
    () => [
      {
        header: 'Display Name',
        accessorKey: 'strClientUserDisplayName',
        cell: ({ getValue }) => getValue() || 'N/A'
      },
      {
        header: 'Email',
        accessorKey: 'strClientUserEmail',
        cell: ({ getValue }) => getValue() || 'N/A'
      },
      {
        header: 'Password',
        accessorKey: 'strClientUserPassword',
        cell: ({ getValue }) => '••••••••' // Show dots instead of actual password
      },
      {
        header: 'Is Admin',
        accessorKey: 'bitClientUserAdminAccount',
        cell: ({ getValue }) => (getValue() ? 'Yes' : 'No')
      },
      {
        header: 'Is Active',
        accessorKey: 'bitClientUserStatus',
        cell: ({ getValue }) => (getValue() ? 'Active' : 'Inactive')
      },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => openEditModal(row.original)}
          >
            Edit
          </button>
        )
      }
    ],
    []
  );

  const table = useAdvanceTable({
    data: filteredUsers,
    columns,
    pageSize: 10,
    pagination: true,
    pageCount: Math.ceil(filteredUsers.length / 10),
    manualPagination: true
  });

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      ClientUserID: null,
      ClientBranchID: selectedBranch,
      DisplayName: '',
      Email: '',
      Password: '',
      IsAdmin: true,
      IsActive: true
    });
    setShowModal(true);
  };

  const openEditModal = user => {
    setIsEditMode(true);
    setFormData({
      ClientUserID: user.intClientUserID,
      ClientBranchID: user.intClientBranchID,
      DisplayName: user.strClientUserDisplayName,
      Email: user.strClientUserEmail,
      Password: user.strClientUserPassword,
      IsAdmin: user.bitClientUserAdminAccount,
      IsActive: user.bitClientUserStatus
    });
    setShowModal(true);
  };

  return (
    <div>
      <PageBreadcrumb items={defaultBreadcrumbItems} />

      <AdvanceTableProvider {...table}>
        <div className="d-flex flex-wrap mb-4 gap-3 gap-sm-6 align-items-center justify-content-between">
          <h3 className="mb-0">
            <span className="me-3">User Master</span>
            <span className="fw-normal text-body-tertiary">
              ({filteredUsers.length})
            </span>
          </h3>

          <div className="d-flex gap-2 align-items-center">
            <input
              type="text"
              className="form-control w-auto"
              placeholder="Search users..."
              onChange={e => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button
              className="btn btn-primary px-4"
              onClick={openAddModal}
              disabled={!selectedBranch}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              New User
            </button>
          </div>
        </div>

        {/* Client and Branch Selection */}
        <div className="d-flex gap-3 align-items-end mb-4">
          <Form.Group controlId="clientSelect" className="mb-0">
            <Form.Label>Select Client</Form.Label>
            <Form.Select
              value={selectedClient}
              onChange={handleClientChange}
              style={{ minWidth: '220px' }}
              disabled={clientsLoading}
            >
              {clientsLoading ? (
                <option>Loading clients...</option>
              ) : (
                clients.map(client => (
                  <option key={client.intClientID} value={client.intClientID}>
                    {client.strClientDisplayName || 'Unnamed Client'}
                  </option>
                ))
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group
            controlId="branchSelect"
            className="mb-0 position-relative"
          >
            <Form.Label>Select Branch</Form.Label>
            <Button
              variant="link"
              className="position-absolute end-0 top-0 p-0"
              onClick={() =>
                selectedClient &&
                dispatch(
                  funcGetClientBranchMasterAllbyClientID({
                    ClientID: Number(selectedClient)
                  })
                )
              }
              disabled={!selectedClient || branchesLoading}
            >
              <FontAwesomeIcon
                icon={branchesLoading ? faSpinner : faSyncAlt}
                spin={branchesLoading}
              />
            </Button>
            <Form.Select
              value={selectedBranch}
              onChange={handleBranchChange}
              style={{ minWidth: '220px' }}
              disabled={branchesLoading || !selectedClient}
            >
              {branchesLoading ? (
                <option>Loading branches...</option>
              ) : branches.length === 0 ? (
                <option>No branches available</option>
              ) : (
                <>
                  <option value="">Select branch</option>
                  {branches.map(branch => (
                    <option
                      key={branch.intClientBranchID}
                      value={branch.intClientBranchID}
                    >
                      {branch.strClientBranchName || 'Unnamed Branch'}
                    </option>
                  ))}
                </>
              )}
            </Form.Select>
          </Form.Group>
        </div>

        {/* Error Messages */}
        {branchesError && (
          <div className="alert alert-danger mb-3">
            Error loading branches: {branchesError}
          </div>
        )}
        {usersError && (
          <div className="alert alert-danger mb-3">
            Error loading users: {usersError}
          </div>
        )}

        {/* Users Table */}
        {selectedBranch ? (
          <>
            <div className="d-flex justify-content-end mb-2">
              <Button
                variant="link"
                size="sm"
                onClick={handleRefreshUsers}
                disabled={usersLoading}
              >
                <FontAwesomeIcon
                  icon={usersLoading ? faSpinner : faSyncAlt}
                  spin={usersLoading}
                  className="me-2"
                />
                Refresh Users
              </Button>
            </div>

            <AdvanceTable
              tableProps={{
                size: 'sm',
                className:
                  'phoenix-table fs-9 mb-0 border-top border-translucent'
              }}
              rowClassName="hover-actions-trigger btn-reveal-trigger position-static"
            />

            <AdvanceTableFooter
              navBtn
              pagination
              tableInfo="custom-class"
              showViewAllBtn={false}
              onPageChange={page => setPageIndex(page - 1)}
              total={filteredUsers.length}
            />
          </>
        ) : (
          <div className="alert alert-info">
            Please select a branch to view users
          </div>
        )}
      </AdvanceTableProvider>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Display Name*</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.DisplayName}
                    onChange={e =>
                      setFormData({ ...formData, DisplayName: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.Email}
                    onChange={e =>
                      setFormData({ ...formData, Email: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Password*</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.Password}
                    onChange={e =>
                      setFormData({ ...formData, Password: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Branch</Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      branches.find(
                        b => b.intClientBranchID === Number(selectedBranch)
                      )?.strClientBranchName || ''
                    }
                    readOnly
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Admin Privileges</Form.Label>
                  <Form.Check
                    type="switch"
                    id="admin-switch"
                    label="Is Admin User"
                    checked={formData.IsAdmin}
                    onChange={e =>
                      setFormData({ ...formData, IsAdmin: e.target.checked })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Account Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="status-switch"
                    label="Active User"
                    checked={formData.IsActive}
                    onChange={e =>
                      setFormData({ ...formData, IsActive: e.target.checked })
                    }
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              // TODO: Implement save logic
              setShowModal(false);
            }}
          >
            {isEditMode ? 'Update' : 'Add'}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserMaster;
