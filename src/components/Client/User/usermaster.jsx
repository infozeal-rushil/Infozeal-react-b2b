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
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { funcGetClientMasterAll } from '@globals/g-store/slice/Branch/getClientMasterAllSlice';
import { funcGetClientUserMasterAllbyBranchID } from '@globals/g-store/slice/User/getClientUserMasterAllbyBranchIDSlice';
import { funcAddClientUserMaster } from '@globals/g-store/slice/User/addClientUserMasterSlice';
import { funcUpdateClientUserMaster } from '@globals/g-store/slice/User/updateClientUserMasterSlice';
import { funcDeleteClientUserMaster } from '@globals/g-store/slice/User/deleteClientUserMasterSlice';
import { Usercolumns } from '@components/Client/User/userMasterTable';
import UserModal from '@components/Client/User/userModel';

const UserMaster = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedClient, setSelectedClient] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { clients = [], loading: clientsLoading } = useSelector(
    state => state.clientMasterAll || {}
  );
  const { users = [], loading: usersLoading } = useSelector(
    state => state.userMasterAllByBranchID || {}
  );
  const { loading: addingUser } = useSelector(
    state => state.addClientUserMaster || {}
  );
  const { loading: updatingUser } = useSelector(
    state => state.updateClientUserMaster || {}
  );
  const { loading: deletingUser } = useSelector(
    state => state.deleteClientUserMaster || {}
  );

  useEffect(() => {
    dispatch(funcGetClientMasterAll());
  }, [dispatch]);

  useEffect(() => {
    if (clients.length > 0 && !selectedClient) {
      const defaultClientId = clients[0].intClientID;
      setSelectedClient(defaultClientId);
      dispatch(
        funcGetClientUserMasterAllbyBranchID({ ClientID: defaultClientId })
      );
    }
  }, [clients, selectedClient, dispatch]);

  const handleClientChange = useCallback(
    e => {
      const clientId = e.target.value;
      setSelectedClient(clientId);
      if (clientId) {
        dispatch(
          funcGetClientUserMasterAllbyBranchID({ ClientID: Number(clientId) })
        );
      }
    },
    [dispatch]
  );

  const handleRefreshUsers = () => {
    if (selectedClient) {
      dispatch(
        funcGetClientUserMasterAllbyBranchID({
          ClientID: Number(selectedClient)
        })
      );
    }
  };

  const handleEditUser = useCallback(user => {
    setSelectedUser(user);
    setModalMode('edit');
    setModalShow(true);
  }, []);

  const handleDeleteUser = useCallback(
    async user => {
      try {
        await dispatch(
          funcDeleteClientUserMaster({ ClientUserID: user.intClientUserID })
        ).unwrap();
        setSuccess(
          `User ${user.strClientUserDisplayName} deleted successfully`
        );
        setTimeout(() => setSuccess(null), 3000);
        handleRefreshUsers();
      } catch (err) {
        setError(`Failed to delete user: ${err.message}`);
        setTimeout(() => setError(null), 3000);
      }
    },
    [dispatch]
  );

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalMode('add');
    setModalShow(true);
  };

  const handleUserSubmit = async userData => {
    try {
      if (modalMode === 'add') {
        await dispatch(
          funcAddClientUserMaster({
            ClientID: Number(selectedClient),
            ClientUserDisplayName: userData.DisplayName,
            ClientUserEmail: userData.Email,
            ClientUserPassword: userData.Password,
            ClientUserAdminAccount: userData.IsAdmin,
            ClientUserStatus: userData.IsActive
          })
        ).unwrap();
        setSuccess('User added successfully');
      } else {
        await dispatch(
          funcUpdateClientUserMaster({
            ClientUserID: userData.ClientUserID,
            ClientID: Number(selectedClient),
            ClientUserDisplayName: userData.DisplayName,
            ClientUserEmail: userData.Email,
            ClientUserPassword: userData.Password,
            ClientUserAdminAccount: userData.IsAdmin,
            ClientUserStatus: userData.IsActive
          })
        ).unwrap();
        setSuccess('User updated successfully');
      }

      setTimeout(() => setSuccess(null), 3000);
      setModalShow(false);
      handleRefreshUsers();
    } catch (err) {
      setError(`Failed to save user: ${err.message}`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const columns = useMemo(
    () => Usercolumns(handleEditUser, handleDeleteUser),
    [handleEditUser, handleDeleteUser]
  );

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

  const table = useAdvanceTable({
    data: filteredUsers,
    columns,
    pageSize: 10,
    pagination: true,
    pageCount: Math.ceil(filteredUsers.length / 10),
    manualPagination: true
  });

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
              onClick={handleAddUser}
              disabled={!selectedClient || usersLoading}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              New User
            </button>
          </div>
        </div>

        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
            {success}
          </Alert>
        )}

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
            className: 'phoenix-table fs-9 mb-0 border-top border-translucent'
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
      </AdvanceTableProvider>

      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={selectedUser}
        mode={modalMode}
        isLoading={addingUser || updatingUser}
        onSubmit={handleUserSubmit}
        branches={[]} // no branches needed
        selectedBranch={null}
      />
    </div>
  );
};

export default UserMaster;
