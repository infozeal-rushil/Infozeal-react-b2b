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
import { funcAddClientUserMaster } from '@globals/g-store/slice/User/addClientUserMasterSlice';
import { funcUpdateClientUserMaster } from '@globals/g-store/slice/User/updateClientUserMasterSlice';
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
  const [selectedBranch, setSelectedBranch] = useState('');

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
  const { loading: addingUser } = useSelector(
    state => state.addClientUserMaster || {}
  );
  const { loading: updatingUser } = useSelector(
    state => state.updateClientUserMaster || {}
  );

  useEffect(() => {
    dispatch(funcGetClientMasterAll());
  }, [dispatch]);

  useEffect(() => {
    if (clients.length > 0 && !selectedClient) {
      const defaultClientId = clients[0].intClientID;
      setSelectedClient(defaultClientId);
      dispatch(
        funcGetClientBranchMasterAllbyClientID({ ClientID: defaultClientId })
      );
    }
  }, [clients, selectedClient, dispatch]);

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
      setSelectedBranch('');
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

  const handleEditUser = useCallback(user => {
    setSelectedUser(user);
    setModalMode('edit');
    setModalShow(true);
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalMode('add');
    setModalShow(true);
  };

  const handleUserSubmit = async userData => {
    console.log('handleUserSubmit called with:', userData);
    try {
      if (modalMode === 'add') {
        console.log('Dispatching add action with payload:', {
          ClientBranchID: Number(selectedBranch),
          ClientUserDisplayName: userData.DisplayName,
          ClientUserEmail: userData.Email,
          ClientUserPassword: userData.Password,
          ClientUserAdminAccount: userData.IsAdmin ? 'True' : 'False',
          ClientUserStatus: userData.IsActive ? 'True' : 'False'
        });

        await dispatch(
          funcAddClientUserMaster({
            ClientBranchID: Number(selectedBranch),
            ClientUserDisplayName: userData.DisplayName,
            ClientUserEmail: userData.Email,
            ClientUserPassword: userData.Password,
            ClientUserAdminAccount: userData.IsAdmin ? 'True' : 'False',
            ClientUserStatus: userData.IsActive ? 'True' : 'False'
          })
        ).unwrap();
      } else {
        await dispatch(
          funcUpdateClientUserMaster({
            ClientUserID: userData.ClientUserID,
            ClientBranchID: userData.ClientBranchID,
            ClientUserDisplayName: userData.DisplayName,
            ClientUserEmail: userData.Email,
            ClientUserPassword: userData.Password,
            ClientUserAdminAccount: userData.IsAdmin ? 'True' : 'False',
            ClientUserStatus: userData.IsActive ? 'True' : 'False'
          })
        ).unwrap();
      }

      setModalShow(false);
      handleRefreshUsers();
    } catch (err) {
      console.error('Failed to save user:', err);
    }
  };

  const columns = useMemo(() => Usercolumns(handleEditUser), [handleEditUser]);

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
              disabled={!selectedBranch}
            >
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              New User
            </button>
          </div>
        </div>

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

      <UserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={selectedUser}
        mode={modalMode}
        isLoading={addingUser || updatingUser}
        onSubmit={handleUserSubmit}
        branches={branches}
        selectedBranch={selectedBranch}
      />
    </div>
  );
};

export default UserMaster;
